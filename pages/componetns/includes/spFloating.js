function spFloating() {
    return (
        <>
            <section id="floating" className="floating pcNone">
                <div className="discount">
                    <p className="text1">本ページからの電話問い合わせ限定</p>
                    <p className="text2">最大5万円割引</p>
                </div>
                <div className="floatingMenu">
                    <ul className="floatingMenu__ul">
                        <li className="floatingMenu__li floatingMenu__li1">
                            <a className="floatingMenu__link" href="<?php echo get_home_url() ?>/place">
                                <div className="floatingMenu__menu iconText">
                                    <i className="ph-fill ph-map-pin floatingMenu__icon iconText__icon"></i>
                                    <p className="floatingMenu__text iconText__text">葬儀場一覧</p>
                                </div>
                            </a>
                        </li>
                        {/* <!-- <li className="floatingMenu__li floatingMenu__li2">
                            <a href="">
                                <div className="floatingMenu__menu iconText">
                                    <img className="floatingMenu__icon iconText__icon lazyload" src="<?php $upload_dir = wp_upload_dir(); echo $upload_dir['baseurl']; ?>/2023/08/yen-icon.svg" alt="プラン"/>
                                    <p className="floatingMenu__text iconText__text">プラン</p>
                                </div>
                            </a>
                        </li> --> */}
                        <li className="floatingMenu__li floatingMenu__li3">
                            <a className="floatingMenu__link" href="tel:0120-949-823">
                                <div className="floatingMenu__menu iconText">
                                    <img className="floatingMenu__icon iconText__icon lazyload" src="/img/tel-icon.png" alt="プラン"/>
                                    <p className="floatingMenu__text iconText__text">電話で相談</p>
                                </div>
                            </a>
                        </li>
                        <li className="floatingMenu__li floatingMenu__li4">
                            <a className="floatingMenu__link" href="<?php echo get_home_url() ?>/urgent">
                                <div className="floatingMenu__menu iconText">
                                    <i className="ph-fill ph-warning floatingMenu__icon iconText__icon"></i>
                                    <p className="floatingMenu__text iconText__text">緊急の方へ</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default spFloating;