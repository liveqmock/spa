!function(){var a=$.getUrlParam("oneYuanBaseId",!0);return a?($.ajax({url:"../api/v2/club/one_yuan/draw/records",isReplaceUrl:!0,data:{clubId:$.$.clubID,oneYuanBaseId:a},success:function(a){if(200==a.statusCode){a=a.respData;var e=[];a.forEach(function(a){e.push('<div class="item">                        <div>第'+a.currentPeriod+"期 （揭晓时间："+a.createdTime+'）</div>                        <div>                            <div style="background-image: url('+(a.userAvatarUrl||$.$.defaultHeader)+')"></div>                            <div>                                <div>获奖者：<span>'+a.userName+"</span></div>                                <div>参与次数：<span>"+a.ticketCount+"</span><span>次</span></div>                                <div>中将号码：<span>"+a.actDrawNo+"</span></div>                            </div>                        </div>                    </div>")}),e.length>0?($("#content>div:nth-of-type(2)").Html(e.join("")),$("#finishTip").ClassClear("none")):$("#content>div:nth-of-type(2)").Class("nullData"),$("#loadTip").Class("none")}}}),void $.pageSwitch()):($.tipShow("缺少活动ID"),$.pageCancel())}();