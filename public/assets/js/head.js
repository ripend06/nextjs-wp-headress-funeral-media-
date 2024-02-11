/* スムーズスクロール */
$(function() {
$('a[href^="#').click(function() {
    var speed = 700;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({
        scrollTop: position
    }, speed, "swing");
    return false;
});
});

/* ハンバーガーメニュー */
$(function(){
$('.btn-trigger').on('click', function() {
    $(this).toggleClass('active');
    $('.sp-nav-wrapper').toggleClass('active');
    $('html').toggleClass('of-hidden');
    return false;
});
});

$(function(){
$('.sp-nav-t').on('click', function() {
    $('.sp-nav-wrapper').removeClass('active');
    $('html').removeClass('of-hidden');
    $('.btn-trigger').removeClass('active');
    return 0;
});
});

/* headerアニメーション */
var beforePos = 0;//スクロールの値の比較用の設定
//スクロール途中でヘッダーが消え、上にスクロールすると復活する設定を関数にまとめる
function ScrollAnime() {
	var scroll = $(window).scrollTop();
    var windowWidth = $(window).width(); // 現在の画面幅を取得
    var scrollThreshold = 460; // 340pxスクロールの閾値

    if (windowWidth >= 1101) { // 画面幅が1101px以上の場合のみ実行
		if(scroll == beforePos) {
            //IE11対策で処理を入れない
        }else if(scroll < scrollThreshold || scroll - beforePos < 0){
            //ヘッダーが上から出現する
            $('#header').removeClass('UpMove'); //#headerにUpMoveというクラス名を除き
            $('#header').addClass('DownMove');//#headerにDownMoveのクラス名を追加
        }else {
            //ヘッダーが上に消える
            $('#header').removeClass('DownMove');//#headerにDownMoveというクラス名を除き
            $('#header').addClass('UpMove');//#headerにUpMoveのクラス名を追加
        }	
        beforePos = scroll;//現在のスクロール値を比較用のbeforePosに格納
    }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  ScrollAnime();//スクロール途中でヘッダーが消え、上にスクロールすると復活する関数を呼ぶ
});