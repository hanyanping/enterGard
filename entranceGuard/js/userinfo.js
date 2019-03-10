var calendar = new LCalendar();
calendar.init({
    'trigger': '#start_date', //标签id
    'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
    'minDate':  (new Date().getFullYear()) + '-' + (new Date().getMonth()+1)+ '-' +(new Date().getDate()), //最小日期
    // 'maxDate': (new Date().getFullYear()+3) + '-' + 12 + '-' + 31 //最大日期
});
var calendar = new LCalendar();
calendar.init({
    'trigger': '#end_date', //标签id
    'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
    'minDate': (new Date().getFullYear()) + '-' + (new Date().getMonth()+1)+ '-' +(new Date().getDate()), //最小日期
    // 'maxDate':  (new Date().getFullYear()) + '-' + (new Date().getMonth()+1)+ '-' +(new Date().getDate()), //最小日期
});
var provinces = new Array("京","沪","浙","苏","粤","鲁","晋","冀",
    "豫","川","渝","辽","吉","黑","皖","鄂",
    "津","贵","云","桂","琼","青","新","藏",
    "蒙","宁","甘","陕","闽","赣","湘");

var keyNums = new Array("0","1","2","3","4","5","6","7","8","9",
    "Q","W","E","R","T","Y","U","I","O","P",
    "A","S","D","F","G","H","J","K","L",
    "OK","Z","X","C","V","B","N","M","Del");
var next=0;
function showProvince(){
    $("#pro").html("");
    var ss="";
    for(var i=0;i<provinces.length;i++){
        ss=ss+addKeyProvince(i)
    }
    $("#pro").html("<ul class='clearfix ul_pro'>"+ss+"<li class='li_close' onclick='closePro();'><span>关闭</span></li><li class='li_clean' onclick='cleanPro();'><span>清空</span></li></ul>");
}
function showKeybord(){
    $("#pro").html("");
    var sss="";
    for(var i=0;i<keyNums.length;i++){
        sss=sss+'<li class="ikey ikey'+i+' '+(i>9?"li_zm":"li_num")+' '+(i>28?"li_w":"")+'" ><span onclick="choosekey(this,'+i+');">'+keyNums[i]+'</span></li>'
    }
    $("#pro").html("<ul class='clearfix ul_keybord'>"+sss+"</ul>");
}
function addKeyProvince(provinceIds){
    var addHtml = '<li>';
    addHtml += '<span onclick="chooseProvince(this);">'+provinces[provinceIds]+'</span>';
    addHtml += '</li>';
    return addHtml;
}

function chooseProvince(obj){
    $(".input_pro span").text($(obj).text());
    $(".input_pro").addClass("hasPro");
    $(".input_pp").find("span").text("");
    $(".ppHas").removeClass("ppHas");
    next=0;
    showKeybord();
}


function choosekey(obj,jj){
    if(jj==29){
        alert("车牌："+$(".car_input").attr("data-pai"));
        layer.closeAll();
    }else if(jj==37){
        if($(".ppHas").length==0){
            $(".hasPro").find("span").text("");
            $(".hasPro").removeClass("hasPro");
            showProvince();
            next=0;
        }
        $(".ppHas:last").find("span").text("");
        $(".ppHas:last").removeClass("ppHas");
        next=next-1;
        if(next<1){
            next=0;
        }
        console.log(next);
    }else{
        if(next>5){
            return
        }
        console.log(next);
        for(var i = 0; i<$(".input_pp").length;i++){
            if(next==0 & jj<10 & $(".input_pp:eq("+next+")").hasClass("input_zim")){
                layer.open({
                    content: '车牌第二位为字母',
                    skin: 'msg',
                    time: 1
                });
                return
            }
            $(".input_pp:eq("+next+")").find("span").text($(obj).text());
            $(".input_pp:eq("+next+")").addClass("ppHas");
            next=next+1;
            if(next>5){
                next=6;
            }
            getpai();
            return
        }

    }



}
function closePro(){
    layer.closeAll()
}
function cleanPro(){
    $(".ul_input").find("span").text("");
    $(".hasPro").removeClass("hasPro");
    $(".ppHas").removeClass("ppHas");
    next=0;
}
function trimStr(str){return str.replace(/(^\s*)|(\s*$)/g,"");}
function getpai(){
    var pai=trimStr($(".car_input").text());
    $(".car_input").attr("data-pai",pai);
}
window.onload = function() {

    $(".input_pro").click(function(){
        layer.open({
            type: 1
            ,content: '<div id="pro"></div>'
            ,anim: 'up'
            ,shade :false
            ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
        });
        showProvince()
    })
    $(".input_pp").click(function(){
        if($(".input_pro").hasClass("hasPro")){ // 如果已选择省份
            layer.open({
                type: 1
                ,content: '<div id="pro"></div>'
                ,anim: 'up'
                ,shade :false
                ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
            });
            showKeybord()
        }else{
            $(".input_pro").click()
        }
    })


}

