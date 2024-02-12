// ページが読み込まれた時に実行される関数
window.addEventListener('load', function() {
    const sectionElement = document.getElementById('floating');

    // 画面をスクロールした時の処理
    function handleScroll() {
        const scrollTop = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const sectionHeight = sectionElement.clientHeight;

        // <section>要素が画面の下部に固定されるように設定
        if (scrollTop > 1) { // 1pxでもスクロールされたら
            sectionElement.classList.add('fixed');
            sectionElement.classList.add('fadeIn'); // 追加: 下からふわっと表示させるクラスを追加
        } else {
            sectionElement.classList.remove('fixed');
            sectionElement.classList.remove('fadeIn'); // 追加: クラスを削除して非表示にする
        }
    }

    // スクロールイベントのリスナーを追加
    window.addEventListener('scroll', handleScroll);

    // 初回に一度実行して初期状態を設定
    handleScroll();
});