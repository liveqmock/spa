!function(){$.ajax({url:"categoryService",success:function(i){var e,t,n,o,s,d,v="",r=$("#content"),a=$.param("id"),c=0,l=$.sessionStorage("serviceList_top");for(s=0,n=i.length;s<n;s++){for(a==i[s].id&&(c=s),d=0,e="",o=i[s].serviceItems.length;d<o;d++)t=i[s].serviceItems[d],e+='<div hh="'+t.id+'">                        <div style="background-image: url(\''+t.imageUrl+"')\"></div>                            <div>                                <div>"+t.name+"</div>                                <div>"+$.formatPrice(t.price1,t.duration1,t.durationUnit)+"<span><span "+(t.price2?"":'style="display:none;"')+">加钟：</span>"+$.formatPrice(t.price2,t.duration2,t.durationUnitPlus)+"</span></div>                            </div>                        </div>";v+='<div>                        <div class="'+(i[s].code||"").toLowerCase()+'">                            <div></div>                            <div>'+i[s].name+"</div>                        </div>                        <div>"+e+"</div>                    </div>"}""!=v?(r.Class("hasContent"),r.Html(v),$("#content>div>div:nth-of-type(2)>div").Click(function(i,e,t){$.sessionStorage("serviceList_top",r[0].scrollTop),$.page("serviceItem&id="+e.getAttribute("hh"))}),r[0].scrollTop&&(r[0].scrollTop=$("#content>div")[c].offsetTop,null!=l&&(r[0].scrollTop=l),$.sessionStorageClear("serviceList_top"))):(r.Class("noContent"),v="<div>                                <div>暂时没有可预约项目哦，去约技师吧</div>                                <div>预约技师</div>                        </div>",r.Html(v),$("#content>div>div:nth-of-type(2)").Click(function(){$.page("technicianList",-1,!0)})),$.pageSwitch()}})}();