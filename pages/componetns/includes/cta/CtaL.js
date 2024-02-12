function CtaL() {
    return (
        <>
            <section className="ctaWrap--l">
                <div className="container">
                    <div className="cta--l">
                        {/* <!-- title pc--> */}
                        <div className="spNone">
                            <div className="cta--l__titleWrap">
                                <h2 className="cta--l__title">どんなことでもお気軽にご相談ください。</h2>
                            </div>
                        </div>
                        {/* <!-- title sp--> */}
                        <div className="pcNone">
                            <div className="cta--l__titleWrap">
                                <h2 className="cta--l__title">どんなことでも<br/>お気軽に<br/>ご相談ください。</h2>
                            </div>
                        </div>
                        <ul className="cta--l__listWrap">
                            <li className="cta--l__list iconText">
                                <i className="fa fa-remove fontColor--red60 iconText__icon"></i>
                                <p className="iconText__text p--sm">まだ何も準備をしていない方</p>
                            </li>
                            <li className="cta--l__list iconText">
                                <i className="fa fa-remove fontColor--red60 iconText__icon"></i>
                                <p className="iconText__text p--sm">病院から移動をお願いされている方</p>
                            </li>
                            <li className="cta--l__list iconText">
                                <i className="fa fa-remove fontColor--red60 iconText__icon"></i>
                                <p className="iconText__text p--sm">弊社プランの話をとりあえず聞きたい方</p>
                            </li>
                            <li className="cta--l__list iconText">
                                <i className="fa fa-remove fontColor--red60 iconText__icon"></i>
                                <p className="iconText__text p--sm">どこの葬儀会社に頼んだらいいかわからない方</p>
                            </li>
                            <li className="cta--l__list iconText">
                                <i className="fa fa-remove fontColor--red60 iconText__icon"></i>
                                <p className="iconText__text p--sm">葬儀をするには何をしたらいいかわからない方</p>
                            </li>
                        </ul>
                        <div className="cta--l__main">
                            <div className="cta--l__mainTextWrap">
                                <div className="cta--l__buttonWrap">
                                    <a href="<?php echo get_home_url() ?>/contact/" className="ctaButton ctaButton--whiteOrange" target="_blank" rel="noopener noreferrer">
                                        <div className="icon">
                                            <i className="fa fa-send iconSize--sm"></i>
                                        </div>    
                                        <div className="text">
                                            <p className="mainText">ご相談フォーム</p>
                                            <p className="subText">まずはお気軽に</p>
                                        </div>
                                    </a>
                                    <a href="tel:0120-949-823" className="ctaButton ctaButton--red">
                                        <div className="icon">
                                            <i className="fa fa-volume-control-phone iconSize--sm"></i>
                                        </div>    
                                        <div className="text">
                                            <p className="mainText">無料電話からご相談</p>
                                            <p className="subText">24時間365日対応</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="speechBallon">
                                    <div className="speechBallonImg">
                                        <img src="/img/staff-img.png" alt="" className="wi100 lazyload"/>
                                    </div>
                                    <div className="speechBallonText">
                                        <div className="p--sm">どういったご状況でも気にせずご連絡いただけると幸いです。お問い合わせいただくほとんどの方が、まだ何も準備していない状況ですが、そういった方々のために私達がお力になれればと思います。</div>
                                        <div className="smText--default fontColor--black80">弊社スタッフ：佐藤 幸一郎</div>
                                    </div>
                                </div>
                            </div>
                            <img className="cta--l__img lazyload tabNone" src="/img/cta-l-img.png"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CtaL;