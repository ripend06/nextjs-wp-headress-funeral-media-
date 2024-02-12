function CtaS() {
    return (
        <>
            <section className="ctaWrap--s">
                <div className="container">
                    <div className="cta--s">
                        <div className="speechBallon">
                            <div className="speechBallonImg">
                                <img src="/img/staff-img.png" alt="" className="lazyload"/>
                            </div>
                            <div className="speechBallonText">
                                <p className="p--xs lineHeight--tight">プランや金額の詳細をご説明させていただきます。お急ぎの方もOK！お気軽にお問い合わせください。</p>
                                <p className="smText--default fontColor--black80">弊社スタッフ：佐藤 幸一郎</p>
                            </div>
                        </div>
                        <div className="cta--s__ctabuttonWrap">
                            <a href="<?php echo get_home_url() ?>/contact/" className="ctaButton--s ctaButton--whiteOrange" target="_blank" rel="noopener noreferrer">
                                    <div className="icon">
                                        <i className="fa fa-send iconSize--sm"></i>
                                    </div>    
                                    <div className="text">
                                        <p className="mainText">ご相談フォーム</p>
                                        <p className="subText">まずはお気軽に</p>
                                    </div>
                                </a>
                                <a href="tel:0120-949-823" className="ctaButton--s ctaButton--red">
                                    <div className="icon">
                                        <i className="fa fa-volume-control-phone iconSize--sm"></i>
                                    </div>    
                                    <div className="text">
                                        <p className="mainText">無料電話からご相談</p>
                                        <p className="subText">24時間365日対応</p>
                                    </div>
                                </a>
                        </div>
                    
                    </div>
                </div>
            </section>
        </>
    );
}

export default CtaS;