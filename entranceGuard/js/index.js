window.onload = function() {
    document.addEventListener('message', function(msg) {
        var data = JSON.parse(msg.data)
        if(data.hasOwnProperty('phoneNum')){
            localStorage.setItem('phone',data.phoneNum)
        }
    });
}
$(function(){
    var  listdata = [
        {'name':'预约申请',icon:'./images/shenqing.png',router: './garduserinfo.html'},
        {'name':'历史申请记录',icon:'./images/liebiao.png',router: './applayList.html'}];
    var str = '';
    for(let item of listdata){
        str+='<div class="homeList flexBetween" onclick="goRouter(this)" data-router='+item.router+'><span>'+item.name+'</span><img src='+item.icon+'></div>'
    }
    $("#home").append($(str))
})
function goRouter(even){
    window.location.href = $(even).attr("data-router")
}
