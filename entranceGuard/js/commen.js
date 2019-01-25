function tanwin(text) {
    $("#tanwin").text(text).attr('style','');
    var clea=setInterval(function(){
        $('.tan').fadeOut("slow",function(){
            $("#tanwin").attr('style','display:none');
            clearInterval(clea);
        });

    },2000);
};