$(function() {
    $('#start_date').bind("input", function () {
        if($('#end_date').val()){
            var endStr = new Date($('#end_date').val()).getTime();
            var startStr = new Date($(this).val()).getTime();
            if(startStr>endStr){
                tanwin('结束时间不能小于到访时间')
                $(this).val('');
            }
        }
    })
    $('#end_date').bind("input", function () {
        console.log($(this).val())
        if($('#end_date').val()){
            var startStr = new Date($('#start_date').val()).getTime();
            var  endStr = new Date($(this).val()).getTime();
            if(startStr>endStr){
                tanwin('结束时间不能小于到访时间')
                $(this).val('');
            }
        }
    })
});

var phone = '',
    userinfo = {
        company: '',
        department: '',
        respondent: '',
        applicantCompaney: '',
        applicant: '',
        idCard: '',
        reason: '',
        startTime: '',
        endTime: '',
        isCar: '1',
        licenseNum: '',
        chapterUrl: '',
        entourageList:[]
    },
    isShowthree = false,
    companyList = [],
    deptList = [],
    acceptNameList = [],
    isSelect = false,
    isSelectOne= false,
    provinceData = ['京','津','沪','渝','冀','晋','辽','吉','黑','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','琼','川','贵','云','陕','甘','青','藏','桂','蒙','宁','新','使','WJ'],
    numData = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','R','U','V','W','X','Y','Z','学','警','领','港','澳','试','挂','临']
carId = '',
    carData = [],
    // window.onbeforeunload = function(event) {
    //     localStorage.removeItem('phone')
    // }
    $(function(){
        if(localStorage.getItem('phone')){
            phone = localStorage.getItem('phone');
        }
        if(phone){
            getCompany();
        }

        $("#company").on("change",function(){
            userinfo.company = $(this).find('option:selected').val();
            if(userinfo.company){
                for(var item of companyList){
                    if(item.code === userinfo.company){
                        deptList = item.deptList;
                        var str='';
                        for(let item of deptList){
                            str+='<option value='+item.code+'>'+item.name+'</option>'
                        }
                        $("#department").append(str)
                    }
                }
            }else{
                deptList = [];
                var str='<option value="">请选择受访部门</option>';
                $("#department").html(str)
                userinfo.department = '';
            }
        })
        document.addEventListener('message', function(msg) {//获取客户端人脸识别数据
            var data = JSON.parse(msg.data);
            if(data){

                if(data.hasOwnProperty('imageData')){
                    userinfo.chapterUrl = data.imageData;
                    localStorage.setItem("url",userinfo.chapterUrl)
                    if(userinfo.chapterUrl){
                        $(".zhegaiceng").css({'display': 'block'})
                        sureJump()
                    }
                }
            }else{
                tanwin("检测失败，请重新检测")
            }
        });
        $("#shoufangperson").bind("input", function () {
            var val = $(this).val();
            if(val){
                getNameList(val)
            }
        })
        $("#idCard").on('change',function(){
            var reg= /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
            console.log($("#idCard").val())
            if(!(reg.test($("#idCard").val()))){
                tanwin('请输入正确身份证号')
            }
        })
        // $("#input1").attr("checked","checked");//默认第一个选中
        $('input:radio[name="radio1"]').change(function () {
            if($("#input1").is(":checked")){
                isSelect = true;
                $("#carSpan").css({"display":"block"})
                $("#carSpan1").css({"display":"flex"})
                if($("#carBox").find('tr').length>0){
                    $(".carTable ").css({'display':'block'});
                }else{
                    $(".carTable ").css({'display':'none'});
                }
            }
            if($("#input2").is(":checked")){
                $('#carCode').css({'display':'none'});
                $(".carTable ").css({'display':'none'});
                isSelect = false;
                $("#carSpan").css({"display":"none"});
                $("#carSpan1").css({"display":"none"})
            }
        })
        $('input:radio[name="radio3"]').change(function () {
            if($("#input3").is(":checked")){
                isSelectOne = true;
                $("#peitong").css({"display":"flex"});
                $('#peitongone').css({'display':'flex'});
                if($("#personBox").find('tr').length>0){
                    $(".personTable ").css({'display':'block'});
                }else{
                    $(".personTable ").css({'display':'none'});
                }
            }
            if($("#input4").is(":checked")){
                $('#peitong').css({'display':'none'});
                $('#peitongone').css({'display':'none'});
                $(".personTable ").css({'display':'none'});
                isSelectOne = false;
            }
        })

        function tab(pa) {
            $(pa + ".title li").click(function() {
                //找到是点击第几个
                var ind = $(pa + "#title li").index($(this));
                //alert(ind);
                //以前显示的隐藏
                $(pa + ".wrap div:visible").hide();
                //第几个显示
                $(pa + ".wrap div:eq(" + ind + ")").show();
                //有高亮ho 去掉高亮ho
                $(pa + ".title li.ho").removeClass("ho");
                //被点击的元素添加ho
                $(this).addClass("ho");

            }) //clicked
        } //tab ed
        tab(".carcodeBox ");
        var strProvince = '';
        for(let item of provinceData){
            strProvince+=' <a class="province"  ontouchend="selectItem(this)">'+item+'</a>'
        }
        $(".provinceBox").append(strProvince);
        var strNumber = '';
        for(let item of numData){
            strNumber+=' <a class="province"  ontouchend="selectItem(this)">'+item+'</a>'
        }
        $(".numberBox").append(strNumber);
        $(".sureCar").on("touchend",function(){
            $('#carCode').css({'display':'none'})
        })
        $(".addCarInfo").on("touchend",function(){
            if($("#carBox").find('tr').length == 5){
                tanwin(" 车辆最多可添加5辆");
                return;
            }

            var carNUm = $(".car_input").attr("data-pai");
            if(carNUm){
                    $(".carTable").css({'display':"block"})
                    carId = '';
                    cleanPro();
                    layer.closeAll();
                    var str = '<tr><td>'+carNUm+'</td><td data-id="'+carNUm+'" ontouchend="deletePerson(this)"><a>删除</a></td></tr>'
                    $(".carTableBox").append($(str)).change();

            }else{
                tanwin(" 请输入正确的车牌号");
            }
        })
    })
