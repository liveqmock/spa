!function(){function initPage(data){if(data=data.respData,$("#content>div:nth-of-type(2)>div:nth-of-type(1)").Text(data.clubName),$("#content>div:nth-of-type(3)>div:nth-of-type(1)>div:nth-of-type(1)").Html("<div>"+($.$.ua.isFirefox&&data.prizeName.length>7?data.prizeName.length.substr(0,7)+"...":data.prizeName)+"</div>"),$("#content>div:nth-of-type(3)>div:nth-of-type(1)>div:nth-of-type(2)").Text("中奖时间:"+data.prizeTime),$("#content>div:nth-of-type(3)>div:nth-of-type(2)").Text("大转盘"),"1"==prizeType)$("#content>div:nth-of-type(4)")[0].style.display="none",$("#content>div:nth-of-type(5)>div:nth-of-type(2)").Text($.spaceStr(data.verifyCode,!1,4));else{$("#content>div:nth-of-type(5)")[0].style.display="none";var verifyCode=data.verifyCode;verifyCode&&(verifyCode=$.spaceStr(verifyCode,!1,4)),$("#content>div:nth-of-type(4)>div:nth-of-type(4)").Text(verifyCode),new QRCode($("#content  > div:nth-of-type(4) > div:nth-of-type(3)")[0],{text:eval("("+data.qrCode+")").qrNo})}$("#content>div:nth-of-type(6)>div:nth-of-type(2)").Html(data.actDesp||"暂无抽奖说明"),$.pageSwitch(!0,!1)}var actId=$.param("actId"),cardId=$.param("cardId"),prizeType=$.param("prizeType"),recordId=$.param("recordId"),clubId=$.param("clubId")||$.$.clubID;return actId?($("#content>div#title>div:nth-of-type(2)").Click(function(e){e.stopImmediatePropagation(),"9358"==$.$.visitChannel?history.go(-1):$.page("lucky",-1,!0)}),void $.ajax({url:($.$.clubID?"../":"")+"api/v2/user/luckyWheel/cardPrizeDetail",isReplaceUrl:!0,type:"post",data:{actId:actId,cardId:cardId,prizeType:prizeType,recordId:recordId},success:function(e){if("307"==e.statusCode)setTimeout(function(){$.ajax({url:($.$.clubID?"../":"")+"api/v2/user/luckyWheel/cardPrizeDetail",isReplaceUrl:!0,type:"post",data:{actId:actId,cardId:cardId,prizeType:prizeType,recordId:recordId},success:function(e){return"200"==e.statusCode&&e.respData?void initPage(e):($.tipShow(e.msg||"请求数据失败！"),$.pageCancel())}})},300);else{if("200"!=e.statusCode||!e.respData)return $.tipShow(e.msg||"请求数据失败！"),$.pageCancel();initPage(e)}}})):($.pageCancel(),$.tipShow("地址栏参数不正确！"))}();