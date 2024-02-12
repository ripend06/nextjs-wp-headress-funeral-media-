// モーダル 火葬・お布施
$(document).ready(function(){
    $(".cremation").click(function(){
        $("#cremation").addClass("active");
    });
    $(".modalClose").click(function(){
        $("#cremation").removeClass("active");
    });
});
$(document).ready(function(){
    $(".ofuse").click(function(){
        $("#ofuse").addClass("active");
    });
    $(".modalClose").click(function(){
        $("#ofuse").removeClass("active");
    });
});