(function () {
    var techId = $.param("techId"),
        commentId = $.param("commentId"),
        paramData = $.localStorage('tech-reward-param'),
        backIndex = $.localStorage('backIndex'),
        payAuthCode = $.param("code") || $.getUrlParam('code'),
        giftNotEnoughTip = $("#giftNotEnoughTip"),
        giftNeedCount = $("#giftNotEnoughTip>div>div.tip>span"),
        payBtn = $("#content>div:nth-of-type(4)"),
        clubId = $.$.clubID,
        inReward = false,
        currIntegralAccount=0;
    $.$.isFollowed = !!($.$.isFollowed || $.localStorage('spa_user_isFollowed') - 0 || false);      //用户是否已经关注了公众号

    if (!techId) {
        $.tipShow("技师不存在！");
        return $.pageCancel();
    }
    /*if(backIndex){
        $.localStorageClear('backIndex');
        $("#title>div:nth-of-type(2)").Click(function(event){
            event.stopImmediatePropagation();
            back();
        });
    }else if($.param("backPublic")=="true"){
        $("#title>div:nth-of-type(2)").Click(function(event){
            event.stopImmediatePropagation();
            back();
        });
    }else{
        $("#title>div:nth-of-type(2)").Click(function(event){
            event.stopImmediatePropagation();
            $.page();
        });
    }*/
    $("#title>div:nth-of-type(2)").Click(function(event){
        event.stopImmediatePropagation();
        back();
    });
    var techInfo;//技师的信息
    doInitPage();

   if(payAuthCode && paramData){
        $.ajax({
            url: ($.$.clubID ? "../" : "")+"../wx/oauth2/user/openid",
            type:'post',
            data: {
                code : payAuthCode,
                scope : 'snsapi_userinfo',
                wxmp : '9358',
                userType : 'user',
                state : 'tech-reward'
            },
            success: function (result) {
                if (result.statusCode == 200){
                    $.localStorageClear('tech-reward-param');
                    doInitPage();
                }else if(result.statusCode == '935801'){
                    $.localStorage('tech-reward-param', parseInt($("#content>div:nth-of-type(3)>div.active")[0].innerHTML) || 0);
                    $.getOauthCode('','9358','tech_reward','userInfo');
                }
                else {
                    $.tipShow(result.msg || "获取openId失败！");
                    return $.pageCancel();
                }
            }
        });
    }

    function doInitPage() {
        var rewardList = $("#content>div.reward-list"),
            rewardPop = $("#reward-pop"),
            k;
        rewardList.Delegate("click",">div",function(e,item){
            if(!/active/.test(item.className)){
                $("#content>div.reward-list>div").ClassClear("active");
                item.classList.add("active");
            }
        });

        $("#content>div:nth-of-type(4)").Click(function() {
            rewardPop.Class("active");
        });

        //点击"确认打赏"
        payBtn.Click(function () {
            var selectItem = $("#content>div:nth-of-type(3)>div.active"),
                itemValue = parseFloat(selectItem.Attr("v"));
            if(selectItem.length == 0){
                return $.tipShow('请选择打赏的金额或积分');
            }
            if(selectItem.ClassHave("money")){//金钱打赏
                doReward(itemValue,'money');
            }
            else{
                if(currIntegralAccount<itemValue){//积分不足
                    giftNeedCount.Text(itemValue);
                    giftNotEnoughTip.Class("active");
                }
                else{
                    doReward(itemValue,'gift',selectItem.Attr("gift-id"),selectItem.Attr("gift-name"));
                }
            }
        });

        //取消按钮
        $('#cancelReward').Click(function () {
            back(true);
        });

        $.ajax({ //获取技师信息
            url:  '../api/v2/club/technician/'+ techId,
            isReplaceUrl: true,
            success: function (data) {
                techInfo = data["info"];
                techInfo.emchatId = data.emchatId;
                techInfo.clubName = data['clubName'];
                clubId =techInfo.clubId;

                var loadMoneyRewardSettingData = false,
                    loadGiftRewardSettingData = false,
                    defaultRewardType = '',
                    defaultRewardIndex = '';

                // 获取会所的打赏设置
                $.ajax({
                    url: "../api/v2/user/reward/tipList",
                    data: { clubId: clubId },
                    isReplaceUrl: true,
                    success: function(res){
                        if(res.statusCode == 200){
                            res = res.respData;
                            var _html = "", i = 0, rewardItem, amount, lastSelectIndex = -1;
                            for(;i<res.length;i++){
                                rewardItem = res[i];
                                if(rewardItem.defaultChoose){
                                    defaultRewardType = 1
                                    defaultRewardIndex = i
                                }
                                amount = (rewardItem.amount/100).toFixed(2)
                                if(paramData && amount==paramData){
                                    lastSelectIndex = i;
                                }
                                _html += "<div class='money' v='"+amount+"'>\
                                                    <div>"+amount+"</div>\
                                                    <div>"+rewardItem.description+"</div>\
                                                </div>";
                            }
                            rewardList[0].innerHTML = _html;
                            if(res.length != 0){
                                payBtn.Show();
                            }

                            if(paramData && lastSelectIndex != -1){
                                $("#content>div:nth-of-type(3)>div:nth-of-type("+(lastSelectIndex+1)+")")[0].click();
                                $.localStorageClear('tech-reward-param');
                                doReward(paramData);
                            }
                        }
                        loadMoneyRewardSettingData = true
                        if(loadGiftRewardSettingData){
                            doSelectDefault(defaultRewardType,defaultRewardIndex)
                        }
                    }
                })
                $.pageSwitch(true,false);

                ///////////////////////////////////////////获取积分礼物
                $.ajax({
                    url: "../api/v2/credit/switch/status",
                    isReplaceUrl: true,
                    data: { clubId: clubId },
                    success: function (switchRes) {
                        switchRes = switchRes.respData;
                        if (switchRes && switchRes.clubSwitch == "on") {
                            $.ajax({
                                url: "../api/v2/user/reward/creditList",
                                data: { clubId: clubId },
                                isReplaceUrl: true,
                                success: function (giftRes) {
                                    giftRes = giftRes.respData;
                                    if (giftRes && giftRes.length>0) {
                                        var giftHtmlStr = "";
                                        if(giftRes.length>4){
                                            giftRes = giftRes.slice(0,4)
                                        }
                                        for(k=0;k<giftRes.length;k++){
                                            if(giftRes[k].defaultChoose){
                                                defaultRewardType = 0
                                                defaultRewardIndex = k
                                            }
                                            giftHtmlStr += "<div class='gift' v='"+giftRes[k]["credit"]+"' gift-id='"+giftRes[k]["belongingsId"]+"' gift-name='"+giftRes[k]["rewardName"]+"'><div><img src='"+(giftRes[k]["imgPath"] || "img/chat/gift.png")+"'></div><div>"+giftRes[k]["credit"]+"积分</div></div>";
                                        }
                                        rewardList[0].innerHTML += giftHtmlStr;
                                        payBtn.Show();
                                    }
                                    loadGiftRewardSettingData = true;
                                    if(loadMoneyRewardSettingData){
                                        doSelectDefault(defaultRewardType,defaultRewardIndex)
                                    }
                                }
                            });
                            ///////////////////////////获取当前账户积分
                            $.ajax({
                                url : "../api/v2/credit/user/account",
                                isReplaceUrl : true,
                                data : {
                                    clubId : clubId,
                                    userType : "user"
                                },
                                success : function(res){
                                    if(res.statusCode == 200) {
                                        res = res.respData;
                                        currIntegralAccount = (res && res[0] ? res[0].amount : 0);
                                    }
                                }
                            });

                            /////////////////////////////////////////////////////
                            $("#giftNotEnoughTip>div>div.btn>div.get").Click(function(){
                                $.page("integralExplain");
                            });
                            $("#giftNotEnoughTip>div>div.btn>div.cancel").Click(function(){
                                giftNotEnoughTip.ClassClear("active");
                            });
                        } else {
                            loadGiftRewardSettingData = true
                            doSelectDefault(defaultRewardType,defaultRewardIndex)
                        }
                    }
                })
            }});
    }

    function doSelectDefault(type,index){
        var list = $("#content>div.reward-list")[0]
        if(type == 1 || (type == 0 && list.children.length <=4)){
        } else if(type == 0){
            index = index + 4;
        }
        if(isNaN(index)){
            index = 1
        }
        var ele = list.children[index]
        if(ele){
            ele.classList.add("active")
        }
    }

    function doReward(val,type,giftId,giftName) {
        if(inReward) return;
        inReward = true;
        if(val == 0){
            $.$.afterReward = true;//弹出感谢话语
            $.$.afterRewardInfo = techInfo;
            backIndex ? $.page() : ($.param("backPublic")=="true" ? history.back() : history.go(-2));
            return;
        }
        payBtn.Class('disabled');
        payBtn.Text('打赏中...');

        if(type=="gift"){
            $.ajax({
                url: "../api/v2/credit/gift/send",
                isReplaceUrl: true,
                data: {
                    clubId: clubId,
                    emchatId: techInfo.emchatId,
                    giftId: giftId,
                    num: 1,
                    commentId:commentId || ''
                },
                success: function (res) {
                    if (res.statusCode == 200) {
                        /////发送一条礼物消息给技师
                        var eb = $.$.easemob;
                        if (eb.userId && !eb.conn.isOpened()) {
                            var waitEasemobInit = setInterval(function () {//等待环信登录
                                if (eb.conn.isOpened()){
                                    clearInterval(waitEasemobInit);
                                    sendRewardMsg(val,"gift",giftId,giftName);
                                }
                            }, 10);
                        }
                        else {
                            sendRewardMsg(val,"gift",giftId,giftName);
                        }
                    } else {
                        inReward = false;
                        $.tipShow(res.msg || "打赏失败！");
                        payBtn.ClassClear('disabled');
                        payBtn.Text('打赏');
                    }
                }
            });
        }
        else{
            $.ajax({
                url: "../api/v2/wx/pay/user_reward",
                type: 'post',
                isReplaceUrl: true,
                data: {
                    consumeMoney: (parseFloat(val) * 100).toFixed(0),
                    openId: $.$.payOpenId,
                    clubId: clubId,
                    consumeType: "user_reward",
                    consumeChanel: "user_reward",
                    techId: techId,
                    prePayId: $.$.prePayId || '',
                    paySessionType : "9358_fw",
                    commentId:commentId || '',
                    isAnonymous: $.param('isAnonymous') || 'N'
                },
                success: function (result) {
                    if (result.statusCode == 200) {
                        var respData = JSON.parse(result.respData);
                        $.$.prePayId = respData.package.split("=")[1];
                        $.localStorage("prePayId", $.$.prePayId);

                        function onBridgeReady() {
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                    "appId": respData.appId,     //公众号名称，由商户传入
                                    "timeStamp": respData.timeStamp+""  ,  //时间戳，自1970年以来的秒数
                                    "nonceStr": respData.nonceStr, //随机串
                                    "package": respData.package,
                                    "signType": respData.signType,   //微信签名方式
                                    "paySign" : respData.paySign
                                },
                                function (res) {
                                    inReward = false;
                                    payBtn.ClassClear('disabled');
                                    payBtn.Text('打赏');
                                    if (res.err_msg.indexOf("ok")>=0) {
                                        $.ajax({
                                            url : ($.$.clubID ? "../" : "")+'../wx/pay/pay_result',
                                            type : 'post',
                                            data : { prePayId : $.$.prePayId },
                                            success : function(){
                                                /////发送一条打赏消息给技师
                                                var eb = $.$.easemob;
                                                if (eb.userId && !eb.conn.isOpened()) {
                                                    var waitEasemobInit = setInterval(function () {//等待环信登录
                                                        if (eb.conn.isOpened()){
                                                            clearInterval(waitEasemobInit);
                                                            sendRewardMsg(val,'money');
                                                        }
                                                    }, 10);
                                                }
                                                else {
                                                    sendRewardMsg(val,'money');
                                                }
                                            }
                                        });
                                    }// res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠
                                    else{
                                        $.tipShow("未能成功支付！");
                                    }
                                });
                        }

                        if (typeof WeixinJSBridge == "undefined") {
                            if (document.addEventListener) {
                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                            } else if (document.attachEvent) {
                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                            }
                        } else {
                            onBridgeReady();
                        }
                    }else if(result.statusCode =='935801'){
                        $.localStorage('tech-reward-param', val);
                        $.getOauthCode('','9358','tech-reward','userInfo');
                    }
                    else {
                        inReward = false;
                        payBtn.ClassClear('disabled');
                        payBtn.Text('打赏');
                        $.tipShow(result.msg || "支付失败！");
                    }
                }
            });
        }
    }

    function sendRewardMsg(val,type,giftId,giftName){
        if($.$.isFollowed){
            $.$.afterReward = true;//弹出感谢话语
            $.$.afterRewardInfo = techInfo;
        }else{
            $.tipShow('打赏成功');
        }

        var chatHeader = $.$.userHeader,
            chatName =  ($.$.userName == $.$.defaultUserName ? $.$.defaultUserName + "(" + $.$.userTel.substr(0, 3) + "****" + $.$.userTel.slice(-4) + ")" : $.$.userName ),
            eb = $.$.easemob;

        //保存-存储
        var msgObj = {
            from: $.$.easemob.userId,
            to: techInfo.emchatId,
            data: "",
            ext: {
                name: techInfo.name,
                header: techInfo.avatarUrl,
                avatar: techInfo.avatar,
                no: techInfo.serialNo,
                techId: techId,
                clubId: clubId,
                msgType: ""
            }
        };

        if(type == "money"){
            msgObj.data = "<i></i>打赏：<span>"+(val - 0).toFixed(2)+"</span>元";
            msgObj.ext.msgType = "reward";
        }
        else{
            msgObj.data = "[礼物："+giftName+"]";
            msgObj.ext.msgType = "gift";
            msgObj.ext.giftValue = val+"";
            msgObj.ext.giftName = giftName;
            msgObj.ext.giftId = giftId;
        }

        var sendFailTimer = setTimeout(function(){
            msgObj.status = 0;
            afterSend();
        },5000);

        if(eb.conn.isOpened()){
            var extObj = {
                name: chatName, header: chatHeader, msgType: msgObj.ext.msgType, time: Date.now() , avatar : $.$.userAvatar
            };
            if(type == "gift"){
                extObj.giftValue = val+"";
                extObj.giftName = giftName;
                extObj.giftId = giftId;
            }
            eb.conn.send({
                to: techInfo.emchatId,
                msg: msgObj.data,
                type: "chat",
                ext: extObj,
                success : function(){
                    $.sendFriend(techInfo.emchatId,"business_process");
                    clearTimeout(sendFailTimer);
                    msgObj.status = 1;
                    afterSend();
                }
            });
        }

        function afterSend(){
            $.updateSessionList(msgObj, "text", false);
            $.addToMsgList(msgObj, "text");
            back();
        }
    }

    function back(goHome){
        if($.$.ua.isWX && !$.$.isFollowed){//如果已关注，则正常跳转，否则跳转到引导关注页
            $.ajax({
                url:'../api/v2/wx/isSubscribed',
                isReplaceUrl:true,
                data:{
                    openId: $.$.openId,
                    sessionType: '9358'
                },
                success: function (result) {
                    if(result.statusCode == 200){
                        $.$.isFollowed = result.respData.toString() == 'true';
                        if(!$.$.isFollowed){
                            goToFollow();
                        }else{
                            normalBack(goHome);
                        }
                    }else{
                        goToFollow();
                    }
                },
                error: function(){  //请求出错，跳转到引导关注页
                    goToFollow();
                }
            });
        }else{
            normalBack(goHome);
        }

        function goToFollow(){
            $.$.tmpHash = location.hash.substring(1).split('/');          //用于在引导页请求失败时，跳转回正常页面
            $.$.tmpHash = $.$.tmpHash.slice(0,$.$.tmpHash.length - 1).join('/');
            $.page('follow9358&techId='+techId);
        }

        function normalBack(goHome){
            if(goHome){
                $.page('home',-1,true);
            }else{
                var hash = location.hash.substring(1).split('/');
                if(hash[hash.length - 2]&&hash[hash.length - 2].indexOf('comment&') == 0){
                    hash = hash.slice(0,hash.length - 2).join('/');
                    if(hash.indexOf('fastPay')>=0){
                        hash = "home";
                    }
                    location.hash = '#'+hash;
                }else{
                    $.page();
                }
            }
        }

        //backIndex ? $.page() : ($.param("backPublic")=="true" ? history.back() : history.go(-2));
    }
})();