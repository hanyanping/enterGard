var phone = '17666143833';
$(function(){
    if(localStorage.getItem('phone')){
        phone = localStorage.getItem('phone');
    }
    getDataList();
})
function getDataList() {
    $('.scroll').html('');
    var data = {
        phoneNum: phone
    }
    data = JSON.stringify(data);
    $.ajax({
        url: ajaxUrl + 'getApplyList',
        timeout: 3000,
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        data:data,
        success: function(response) {
            if(response.rescode == 200){
                var listdata = response.applyList;
                console.log(listdata.length)
                if (response.applyList.length != 0) {
                    $(".nodataBox").css({'display':'none'});
                    $(".scroll").css({'display':'block'});
                    var str = '';
                    for(var i = 0;i< listdata.length;i++){
                        console.log(listdata)
                        if(listdata[i].auditStatus == 1){
                            listdata[i].audit = '待审核'
                        }
                        if(listdata[i].auditStatus == 2){
                            listdata[i].audit = '审核不通过'
                        }
                        if(listdata[i].auditStatus == 3){
                            listdata[i].audit = '审核通过'
                        }
                        str+=' <div class="listBox">' +
                            '<div class="flexBetween listTop"> ' +
                            '<span>'+listdata[i].applyTime+'</span><span class="applyStatus origin">'+listdata[i].audit+'</span>' +
                            '</div>' +
                            '<div class="listMiddle flexBetween" onclick=goDetail("'+listdata[i].applyNum+'")>' +
                            '<div class="flexLeft">' +
                            '<div class="info">' +
                            '<div class="flexBetween infoText">' +
                            '<p>姓名：'+listdata[i].name+'</p>' +
                            ' <span >性别： '+listdata[i].sex+'</span>' +
                            '</div>' +
                            '<p class="idCard infoText" >身份证号：'+listdata[i].cardNum+'</p>' +
                            '<p class="companyName infoText">单位名称：'+listdata[i].companyName+
                            '</p>' +
                            '</div>' +
                            '</div>' +
                            '<div class="flexRight">' +
                            '<img class="godetail" src="./images/right.png">' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                    }
                    $('.scroll').append($(str));
                }
                if (listdata.length == 0 ) {
                    $(".nodataBox").css({'display':'block'});
                    $(".scroll").css({'display':'none'})
                }
            }else{
                $(".nodataBox").css({'display':'block'});
                $(".scroll").css({'display':'none'})
                tanwin(response.data.resdes)
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
        }
    });
}
function goDetail(applyNum){
    console.log(applyNum)
    window.location.href = './applyDetail.html?applyNum='+applyNum;
}

