!function(){function a(a){N=a||N+1,m||(m=!0,$.ajax({url:"../api/v2/club/one_yuan/act/list",isReplaceUrl:!0,data:{clubId:$.$.clubID||"",page:N,pageSize:H},success:function(i){if(200==i.statusCode){i=i.respData;var d=[];i.forEach(function(a){n!=a.clubId&&(n=a.clubId,d.push('<div class="club-header" data-club-id="'+a.clubId+'">                                            <div>'+a.clubName+"</div>                                            <div></div>                                        </div>")),d.push('<div class="item '+a.status+'" data-status="'+a.status+'" data-club-id="'+a.clubId+'" data-one-yuan-id="'+a.oneYuanId+'" data-user-one-yuan-id="'+a.userOneYuanId+'" data-is-draw="'+(a.drawUserId==$.$.userID)+'">                                        <div>                                            <div style="background-image: url('+(a.actImageUrl||$.$.defaultService)+')"></div>                                            <div>                                                <div>                                                    <div>'+a.actName+"</div>                                                    <div>"+k[a.status]+'</div>                                                </div>                                                <div>                                                    <div>                                                        <div class="act-process">开奖进度：<span>'+((a.totalPaidCount-a.canPaidCount)/a.totalPaidCount*100).toFixed(2)+'%</span></div>                                                        <div class="act-process-bar"><div style="width:'+((a.totalPaidCount-a.canPaidCount)/a.totalPaidCount*100).toFixed(2)+'%;"></div></div>                                                        <div class="act-nums">                                                            <div>总需'+a.totalPaidCount+"次</div>                                                            <div>还剩<span>"+a.canPaidCount+'</span></div>                                                        </div>                                                    </div>                                                    <div class="act-buy-btn" data-club-id="'+a.clubId+'" data-one-yuan-id="'+a.oneYuanId+'">继续抢购</div>                                                </div>                                                <div>                                                    <div>我参与了<span>'+a.ticketCount+'</span>次</div>                                                    <div class="check-my-nums" data-club-id="'+a.clubId+'" data-act-name="'+a.actName+'" data-one-yuan-id="'+a.oneYuanId+'">查看我的号码</div>                                                </div>                                                <div>                                                    <div><div>获奖者：</div><div>'+("complete"==a.status?a.drawUserName+a.phoneNum.replace(/^(\d{3})\d{4}(\d{4})$/g,"（$1****$2）"):"")+"</div></div>                                                    <div><div>幸运号码：</div><div>"+a.actDrawNo+"</div></div>                                                    <div><div>揭晓时间：</div><div>"+a.drawTime+"</div></div>                                                </div>                                            </div>                                        </div>                                    </div>")}),1==a?(v.Html(d.join("")),d.length>0?v.ClassClear("nullData"):(v.Class("nullData"),f=!0),t=v[0].clientHeight):(v.Html(d.join(""),!0),d.length<H&&(f=!0,D.ClassClear("none"))),m=!1,w.Class("none")}else $.tipShow(i.msg||"查询数据失败")}}))}function i(a){P=a||P+1,I||(I=!0,$.ajax({url:"../api/v2/club/one_yuan/draw/list",isReplaceUrl:!0,data:{clubId:$.$.clubID||"",page:P,pageSize:H},success:function(i){if(200==i.statusCode){i=i.respData;var d=[];C=!0,i.forEach(function(a){l!=a.clubId&&(l=a.clubId,d.push('<div class="club-header" data-club-id="'+a.clubId+'">                                            <div>'+a.clubName+"</div>                                            <div></div>                                        </div>")),d.push('<div class="item complete" data-status="'+a.status+'" data-club-id="'+a.clubId+'"  data-club-id="'+a.clubId+'" data-one-yuan-id="'+a.oneYuanId+'" data-user-one-yuan-id="'+a.userOneYuanId+'" data-is-draw="'+(a.drawUserId==$.$.userID)+'">                                        <div>                                            <div style="background-image: url('+(a.actImageUrl||$.$.defaultService)+')"></div>                                            <div>                                                <div>                                                    <div>'+a.actName+'</div>                                                    <div>已揭晓</div>                                                </div>                                                <div>                                                    <div>                                                        <div class="act-nums">                                                            <div>总需'+a.totalPaidCount+"次</div>                                                            <div>还剩<span>0</span></div>                                                        </div>                                                    </div>                                                </div>                                                <div>                                                    <div>我参与了<span>"+a.ticketCount+'</span>次</div>                                                    <div class="check-my-nums" data-club-id="'+a.clubId+'" data-act-name="'+a.actName+'" data-one-yuan-id="'+a.oneYuanId+'">查看我的号码</div>                                                </div>                                                <div>                                                    <div><div>幸运号码：</div><div>'+a.actDrawNo+"</div></div>                                                    <div><div>揭晓时间：</div><div>"+a.drawTime+"</div></div>                                                </div>                                            </div>                                        </div>                                    </div>")}),1==a?(r.Html(d.join("")),d.length>0?r.ClassClear("nullData"):(r.Class("nullData"),g=!0),e=r[0].clientHeight):(r.Html(d.join(""),!0),d.length<H&&(g=!0,Y.ClassClear("none"))),I=!1,y.Class("none")}else $.tipShow(i.msg||"查询数据失败")}}))}function d(a,i){$("#showNumsPop>div>div:nth-of-type(1)>div:nth-of-type(1)").Text(i),$("#showNumsPop>div>div:nth-of-type(2)>div:nth-of-type(1)>span").Text(a.length),$("#showNumsPop>div>div:nth-of-type(2)>div:nth-of-type(2)").Text(a.join(" ")),p.Class("active")}var t,e,n,l,s=($("#content"),$(".switch-two-button > div")),c=$(".content-area"),o=$(".all-records"),u=$(".win-records"),v=$("#allRecordsList"),r=$("#winRecordsList"),p=$("#showNumsPop"),h="all",b={},m=!1,I=!1,f=!1,g=!1,C=!1,w=$(".all-records>div.loadTip"),y=$(".win-records>div.loadTip"),D=$(".all-records>div.finishTip"),Y=$(".win-records>div.finishTip"),k={not_online:"未上线",online:"进行中",end:"待开奖",complete:"已揭晓",refund:"已退款"},N=1,P=1,H=10,T=.4;return $.$.userToken?(o.Event("scroll",function(i){!f&&o[0].scrollTop+o[0].clientHeight-(N+T-1)*t>=0&&a()}),u.Event("scroll",function(a){!g&&u[0].scrollTop+u[0].clientHeight-(P+T-1)*e>=0&&i()}),a(1),$.pageSwitch(),s.Click(function(a,d){var t=$(d);t.ClassHave("active")||(s.ClassClear(),t.Class("active"),"win"==d.dataset.type?(c.Class("show-win"),h="win",C||i(1)):(c.ClassClear("show-win"),h="all"))}),$(".content-area").Delegate("click","div.club-header",function(a,i){$.$.clubID?$.page("home",1,!0):location.href=location.origin+location.pathname+"?club="+i.dataset.clubId}).Delegate("click","div.act-buy-btn",function(a,i){$.$.clubID?$.page("oneYuanDetail&oneYuanId="+i.dataset.oneYuanId):location.href=location.origin+location.pathname+"?club="+i.dataset.clubId+"#oneYuanDetail&oneYuanId="+i.dataset.oneYuanId}).Delegate("click","div.item>div>div:nth-of-type(2)>div:nth-of-type(3)>div:nth-of-type(2)",function(a,i){var t=i.dataset.oneYuanId,e=i.dataset.actName;b[t]?d(b[t],e):($.eventMaskShow(!0),$.ajax({url:"../api/v2/club/one_yuan/my/ticket_no",isReplaceUrl:!0,data:{clubId:i.dataset.clubId,oneYuanId:t},success:function(a){$.eventMaskShow(!1),200==a.statusCode?(a=a.respData.split(","),a.length>0&&a[0]?b[t]=a:b[t]=[],d(b[t],e)):$.tipShow(a.msg||"加载我的号码失败")},error:function(a){$.eventMaskShow(!1)}}))}).Delegate("click",".all-records div.item",function(a,i){var d=a.target||a.srcElement,t=$(d),e=i.dataset;t.ClassHave("act-buy-btn")||t.ClassHave("check-my-nums")||($.$.clubID?$.page("oneYuanDetail&oneYuanId="+e.oneYuanId):location.href=location.origin+location.pathname+"?club="+e.clubId+"#oneYuanDetail&oneYuanId="+e.oneYuanId)}).Delegate("click",".win-records div.item",function(a,i){var d=a.target||a.srcElement,t=$(d),e=i.dataset;t.ClassHave("act-buy-btn")||t.ClassHave("check-my-nums")||$.page("oneYuanRecordsDetail&userOneYuanId="+e.userOneYuanId+"&clubId="+e.clubId)}),void $("#showNumsPop>div>div:nth-of-type(1)>div:nth-of-type(2)").Click(function(){p.ClassClear("active")})):($.$.loginUrl="oneYuanRecords",void $.page("login"))}();