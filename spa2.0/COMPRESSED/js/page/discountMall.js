!function(){function e(){var e=$("#service-item-selector li.active")[0],a="",u="",p=o[0].value;e&&(a=e.getAttribute("itemId")||"",u=e.innerHTML),$.ajax({url:"../api/v2/club/item_card/activity/list",type:"post",data:{clubId:n,itemId:a,itemName:p},isReplaceUrl:!0,success:function(e){if(200==e.statusCode){e=e.respData;var n,g,b=e.activityList||[],w="",k=0;for(""==a&&""==p&&(h=b,b.length>0&&(f=b[0].id,C=e.optimalActivity.id,m[C]="best",m[f]="new")),l=0;l<b.length;l++)for(n=b[l],k=0;k<n.itemCardPlans.length;k++)if(g=n.itemCardPlans[k],"Y"==g.optimal){w+=i(n,g);break}if(c[0].innerHTML=w,o[0].value||u&&"全部项目"!=u?(b.length>0?s[0].innerHTML="以下是包含“<span>"+(o[0].value||u)+"”</span>项目的优惠":s[0].innerHTML="没有“<span>"+(o[0].value||u)+"</span>”相关的次卡，看看其它吧~",s.Show()):s.Hide(),h.length>0?(v.Hide(),$(".result-list").Show()):(v.Show(),$(".result-list").Hide()),""==a&&""==p)r.Hide(),d.Hide();else{var y=[];for(l=0;l<h.length;l++)t(h[l].id,b)||y.push(h[l]);if(0==y.length)r.Text("没有更多了~"),r.Show(),d.Hide();else{for(w="",l=0;l<y.length;l++)for(n=y[l],k=0;k<n.itemCardPlans.length;k++)if(g=n.itemCardPlans[k],"Y"==g.optimal){w+=i(n,g);break}d[0].innerHTML=w,r.Text("更多"),r.Show(),d.Show()}}}}})}function i(e,i){var t=i.actAmount/100/(i.giveCount+i.paidCount);t>1.001?t=Math.round(t):(t<.01&&(t=.01),t=t.toFixed(2));var a=0;return 0!=e.totalCount&&e.paidCount>.49*e.totalCount&&(a=e.paidCount/e.totalCount*100),"<li cardId='"+e.id+"' class='"+("已售完"==e.statusName?"sellOut":"已过期"==e.statusName?"expired":"")+"'>                           <div style='background-image: url("+(e.imageUrl||$.$.defaultService)+")'><div>"+e.name+"</div></div>                           <div><b>"+t+"</b>元/次<span>买"+i.paidCount+"送"+i.giveCount+"</span></div>                           <div>"+Math.round(i.itemAmount/100)+"元/次"+(a?"<div>"+a+"%<div style='left:"+a+"%'></div></div>":"")+"</div>"+(m[e.id]?"<div class='"+m[e.id]+"'>"+("new"==m[e.id]?"最新":"最优惠")+"</div>":"")+"                     </li>"}function t(e,i){for(var t=0;t<i.length;t++)if(i[t].id==e)return!0;return!1}var a,l,n=$.$.clubID||$.param("clubId")||"",s=$(".result-list>div.tip"),r=$(".result-list>div.more-tip"),c=$(".result-list>ul:nth-of-type(1)"),d=$(".result-list>ul:nth-of-type(2)"),o=$(".search-wrap>input"),u=$("#service-item-selector"),v=$(".nullData"),p=!1,f="",C="",m={},h=[];return n?(c.Delegate("click",">li",function(e,i){$.page("onceCardDetail&id="+i.getAttribute("cardId"))}),d.Delegate("click",">li",function(e,i){$.page("onceCardDetail&id="+i.getAttribute("cardId"))}),$(".search-wrap>div").Click(function(){p?(u.ClassClear("active"),p=!1):(u.Class("active"),p=!0)}),$(".btn-wrap>div:nth-of-type(1)").Click(function(){u.ClassClear("active"),p=!1}),$(".btn-wrap>div:nth-of-type(2)").Click(function(){var i=$("#service-item-selector li.active")[0];i&&e(),u.ClassClear("active"),p=!1}),$(".search-icon").Click(function(){e()}),o.Event("keypress",function(i){13==i.keyCode&&e()}),$("#footer").Click(function(){$.page("serviceList")}),e(),void $.ajax({url:"../api/v2/club/category/service/list",data:{clubId:n},isReplaceUrl:!0,success:function(e){if(200==e.statusCode){e=e.respData;var i,t=0,n="<ul><li class='active' itemId=''>全部项目</li></ul>";for(l=0;l<e.length;l++){for(n+="<div class='service-list'>                                            <div>"+e[l].name+"</div>                                            <ul>",t=0;t<e[l].serviceItems.length;t++)i=e[l].serviceItems[t],n+="<li itemId='"+i.id+"'>"+i.name+"</li>";n+="</ul></div>"}$("#service-item-selector>div.pop-content")[0].innerHTML=n}a=$("#service-item-selector ul>li"),a.Click(function(e,i){i.classList.contains("disabled")||(a.ClassClear("active"),i.classList.add("active"))}),$.pageSwitch()}})):($.tipShow("页面访问缺少参数！"),$.pageCancel())}();