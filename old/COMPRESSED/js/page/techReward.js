!function(){function e(){var e,t=$("#content>div.reward-list"),n=$("#reward-pop");t.Delegate("click",">div",function(e,a){/active/.test(a.className)||($("#content>div.reward-list>div").ClassClear("active"),a.classList.add("active"))}),$("#content>div:nth-of-type(4)").Click(function(){n.Class("active")}),u.Click(function(){var e=$("#content>div:nth-of-type(3)>div.active"),t=parseInt(e.Attr("v"));e.ClassHave("money")?a(t,"money"):f<t?(o.Text(t),d.Class("active")):a(t,"gift",e.Attr("gift-id"),e.Attr("gift-name"))}),$.ajax({url:"../api/v2/club/technician/"+i,isReplaceUrl:!0,success:function(i){if(g=i.info,g.emchatId=i.emchatId,g.clubName=i.clubName,l=g.clubId,r){var n={1:1,3:2,6:3,9:4}[r];$("#content>div:nth-of-type(3)>div:nth-of-type("+n+")")[0].click(),$.localStorageClear("tech-reward-param"),a(r)}$.pageSwitch(!0,!1),$.ajax({url:"../api/v2/credit/switch/status",isReplaceUrl:!0,data:{clubId:l},success:function(a){a=a.respData,a&&"on"==a.clubSwitch&&($.ajax({url:"../api/v2/credit/gift/list",isReplaceUrl:!0,success:function(a){if(a=a.respData,a&&a.length>0){var i="";for(e=0;e<a.length;e++)i+="<div class='gift' v='"+a[e].ratio+"' gift-id='"+a[e].id+"' gift-name='"+a[e].name+"'><div><img src='"+a[e].iconUrl+"'></div><div>"+a[e].ratio+"积分</div></div>";t[0].innerHTML+=i}}}),$.ajax({url:"../api/v2/credit/user/account",isReplaceUrl:!0,data:{clubId:l,userType:"user"},success:function(e){200==e.statusCode&&(e=e.respData,f=e&&e[0]?e[0].amount:0)}}),$("#giftNotEnoughTip>div>div.btn>div.get").Click(function(){$.page("integralExplain")}),$("#giftNotEnoughTip>div>div.btn>div.cancel").Click(function(){d.ClassClear("active")}))}})}}),$.ajax({url:"../api/v2/credit/switch/status",isReplaceUrl:!0,data:{clubId:l},success:function(a){a=a.respData,a&&"on"==a.clubSwitch&&($.ajax({url:"../api/v2/credit/gift/list",isReplaceUrl:!0,success:function(a){if(a=a.respData,a&&a.length>0){var i="";for(e=0;e<a.length;e++)i+="<div class='gift' v='"+a[e].ratio+"' gift-id='"+a[e].id+"' gift-name='"+a[e].name+"'><div><img src='"+a[e].iconUrl+"'></div><div>"+a[e].ratio+"积分</div></div>";t[0].innerHTML+=i}}}),$.ajax({url:"../api/v2/credit/user/account",isReplaceUrl:!0,data:{clubId:l,userType:"user"},success:function(e){200==e.statusCode&&(e=e.respData,f=e&&e[0]?e[0].amount:0)}}),$("#giftNotEnoughTip>div>div.btn>div.get").Click(function(){$.page("integralExplain")}),$("#giftNotEnoughTip>div>div.btn>div.cancel").Click(function(){d.ClassClear("active")}))}})}function a(e,a,r,c){if(!p){if(p=!0,0==e)return $.$.afterReward=!0,$.$.afterRewardInfo=g,void(s?$.page():"true"==$.param("backPublic")?history.back():history.go(-2));u.Class("disabled"),u.Text("打赏中..."),"gift"==a?$.ajax({url:"../api/v2/credit/gift/send",isReplaceUrl:!0,data:{clubId:l,emchatId:g.emchatId,giftId:r,num:1},success:function(a){if(200==a.statusCode){var i=$.$.easemob;if(i.userId&&!i.conn.isOpened())var n=setInterval(function(){i.conn.isOpened()&&(clearInterval(n),t(e,"gift",r,c))},10);else t(e,"gift",r,c)}}}):$.ajax({url:"../api/v2/wx/pay/user_reward",type:"post",isReplaceUrl:!0,data:{consumeMoney:e,openId:$.$.payOpenId,clubId:l,consumeType:"user_reward",consumeChanel:"user_reward",techId:i,prePayId:$.$.prePayId||"",paySessionType:"9358_fw",commentId:n},success:function(a){function i(){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:a.respData.appId,timeStamp:a.respData.timeStamp+"",nonceStr:a.respData.nonceStr,"package":a.respData["package"],signType:a.respData.signType,paySign:a.respData.paySign},function(a){p=!1,u.ClassClear("disabled"),u.Text("打赏"),a.err_msg.indexOf("ok")>=0?$.ajax({url:($.$.clubID?"../":"")+"../wx/pay/pay_result",type:"post",data:{prePayId:$.$.prePayId},success:function(){var a=$.$.easemob;if(a.userId&&!a.conn.isOpened())var i=setInterval(function(){a.conn.isOpened()&&(clearInterval(i),t(e,"money"))},10);else t(e,"money")}}):$.tipShow("未能成功支付！")})}200==a.statusCode?($.$.prePayId=a.respData["package"].split("=")[1],$.localStorage("prePayId",$.$.prePayId),"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",i,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",i),document.attachEvent("onWeixinJSBridgeReady",i)):i()):"935801"==a.statusCode?($.localStorage("tech-reward-param",e),$.getOauthCode("","9358","tech-reward","userInfo")):(p=!1,u.ClassClear("disabled"),u.Text("打赏"),$.tipShow(a.msg||"支付失败！"))}})}}function t(e,a,t,n){function r(){$.updateSessionList(u,"text",!1),$.addToMsgList(u,"text"),s?$.page():"true"==$.param("backPublic")?history.back():history.go(-2)}$.$.afterReward=!0,$.$.afterRewardInfo=g;var c=$.$.userHeader,d=$.$.userName==$.$.defaultUserName?$.$.defaultUserName+"("+$.$.userTel.substr(0,3)+"****"+$.$.userTel.slice(-4)+")":$.$.userName,o=$.$.easemob,u={from:$.$.easemob.userId,to:g.emchatId,data:"",ext:{name:g.name,header:g.avatarUrl,avatar:g.avatar,no:g.serialNo,techId:i,clubId:l,msgType:""}};"money"==a?(u.data="<i></i>打赏：<span>"+e+"</span>元",u.ext.msgType="reward"):(u.data="[礼物："+n+"]",u.ext.msgType="gift",u.ext.giftValue=e+"",u.ext.giftName=n,u.ext.giftId=t);var p=setTimeout(function(){u.status=0,r()},5e3);if(o.conn.isOpened()){var f={name:d,header:c,msgType:u.ext.msgType,time:Date.now(),avatar:$.$.userAvatar};"gift"==a&&(f.giftValue=e+"",f.giftName=n,f.giftId=t),o.conn.send({to:g.emchatId,msg:u.data,type:"chat",ext:f,success:function(){$.sendFriend(g.emchatId,"business_process"),clearTimeout(p),u.status=1,r()}})}}var i=$.param("techId"),n=$.param("commentId"),r=$.localStorage("tech-reward-param"),s=$.localStorage("backIndex"),c=$.param("code")||$.getUrlParam("code"),d=$("#giftNotEnoughTip"),o=$("#giftNotEnoughTip>div>div.tip>span"),u=$("#content>div:nth-of-type(4)"),l=$.$.clubID,p=!1,f=0;if(!i)return $.tipShow("技师不存在！"),$.pageCancel();s?($.localStorageClear("backIndex"),$("#title>div:nth-of-type(2)").Click(function(e){e.stopImmediatePropagation(),$.page()})):"true"==$.param("backPublic")?$("#title>div:nth-of-type(2)").Click(function(e){e.stopImmediatePropagation(),history.back()}):$("#title>div:nth-of-type(2)").Click(function(e){e.stopImmediatePropagation(),$.page()});var g;e(),c&&r&&$.ajax({url:($.$.clubID?"../":"")+"../wx/oauth2/user/openid",type:"post",data:{code:c,scope:"snsapi_userinfo",wxmp:"9358",userType:"user",state:"tech-reward"},success:function(a){if(200==a.statusCode)$.localStorageClear("tech-reward-param"),e();else{if("935801"!=a.statusCode)return $.tipShow(a.msg||"获取openId失败！"),$.pageCancel();$.localStorage("tech-reward-param",parseInt($("#content>div:nth-of-type(3)>div.active")[0].innerHTML)||0),$.getOauthCode("","9358","tech_reward","userInfo")}}})}();