!function(){if(!$.param("clubId")&&!$.$.clubID)return void $.pageCancel();var a=$("#content>div>div.list");$.ajax({url:"../api/v2/user/wifi",isReplaceUrl:!0,data:{clubId:$.param("clubId")||$.$.clubID},success:function(i){i="200"!=i.statusCode?[]:i.respData;for(var d="",l=0;l<i.length;l++)d+="<div><div>WiFi："+i[l].ssid+"</div><div>密码："+i[l].password+"</div></div>";a.Html(d),0==i.length&&a.Class("nullData")}}),$.pageSwitch()}();