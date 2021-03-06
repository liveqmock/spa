<style>
    @import '../styles/components/messageNode.css';
</style>
<template>
    <div class="messageNode" :class="messageCls" v-if="!(msgType=='diceGame' && game.status=='handled')">
        <span>{{ msg.time | msgTimeFormatter(true) }}</span>
        <template v-if="msgType=='paidCouponTip' || msgType == 'couponTip'">
            <span @click="doClickMsgContent('couponTip')"><i></i>{{ msg.data }}<a>点击查看</a></span>
        </template>
        <template v-if="msgType=='diceGame'">
            <template v-if="game.status != 'over' && game.isMineInvite">
                <div :style="{ backgroundImage : 'url('+im.header+')' }"></div>
                <div :class='contentCls'>
                    <h4>邀请{{ talker.name }}玩骰子<span>{{ msg.data }}积分</span></h4>
                    <div>
                        <div class='other'><div>{{ talker.name }}</div><div :class="game.status == 'request' ? 'wait' : 'reject'">{{ gameStatusObj[game.status] }}<a class='cancel dice-game' v-if="game.status == 'request'" @click="doHandlerDiceGame('cancel')">取消</a></div></div>
                        <div class='dice'></div>
                        <div class='mine'><div>{{ im.name }}</div><div :style="{ backgroundImage : 'url('+im.header+')' }"></div></div>
                    </div>
                </div>
                <div :class="{ hide : !(game.status == 'reject' || game.status == 'cancel' || game.status == 'overtime') }"><span>{{ game.status == "reject" ? "对方拒绝游戏" : (game.status == "cancel" ? "游戏已取消" : "游戏超时") }}，返还{{ msg.data }}积分</span></div>
            </template>
            <template v-if="game.status != 'over' && !game.isMineInvite">
                <div :style="{ backgroundImage : 'url('+talker.header+')' }" @click="doClickTechHeader(talker.id)"></div>
                <div>
                    <div>
                        <div>{{ talker.name }}邀请您玩骰子<span v-if="game.status != 'request'">({{ gameStatusObj[game.status] }})</span></div>
                        <div>比大小，每局胜方将获得负方{{ msg.data }}积分</div>
                    </div>
                    <div :class="{ disabled : game.status != 'request' }">
                        <div class='reject' @click="doHandlerDiceGame('reject')">拒绝</div>
                        <div class='accept' @click="doHandlerDiceGame('accept')">接受</div>
                    </div>
                </div>
            </template>
            <template v-if="game.status == 'over'">
                <div :style="{ backgroundImage : 'url('+im.header+')' }"></div>
                <div :class='contentCls'>
                    <div class='left'><div>{{ talker.name }}</div><div :class="{ act : !game.isVictory }"><img :src="game.techDice" ref="techDiceImg"/></div></div>
                    <div class='right'>
                        <div :class="game.isVictory ? 'victory' : 'failure'">{{ im.name }}</div>
                        <div :class="{ act : game.isVictory }"><img :src="game.userDice" ref="userDiceImg"/></div>
                        <span>{{ game.isVictory ? "+" : "-" }}{{ msg.data }}</span>
                    </div>
                    <div class='split'><i>vs</i></div>
                </div>
                <div><span>{{ game.isVictory ? "获取" : "消费" }}{{ msg.data }}积分，<a class='dice-game-tip' @click="doClickMsgContent('dice-game-tip')">再玩一局</a></span></div>
            </template>
        </template>
        <template v-if="msgType=='gift'">
            <div :style="{ backgroundImage : 'url('+im.header+')' }"></div>
            <div :class="contentCls"><img :src="giftImg"/></div>
        </template>
        <template v-if="msgType != 'paidCouponTip' && msgType != 'couponTip' && msgType !='diceGame' && msgType !='gift'">
            <div :style="{ backgroundImage : 'url('+( messageCls=='right' ? im.header : talker.header )+')' }" @click="doClickTechHeader(messageCls=='right' ? im.id : talker.id)"></div>
            <div v-if="category=='text'" :class="contentCls" v-html="msgData" @click="doClickMsgContent(contentCls)"></div>
            <div v-if="category=='pic'" :class="contentCls"><img :src="msg.url" :style="{ width : imgSize.w+'rem', height : imgSize.h+'rem' }"/></div>
        </template>
    </div>
