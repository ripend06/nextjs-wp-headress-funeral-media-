// service/optionモーダル
for (var i = 1; i <= 21; i++) {
    (function (index) {
        $(document).on("click", ".service" + index, function () {
            $("#service" + index).addClass("active");
        });
        $(document).on("click", ".modalClose", function () {
            $("#service" + index).removeClass("active");
        });
    })(i);
}
for (var i = 1; i <= 21; i++) {
    (function (index) {
        $(document).on("click", ".option" + index, function () {
            $("#option" + index).addClass("active");
        });
        $(document).on("click", ".modalClose", function () {
            $("#option" + index).removeClass("active");
        });
    })(i);
}