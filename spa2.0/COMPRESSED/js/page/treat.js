!function(){function e(){l[0]&&l[1]?n.ClassClear("disabled"):n.Class("disabled")}var a=$("#moneyInput"),t=$("#inputPlaceholder"),n=$("#sureBtn"),s=$("#telPhone"),c=($("#explain"),$("#records"),$("#isVisible")),i="",l=[0,0],o="",u=$.param("accountId")||$.getUrlParam("accountId")||"";return""==u?($.tipShow("参数不正确"),$.pageCancel()):(setTimeout(function(){var e=($.$.winHeight-$("#content>div")[0].offsetHeight)/$.$.scale/16;e>0&&setTimeout(function(){$(".btn-area").CSS({"margin-top":e+"rem"})},0)},0),a.Event("focus",function(){t.Class("hide")}),a.Event("blur",function(){""==a.Value()&&t.ClassClear("hide")}),a.Event("input",function(){if(""==a[0].value)i.length>1?(a[0].value=i,l[0]=1,e()):(i="",l[0]=0,e());else{l[0]=1,e();var t=a[0].value.match(/\./g);t&&a[0].value.match(/\./g).length>1&&(a[0].value=a[0].value.substring(0,a[0].value.length-1)),/^([1-9][0-9]*)$/g.test(a[0].value)?i=a[0].value:a[0].value=i}}),s.Verify("tel",function(a){a?l[1]=1:l[1]=0,e()}),c.Event("click",function(e,a){c.ClassHave("checked")?c.ClassClear("checked"):c.Class("checked")}),$.ajax({url:"../api/v2/financial/account/"+u,isReplaceUrl:!0,type:"post",success:function(e){"200"==e.statusCode?(e=e.respData,o=e.clubId,$("#balanceSpan").Text((e.amount/100).toFixed(2)),n.Event("click",function(){n.ClassHave("disabled")||(n.ClassHave("processing")?$.tipShow("正在授权，请稍候..."):(n.Class("processing"),n.Text("授权中..."),$.ajax({url:"../api/v2/financial/account/payforother/auth",isReplaceUrl:!0,type:"post",data:{accountId:u,amount:100*parseFloat(a.Value()),open:c.ClassHave("checked")?"Y":"N",telephone:s.Value()},success:function(e){n.ClassClear("processing"),n.Text("确认授权"),"200"!=e.statusCode?$.tipShow(e.msg||"授权失败。"):($.sessionStorage("tmpTreat_cache",JSON.stringify(e.respData)),$.page("treatDetail&backAccount=true&detailId="+e.respData.id))},error:function(e){$.tipShow(e||"系统错误")}})))})):$.tipShow(e.msg||"查询数据失败")}}),$("#explain").Click(function(){$.page("treatExplain")}),$("#records").Click(function(){$.page("treatRecords&clubId="+o)}),void $.pageSwitch())}();