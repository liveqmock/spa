!function(){$.ajax({url:"item",success:function(i){for(var e="",t=$("#content"),d=t.Children(),n=$("#pageNumber"),c=0,v=i.length,a=0;a<v;a++)e+="<div>                        <div>                            <div>                                <div>"+(i[a].title||"")+"</div>                                <div>"+(i[a].intro||"")+'</div>                                <div imageCache="'+(i[a].imageUrl||$.$.defaultBanner)+'"></div>                            </div>                            <div class="richText">'+(i[a].description?i[a].description.replace(/src/g,"imageCache"):"")+"</div>                       </div>                    </div>";""==e?(n.Hide(),t.Class("nullData")):d.Html(e),$.scroll({content:t[0],contentX:d[0],indexX:c,endX:function(i){c=i,n.Text(c+1+"/"+v)}}),n.Text(c+1+"/"+v),$.pageSwitch(),$("#content>div>div>div>div:nth-of-type(1)>div:nth-of-type(3)").DivBackgroundCacheBack(),$("#content>div>div>div>div:nth-of-type(2) img").ImgSrcCacheBack()}})}();