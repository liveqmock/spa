!function(){var e=["非常差","很差","一般","很好","非常好"],t=$(".stars-area"),a=$(".stars-area>div"),n=$(".comment-star > div > div:last-child"),r=$("#sureBtn"),i=$.param("clubId")||$.getUrlParam("clubId")||"",c=$.param("money");return""!=i&&c?($(".success-info > div > span:nth-of-type(2) > span:first-child").Text($.param("money")),t.Click(function(t,r,i){var c=Math.ceil((t.offsetX||t.layerX)/r.clientWidth/.2);a[i].style.width=20*c+"%",n[i].innerHTML=e[c-1]}),r.Click(function(){var e=$(".comment-text")[0].value;e&&e.length>1e3&&(e=e.substr(0,1e3)),$.ajax({url:"../api/v2/profile/user/feedback/create",isReplaceUrl:!0,type:"post",data:{clubId:i,environmentalScore:parseInt(a[0].style.width),serviceScore:parseInt(a[1].style.width),comments:encodeURIComponent(e),token:$.$.payToken},success:function(){$.tipShow("提交成功！"),$.page()}})}),void $.pageSwitch()):($.tipShow("参数错误"),$.pageCancel())}();