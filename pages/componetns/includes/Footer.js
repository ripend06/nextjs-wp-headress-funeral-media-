function Footer() {
    return (
        <>
            <section className="ly_footer">
                <div className="ly_footer__wrap container">
                    <div className="bl_footer_in">
                        <div className="bl_footer_left">
                            <div className="bl_footer_le_text-1">運営会社</div>
                            <div className="bl_footer_le_wapper_text-2">
                                <div className="bl_footer_le_text-2">会社名</div>
                                <div className="bl_footer_le_text-3">AsuCreation株式会社</div>
                            </div>
                            <div className="bl_footer_le_wapper_text-2">
                                <div className="bl_footer_le_text-2">住所</div>
                                <div className="bl_footer_le_text-3">東京都渋谷区千駄ケ谷３丁目３−３ エグゼクティブ原宿 701</div>
                            </div>
                            <div className="bl_footer_le_wapper_text-2">
                                <div className="bl_footer_le_text-2">電話番号</div>
                                <div className="bl_footer_le_text-3">03-6822-5072</div>
                            </div>
                        </div>
                        <div className="bl_footer_right">
                            <div className="bl_footer_ri_text-1"><a href="<?php echo home_url(); ?>">感謝のお葬式</a></div>
                            <div className="bl_footer_ri_text-2 marginBottom--16">故人のための葬儀なら「感謝のお葬式」</div>
                            <a href="<?php echo get_site_url();  ?>/privacy-policy" className="bl_header-t_wapper_text-2">
                                <div className="bl_footer_t_h-yaji-img"><img src="/img/h-t-yaji.svg" alt="" className="wi100 lazyload"/></div>
                                <div className="bl_footer_ri_text-2">プライバシーポリシー</div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Footer;