</template>

<script>
    import { Global } from '../libs/global';
    import { IM } from '../libs/im';
    import { eventHub } from '../libs/hub';
    import Util from "../libs/util";
    import MsgTimeFormatter from "../filters/msg-time-formatter";

    module.exports = {
        filters: {
            msgTimeFormatter : MsgTimeFormatter
        },
        data: function(){
            return {
                global : Global.data,
                im : IM,
                talker : IM.talker,
                defaultGiftImg : "images/chat/gift_default.png", //默认的积分礼物图片
                gameStatusObj : { request : "等待接受...", accept : "已接受", reject : "已拒绝", overtime : "已超时", cancel : "已取消" }, //游戏状态
                inProcessing : false
            };
        },
        computed : {
            msgType : function(){
                var msg = this.msg, ext = msg.ext;
                if(ext && ext.msgType){
                    return ext.msgType;
                }
                else{
                    return msg.msgType || "";
                }
            },
            category : function(){
              return this.msg.type ? this.msg.type : "text"
            },
            messageCls : function(){
                var _this = this, type = _this.msgType, msg = _this.msg;
                if(type=="paidCouponTip" || type == "couponTip"){
                    return "center "+ type;
                }
                else if(type == "diceGame"){
                    var game = _this.game;
                    if(game.status != "over"){
                        if(game.isMineInvite){
                            return "right dice-invite"
                        }
                        else{ //由对方发起的
                            return "left dice-request";
                        }
                    }
                    else{
                        return "right dice-result"+(game.needShow ? "" : " show")
                    }
                }
                else if(type == "gift"){
                    return "right gift"
                }
                else{
                    return msg.from == IM.id ? "right" : "left"
                }
            },
            contentCls : function(){
                var _this = this, type = _this.msgType;
                if(type=="paidCouponTip" || type == "couponTip"){

                }
                else if(type == "diceGame"){
                    var game = _this.game;
                    if(game.status != "over"){
                        if(game.isMineInvite){
                            return (_this.msg.status || 1) == 1 ? "success" : ""
                        }
                    }
                    else{
                        return "success"
                    }
                }
                else if(type == "gift"){
                    return (_this.msg.status || 1) == 1 ? "success" : ""
                }
                else{
                    var statusCls = (_this.messageCls == "right" && (_this.msg.status || 1) == 1 ) ? "success" : "";
                    if(_this.category == "text"){
                        return (type ? type+" " : "")+statusCls
                    }
                    else if(_this.category == "pic"){
                        return "img "+statusCls;
                    }
                }
            },
            msgData : function(){
                var _this = this;
                console.log("_this.category："+_this.category);
                if(_this.category == "text"){
                    return IM.decodeExpressionToImg(_this.msg.data);
                }
                else{
                    return _this.msg.data;
                }
            },
            imgSize : function(){
                var _this = this, msg = _this.msg, global = _this.global;
                if(_this.category == "pic"){
                    var w = msg.width / (16 * global.winScale), h = msg.height / (16 * global.winScale), ratio;
                    if (!(w < 10 && h < 9)) {
                        w = msg.width / 10 , h = msg.height / 9, ratio = w > h ? w : h;
                        w = msg.width / ratio;
                        h = msg.height / ratio;
                    }
                    return { w : w , h : h }
                }
            },
            giftImg : function(){
                var _this = this, msg = _this.msg;
                if(_this.msgType == "gift"){
                    var giftImg = _this.giftMapData[msg.giftId || msg.ext.giftId];
                    return giftImg ? (giftImg.url || _this.defaultGiftImg) : _this.defaultGiftImg;
                }
            },
            game : function(){
                var _this = this, msg = _this.msg, im = _this.im;
                if(_this.msgType == "diceGame"){
                    var obj = {
                        status : msg.gameStatus || msg.ext.gameStatus,
                        invite : msg.gameInvite || msg.ext.gameInvite,
                        id : msg.gameId || msg.ext.gameId,
                        value : msg.data
                    };
                    var isMineInvite = obj.isMineInvite = obj.invite == _this.im.id;
                    if(obj.status == "over"){
                        var gameResult = (msg.gameResult || msg.ext.gameResult).split(":");
                        obj.needShow = !!im.needShowEffectDiceGames[obj.id];

                        console.log("dice game："+obj.id+"--need show："+obj.needShow);
                        obj.isVictory = (isMineInvite ? (gameResult[0] > gameResult[1]) : (gameResult[0] < gameResult[1]));
                        obj.techPoint = (isMineInvite ? gameResult[1] : gameResult[0]);
                        obj.userPoint = (isMineInvite ? gameResult[0] : gameResult[1]);
                        obj.techDice = "images/chat/dice/dice"+obj.techPoint+(obj.needShow ? ".gif" : ".png");
                        obj.userDice = "images/chat/dice/dice"+obj.userPoint+(obj.needShow ? ".gif" : ".png");
                    }
                    return obj
                }
            }
        },
        props : {
            msg : {  //消息
                type : Object,
                required: true
            },
            giftMapData : {
                type : Object,
                required: true
            },
            creditConfig : {
                type : Object,
                required: true
            }
        },
        mounted : function(){
          var _this = this, im = _this.im;
            _this.$nextTick(function(){
                var game = _this.game;
                if(game && game.needShow){
                    setTimeout(function(){
                        if(game.isVictory){
                            eventHub.$emit("show-golden-effect");
                        }
                        im.needShowEffectDiceGames[game.id] = false;
                        _this.$el.classList.add("show");
                        var techDiceImg = _this.$refs.techDiceImg,
                                userDiceImg = _this.$refs.userDiceImg;
                        techDiceImg.src = techDiceImg.src.slice(0,-3)+"png";
                        userDiceImg.src = userDiceImg.src.slice(0,-3)+"png";
                    },2100);
                }
            })
        },
        methods: {
            doClickTechHeader : function(id){
                var _this = this;
                if(_this.talker.id == id){
                    _this.$router.push({ name : "technicianDetail", query : { id : _this.talker.userId }});
                }
            },
            doClickMsgContent : function(cls){
                var _this = this;
                if(/begReward/.test(cls)){////点击求打赏消息，跳转到打赏页面
                    eventHub.$emit("goto-reward-tech");
                }
                else if(/dice-game-tip/.test(cls)){ //点击'再来一局'
                    eventHub.$emit("before-dice-game",_this.game.value);
                }
                else if(/couponTip/.test(cls)){
                    _this.$router.push({ name : "coupon" });
                }
                else if(/ordinaryCoupon/.test(cls)){
                    //console.log("do click ordinaryCoupon");
                    if(_this.msg.userActId){
                        _this.$router.push({ name : "couponDetail", query : { userActId : _this.msg.userActId }});
                    }
                    else{
                        _this.$router.push({ name : "coupon" });
                    }
                }
                else if(/paidCoupon/.test(cls)){//点钟券
                    if(!_this.global.userTel){
                        ///////提示绑定
                    }
                    else{
                        console.log("点击点钟券");
                        _this.$router.push({ name : "paidCoupon" , query : { actId : _this.msg.actId, techCode : _this.msg.techCode, chanel : "link" }});
                    }
                }
            },
            doHandlerDiceGame : function(ope){//点击处理骰子游戏操作
                var _this = this;
                if(_this.game.status == 'request' && !_this.inProcessing){
                    eventHub.$emit("handler-dice-game",{ ope : ope , game : _this.game });
                    _this.inProcessing = true;
                    setTimeout(function(){ _this.inProcessing = false },3500)
                }
            }
        }
    }
</script>