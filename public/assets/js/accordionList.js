// アコーディオン
$(document).ready(function(){
    $(".accordionList__Q").click(function(){
        $(this).next(".accordionList__A").slideToggle();
        
        // アイコンのクラスを変更する
        var icon = $(this).find("i");
        if (icon.hasClass("ph-plus-circle")) {
            icon.removeClass("ph-plus-circle").addClass("ph-minus-circle");
        } else {
            icon.removeClass("ph-minus-circle").addClass("ph-plus-circle");
        }
    });
});