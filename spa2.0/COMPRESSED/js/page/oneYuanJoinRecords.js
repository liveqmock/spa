!function(){function e(e){l||(l=!0,t=e||t+1,d.ClassClear("none"),o.Class("none"),r=!1,$.ajax({url:"../api/v2/club/one_yuan/paid/records",isReplaceUrl:!0,data:{clubId:$.$.clubID,oneYuanId:a,page:t,pageSize:s},success:function(e){if(200==e.statusCode){e=e.respData;var a=[];e.forEach(function(e){a.push('<div class="item">                                <div>                                    <div style="background-image: url('+(e.userAvatarUrl||$.$.defaultHeader)+')"></div>                                    <div>                                        <div>                                            <div>'+e.userName+"（"+e.phoneNum.replace(/^(\d{3})\d{4}(\d{4})$/g,"$1****$2")+"）</div>                                            <div><span>"+e.ticketCount+"</span>人次</div>                                        </div>                                        <div>"+e.createdTime+"</div>                                    </div>                                </div>                            </div>")}),1==t?(n.Html(a.join("")),a.length>0?n.ClassClear("nullData"):(n.Class("nullData"),r=!0),c=i[0].scrollHeight):(n.Html(a.join(""),!0),a.length<s&&(r=!0,o.ClassClear("none"))),l=!1,d.Class("none")}else $.tipShow(e.msg||"查询数据失败")}}))}var a=$.getUrlParam("oneYuanId",!0),i=$("#content"),n=$("#content>.list"),l=!1,t=1,s=10,d=$("#loadTip"),o=$("#finishTip"),r=!1,c=0,u=.4;return a?(i.Event("scroll",function(a){!r&&i[0].scrollTop+i[0].clientHeight-(t+u-1)*c>=0&&e()}),e(1),void $.pageSwitch()):($.tipShow("缺少活动ID"),$.pageCancel())}();