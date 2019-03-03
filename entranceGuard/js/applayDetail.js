var phone = '';
var applyNum = '';
$(function(){
    if(localStorage.getItem('phone')){
        phone = localStorage.getItem('phone');
    }
    applyNum =  getQueryString('applyNum')
    if(applyNum){
        getDataDetail(applyNum)
    }
})
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function goInfo(){
    window.location.href='./userinfo.html'
}
function getDataDetail(applyNum){
    var data = {
        applyNum: applyNum
    }
    data = JSON.stringify(data);
    $.ajax({
        url: ajaxUrl + 'getApplyInfo',
        timeout: 3000,
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        data:data,
        success: function(response) {
            if(response.rescode === '200'){
                console.log(response)
                var userInfo = response;
                $(".acceptCompanyName").html(userInfo.acceptCompanyName)
                $(".deptName").html(userInfo.deptName);
                $(".acceptName").html(userInfo.acceptName);
                $(".acceptPhone").html(userInfo.acceptPhone);
                $(".name").html(userInfo.name)
                $(".cardNum").html(userInfo.cardNum)
                $(".reason").html(userInfo.reason);
                $(".startTime").html(userInfo.startTime);
                $(".endTime").html(userInfo.endTime);
                $(".imgInfo").css('background-image', 'url('+userInfo.photoUrl+')');
                if(userInfo.carFlag == 1){
                    $("#hasCar").css({'display':'block'});
                    $(".licenseNum").html(userInfo.licenseNum);
                }
                if(userInfo.carFlag == 2){
                    $("#noCar").css({'display':'block'});
                }
                if(userInfo.entourageList.length != 0){
                    $("#peitong").css({"display":'block'});
                    var str = '';
                    for(var i=0;i<userInfo.entourageList.length;i++){
                        str+='<p class="peitongBox"><span>'+userInfo.entourageList[i].name+'&nbsp;&nbsp;'+ userInfo.entourageList[i].cardNum+'</span></p>'
                    }
                    $(".personInfo").append($(str))
                }
                if(userInfo.auditStatus == 1){
                    $(".statiusText").html("状态 : 待审核")
                }
                if(userInfo.auditStatus == 2){
                    $(".statiusText").html("状态 : 审核不通过")
                    $(".reApplay").css({"display": 'block'});
                }
                if(userInfo.auditStatus == 3){
                    $(".statiusText").html("状态 : 审核通过");

                }
            }else{
                tanwin(response.resdes)
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
        }
    });
}