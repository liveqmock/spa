!function(){function e(){var e,i=$("#content>div.reward-list"),r=$("#reward-pop");i.Delegate("click",">div",function(e,a){/active/.test(a.className)||($("#content>div.reward-list>div").ClassClear("active"),a.classList.add("active"))}),$("#content>div:nth-of-type(4)").Click(function(){r.Class("active")}),p.Click(function(){var e=$("#content>div:nth-of-type(3)>div.active"),a=parseFloat(e.Attr("v"));return 0==e.length?$.tipShow("请选择打赏的金额或积分"):void(e.ClassHave("money")?t(a,"money"):m<a?(u.Text(a),l.Class("active")):t(a,"gift",e.Attr("gift-id"),e.Attr("gift-name")))}),$("#cancelReward").Click(function(){s(!0)}),$.ajax({url:"../api/v2/club/technician/"+n,isReplaceUrl:!0,success:function(s){v=s.info,v.emchatId=s.emchatId,v.clubName=s.clubName,f=v.clubId;var n=!1,r=!1,c="",d="";$.ajax({url:"../api/v2/user/reward/tipList",data:{clubId:f},isReplaceUrl:!0,success:function(e){if(200==e.statusCode){e=e.respData;for(var s,l,u="",f=0,g=-1;f<e.length;f++)s=e[f],s.defaultChoose&&(c=1,d=f),l=(s.amount/100).toFixed(2),o&&l==o&&(g=f),u+="<div class='money' v='"+l+"'>                                                    <div>"+l+"</div>                                                    <div>"+s.description+"</div>                                                </div>";i[0].innerHTML=u,0!=e.length&&p.Show(),o&&g!=-1&&($("#content>div:nth-of-type(3)>div:nth-of-type("+(g+1)+")")[0].click(),$.localStorageClear("tech-reward-param"),t(o))}n=!0,r&&a(c,d)}}),$.pageSwitch(!0,!1),$.ajax({url:"../api/v2/credit/switch/status",isReplaceUrl:!0,data:{clubId:f},success:function(t){t=t.respData,t&&"on"==t.clubSwitch?($.ajax({url:"../api/v2/user/reward/creditList",data:{clubId:f},isReplaceUrl:!0,success:function(t){if(t=t.respData,t&&t.length>0){var s="";for(t.length>4&&(t=t.slice(0,4)),e=0;e<t.length;e++)t[e].defaultChoose&&(c=0,d=e),s+="<div class='gift' v='"+t[e].credit+"' gift-id='"+t[e].belongingsId+"' gift-name='"+t[e].rewardName+"'><div><img src='"+(t[e].imgPath||"img/chat/gift.png")+"'></div><div>"+t[e].credit+"积分</div></div>";i[0].innerHTML+=s,p.Show()}r=!0,n&&a(c,d)}}),$.ajax({url:"../api/v2/credit/user/account",isReplaceUrl:!0,data:{clubId:f,userType:"user"},success:function(e){200==e.statusCode&&(e=e.respData,m=e&&e[0]?e[0].amount:0)}}),$("#giftNotEnoughTip>div>div.btn>div.get").Click(function(){$.page("integralExplain")}),$("#giftNotEnoughTip>div>div.btn>div.cancel").Click(function(){l.ClassClear("active")})):(r=!0,a(c,d))}})}})}function a(e,a){var t=$("#content>div.reward-list")[0];1==e||0==e&&t.children.length<=4||0==e&&(a+=4),isNaN(a)&&(a=1);var i=t.children[a];i&&i.classList.add("active")}function t(e,a,t,s){if(!g){if(g=!0,0==e)return $.$.afterReward=!0,$.$.afterRewardInfo=v,void(c?$.page():"true"==$.param("backPublic")?history.back():history.go(-2));p.Class("disabled"),p.Text("打赏中..."),"gift"==a?$.ajax({url:"../api/v2/credit/gift/send",isReplaceUrl:!0,data:{clubId:f,emchatId:v.emchatId,giftId:t,num:1,commentId:r||""},success:function(a){if(200==a.statusCode){var n=$.$.easemob;if(n.userId&&!n.conn.isOpened())var r=setInterval(function(){n.conn.isOpened()&&(clearInterval(r),i(e,"gift",t,s))},10);else i(e,"gift",t,s)}else g=!1,$.tipShow(a.msg||"打赏失败！"),p.ClassClear("disabled"),p.Text("打赏")}}):$.ajax({url:"../api/v2/wx/pay/user_reward",type:"post",isReplaceUrl:!0,data:{consumeMoney:(100*parseFloat(e)).toFixed(0),openId:$.$.payOpenId,clubId:f,consumeType:"user_reward",consumeChanel:"user_reward",techId:n,prePayId:$.$.prePayId||"",paySessionType:"9358_fw",commentId:r||"",isAnonymous:$.param("isAnonymous")||"N"},success:function(a){function t(){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:s.appId,timeStamp:s.timeStamp+"",nonceStr:s.nonceStr,"package":s["package"],signType:s.signType,paySign:s.paySign},function(a){g=!1,p.ClassClear("disabled"),p.Text("打赏"),a.err_msg.indexOf("ok")>=0?$.ajax({url:($.$.clubID?"../":"")+"../wx/pay/pay_result",type:"post",data:{prePayId:$.$.prePayId},success:function(){var a=$.$.easemob;if(a.userId&&!a.conn.isOpened())var t=setInterval(function(){a.conn.isOpened()&&(clearInterval(t),i(e,"money"))},10);else i(e,"money")}}):$.tipShow("未能成功支付！")})}if(200==a.statusCode){var s=JSON.parse(a.respData);$.$.prePayId=s["package"].split("=")[1],$.localStorage("prePayId",$.$.prePayId),"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",t,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",t),document.attachEvent("onWeixinJSBridgeReady",t)):t()}else"935801"==a.statusCode?($.localStorage("tech-reward-param",e),$.getOauthCode("","9358","tech-reward","userInfo")):(g=!1,p.ClassClear("disabled"),p.Text("打赏"),$.tipShow(a.msg||"支付失败！"))}})}}function i(e,a,t,i){function r(){$.updateSessionList(l,"text",!1),$.addToMsgList(l,"text"),s()}$.$.isFollowed?($.$.afterReward=!0,$.$.afterRewardInfo=v):$.tipShow("打赏成功");var o=$.$.userHeader,c=$.$.userName==$.$.defaultUserName?$.$.defaultUserName+"("+$.$.userTel.substr(0,3)+"****"+$.$.userTel.slice(-4)+")":$.$.userName,d=$.$.easemob,l={from:$.$.easemob.userId,to:v.emchatId,data:"",ext:{name:v.name,header:v.avatarUrl,avatar:v.avatar,no:v.serialNo,techId:n,clubId:f,msgType:""}};"money"==a?(l.data="<i></i>打赏：<span>"+(e-0).toFixed(2)+"</span>元",l.ext.msgType="reward"):(l.data="[礼物："+i+"]",l.ext.msgType="gift",l.ext.giftValue=e+"",l.ext.giftName=i,l.ext.giftId=t);var u=setTimeout(function(){l.status=0,r()},5e3);if(d.conn.isOpened()){var p={name:c,header:o,msgType:l.ext.msgType,time:Date.now(),avatar:$.$.userAvatar};"gift"==a&&(p.giftValue=e+"",p.giftName=i,p.giftId=t),d.conn.send({to:v.emchatId,msg:l.data,type:"chat",ext:p,success:function(){$.sendFriend(v.emchatId,"business_process"),clearTimeout(u),l.status=1,r()}})}}function s(e){function a(){$.$.tmpHash=location.hash.substring(1).split("/"),$.$.tmpHash=$.$.tmpHash.slice(0,$.$.tmpHash.length-1).join("/"),$.page("follow9358&techId="+n)}function t(e){if(e)$.page("home",-1,!0);else{var a=location.hash.substring(1).split("/");a[a.length-2]&&0==a[a.length-2].indexOf("comment&")?(a=a.slice(0,a.length-2).join("/"),a.indexOf("fastPay")>=0&&(a="home"),location.hash="#"+a):$.page()}}$.$.ua.isWX&&!$.$.isFollowed?$.ajax({url:"../api/v2/wx/isSubscribed",isReplaceUrl:!0,data:{openId:$.$.openId,sessionType:"9358"},success:function(i){200==i.statusCode?($.$.isFollowed="true"==i.respData.toString(),$.$.isFollowed?t(e):a()):a()},error:function(){a()}}):t(e)}var n=$.param("techId"),r=$.param("commentId"),o=$.localStorage("tech-reward-param"),c=$.localStorage("backIndex"),d=$.param("code")||$.getUrlParam("code"),l=$("#giftNotEnoughTip"),u=$("#giftNotEnoughTip>div>div.tip>span"),p=$("#content>div:nth-of-type(4)"),f=$.$.clubID,g=!1,m=0;if($.$.isFollowed=!!($.$.isFollowed||$.localStorage("spa_user_isFollowed")-0),!n)return $.tipShow("技师不存在！"),$.pageCancel();$("#title>div:nth-of-type(2)").Click(function(e){e.stopImmediatePropagation(),s()});var v;e(),d&&o&&$.ajax({url:($.$.clubID?"../":"")+"../wx/oauth2/user/openid",type:"post",data:{code:d,scope:"snsapi_userinfo",wxmp:"9358",userType:"user",state:"tech-reward"},success:function(a){if(200==a.statusCode)$.localStorageClear("tech-reward-param"),e();else{if("935801"!=a.statusCode)return $.tipShow(a.msg||"获取openId失败！"),$.pageCancel();$.localStorage("tech-reward-param",parseInt($("#content>div:nth-of-type(3)>div.active")[0].innerHTML)||0),$.getOauthCode("","9358","tech_reward","userInfo")}}})}();