$(".carTableBox").bind("change", change());
function change(){
    console.log($("#carBox").find('tr').length)
}
function getNameList(name){
    var data = {
        acceptName: name
    }
    data = JSON.stringify(data)
    $.ajax({
        url: ajaxUrl + 'getAcceptNameList',
        timeout: 3000,
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        data:data,
        success: function(response) {
            if(response.rescode == 200){
                acceptNameList = response.acceptNameList;
                if(acceptNameList.length != 0){
                    $(".ulList").css({"display":'block'});
                    var str = '';
                    for(var item of acceptNameList){
                        str+='<li class="ulListli" ontouchend="getName(this)"  data-name="'+item.name+'">'+item.name+'</li>'
                    }
                    $(".ulList").find('ul').html($(str));
                }
            }else{
                tanwin(response.data.resdes)
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
        }
    });
}
function getCompany(){
    var data = {
        phoneNum: phone
    }
    data = JSON.stringify(data)
    $.ajax({
        url: ajaxUrl + '/getCompanyDept',
        timeout: 3000,
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        data:data,
        success: function(response) {
            if(response.rescode === '200'){
                companyList = response.companyList;
                var str='';
                for(let item of companyList){
                    str+='<option value='+item.code+'>'+item.name+'</option>'
                }
                $("#company").append(str)

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
function addPerson(){
    $(".personTable").css({'display':'block'})
    var companyName = $("#personName").val();
    var companyCard = $("#personIdnum").val();
    if($("#personBox").find('tr').length ==5){
        tanwin("陪同人最多可添加5人");
        return;
    }
    if(companyName == ''){
        tanwin("请输入陪同人姓名");
        return;
    }
    if(companyName.length > 10){
        companyName = companyName.substring(0,10);
    }
    if(companyCard == ''){
        tanwin('请输入陪同人身份证号');
        return;
    }
    var str='';
    str+='<tr> <td>'+companyName+'</td><td>'+companyCard+'</td><td ontouchend="deletePerson(this)""><a>删除</a></td></tr>';
    $("#personName").val('');
    $("#personIdnum").val('')
    $("#personBox").append($(str))
}
function deletePerson(el){
    console.log(el)
    $(el).parent().remove();
    if($("#carBox").find('tr').length ==0){
        $(".carTable").css({'display':"none"})
    }
    if($("#personBox").find('tr').length ==0){
        $(".personTable").css({'display':'none'})
    }
}
//    function submit(){
//        window.postMessage('success');
//    }
function getName(ev){
    var val = $(ev).text()
    $("#shoufangperson").val(val)
    $(".enquiries-ul").empty()//清空ul元素内容
    $(".ulList").css({"display":'none'})

}
function selectItem(ev){
    if(carId.length == 7 || carId.length == 8){

    }else{
        carId+=$(ev).text();
        $('.showCarText').text(carId)
    }
}
function submit(){
    userinfo.company = $("#company").val();
    userinfo.department = $("#department").val();
    userinfo.respondent = $("#shoufangperson").val();
    userinfo.applicantCompaney = $("#applicantCompaney").val();
    userinfo.applicant = $("#applicant").val();
    userinfo.idCard = $("#idCard").val();
    userinfo.reason = $("#reason").val();
    userinfo.startTime = $("#start_date").val();
    userinfo.endTime = $("#end_date").val();
    var obj = {};
    var Patterns = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    userinfo.entourageList = [];
    for(var i = 0;i<$("#personBox").find('tr').length;i++){
        console.log($($("#personBox").find('tr')[i]).find('td')[0])
        obj.name = $($("#personBox").find('tr')[i]).find('td')[0].innerHTML;
        obj.cardNum = $($("#personBox").find('tr')[i]).find('td')[1].innerHTML
        userinfo.entourageList.push(obj)
    }
    if(!userinfo.company){
        tanwin("请选择受访单位");
        return
    }
    if(userinfo.department == ''){
        tanwin("请选择受访部门");
        return
    }
    if(userinfo.respondent == ''){
        tanwin("请输入受访人");
        return
    }
    if(userinfo.applicantCompaney == ''){
        tanwin("请输入申请单位");
        return
    }
    if(userinfo.applicant == ''){
        tanwin("请输入申请人姓名");
        return
    }
    if(userinfo.idCard == ''){
        tanwin("请输入身份证号");
        return
    }
    if(!(Patterns.test(userinfo.idCard))){
        tanwin('请输入正确身份证号')
        return
    }
    if(userinfo.reason == ''){
        tanwin("请输入到访事由");
        return
    }
    if(userinfo.startTime == ''){
        tanwin("请输入到访时间");
        return
    }
    if(userinfo.endTime == ''){
        tanwin("请输入结束时间");
        return
    }
    if(isSelect){
        userinfo.isCar = '1';
    }
    if(!isSelect){
        userinfo.isCar = '2';
    }
    console.log(isSelect,userinfo.isCar)
    carData = [];
    for(var i = 0;i<$("#carBox").find('tr').length;i++){
        carData.push($($("#carBox").find('tr')[i]).find('td')[0].innerHTML)
    }
    if(userinfo.isCar == '1'){
        if(carData.length == 0){
            tanwin("请输入车牌号");
            return
        }
    }
    userinfo.licenseNum = carData.join(",");
    var data = {
        companyCode: userinfo.company,
        deptCode: userinfo.department,
        acceptName:  userinfo.respondent
    }
    data = JSON.stringify(data);
    $.ajax({
        url: ajaxUrl + 'checkInfo',
        timeout: 3000,
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        data:data,
        success: function(response) {

            if(response.rescode === '200'){
                window.postMessage('success');
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
function sureJump(){
    var data = {
        phoneNum: phone,
        companyCode: userinfo.company,
        deptCode: userinfo.department,
        acceptName:userinfo.respondent,
        name: userinfo.applicant,
        cardNum: userinfo.idCard,
        companyName: userinfo.applicantCompaney,
        reason: userinfo.reason,
        startTime: userinfo.startTime,
        endTime: userinfo.endTime,
        carFlag: userinfo.isCar,
        licenseNum: userinfo.licenseNum,
        photoData: userinfo.chapterUrl,//待确认
        entourageList: userinfo.entourageList
    }

    data = JSON.stringify(data);
    $.ajax({
        url: ajaxUrl + 'submitInfo',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        data:data,
        success: function(response) {
            $(".zhegaiceng").css({'display': 'none'})
            if(response.rescode === '200'){
                window.location.href = './sucess.html'
            }else{
                tanwin(response.resdes)
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $(".zhegaiceng").css({'display': 'none'})
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            $(".zhegaiceng").css({'display': 'none'})
        }
    });
}
