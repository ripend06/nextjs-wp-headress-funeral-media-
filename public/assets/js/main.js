/* 自動スクロール */
$(document).ready(function() {
	var setElm = $('.loopSlider'),
	slideSpeed = 15000; //速度

	if ($(window).width() <= 768) {
		slideSpeed = 20000; // 画面幅768px以下の場合の速度
	}

	setElm.each(function(){
		var self = $(this),
		selfWidth = self.innerWidth(),
		findUl = self.find('ul'),
		findLi = findUl.find('li'),
		listWidth = findLi.outerWidth(),
		listCount = findLi.length,
		loopWidth = listWidth * listCount;

		findUl.wrapAll('<div class="loopSliderWrap" />');
		var selfWrap = self.find('.loopSliderWrap');

		if(loopWidth > selfWidth){
			findUl.css({width:loopWidth}).clone().appendTo(selfWrap);

			selfWrap.css({width:loopWidth*2});

			function loopMove(){
				selfWrap.animate({left:'-' + (loopWidth) + 'px'},slideSpeed*listCount,'linear',function(){
					selfWrap.css({left:'0'});
					loopMove();
				});
			};
			loopMove();

			//ホバーでストップさせる
			setElm.hover(function() {
				selfWrap.pause();
			}, function() {
				selfWrap.resume();
			});
		}
	});
});

/* modal機能 */
//window.onload = function() {
	// const buttonOpen = document.getElementById('modalOpen');
	// const modal = document.getElementById('easyModal');
	// //const buttonClose = document.getElementsByClassName('modalClose')[0];

	// // ボタンがクリックされた時
	// buttonOpen.addEventListener('click', modalOpen);
    //     function modalOpen() {
    //     modal.style.display = 'block';
	// }

	// // バツ印がクリックされた時
	// // buttonClose.addEventListener('click', modalClose);
    //     // function modalClose() {
    //     // modal.style.display = 'none';
	// // }

	// // モーダルコンテンツ以外がクリックされた時
	// addEventListener('click', outsideClose);
    //     function outsideClose(e) {
    //         //console.log(e.target);
    //     if (e.target == modal) {
    //         modal.style.display = 'none';
    //     }
	// }
//}