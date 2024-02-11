import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
// import Top from './componetns/Top';
import { getAllPostsData } from '@/libs/place/getAllPostsPlaceData';
import { getPrefecturePost } from '@/libs/place/getPrefecturePost';
import { getAllPostsSlugData } from '@/libs/place/getAllPostsSlugData';
import { updatedPostsData } from '@/libs/place/updatedPostsData';
import FuneralMap from './componetns/googleMap/GoogleMap';
import CtaS from './componetns/cta/CtaS';
import CtaL from './componetns/cta/CtaL';
import Footer from './componetns/includes/Footer';
import Header from './componetns/includes/Header';
import SpFloating from './componetns/includes/spFloating';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getPostsNewsData } from '@/libs/posts/getPostsNewsData';
import { getPostsData } from '@/libs/posts/getPostsData';


export default function Place( {updatedPrefecturePostsData, updatedPrefectureLimitPostsData, updatedAllPostsDataB, Limit4PostsNewsData, Limit4PostsData} ) {

  //console.log('updatedPrefectureLimitPostsData', updatedPrefectureLimitPostsData);
  const [isHovered, setIsHovered] = useState(false);
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 15000, // スライド速度
      slidesToShow: 3, // 表示するスライドの数
      slidesToScroll: 1,
      autoplay: true, // hoveredがfalseの場合に自動再生を有効にする
      autoplaySpeed: 0,
      cssEase: 'linear',
      variableWidth: true, // スライドの幅を可変にする
      swipeToSlide: true, // スライドのドラッグ操作を有効にする
      //pauseOnHover: true, // ホバー時に自動再生を一時停止する
    };

    const handleSliderHover = () => {
      setIsHovered(true);
      console.log("true");
    };
  
    const handleSliderLeave = () => {
      setIsHovered(false);
      console.log("false");
    };




  return (
    <>
          <div className="topIndex">
            <Head>
                <title>TOP</title>
                {/* <!-- jQuery読み込み --> */}
                {/* <!-- <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script> --> */}
                {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script> */}
            </Head>

            <h3>葬儀場一覧</h3>
            <h3>東京都の市区町村から探す</h3>
            <div className="homeCity">
            {updatedPrefecturePostsData
            .filter((post, index, self) => self.findIndex(p => p.area[0].slug === post.area[0].slug) === index)
            .map(post => (
              <div key={post.id}>
                <Link href={`/place/${post.area[0].parentSlug}/${post.area[0].slug}`}>
                  {post.area[0].name}
                </Link>
              </div>
            ))}
            </div>

            <h3>地図</h3>
            <FuneralMap updatedMapPostsData={updatedAllPostsDataB}/>

            <h3>東京都の葬儀場情報</h3>
            {updatedPrefectureLimitPostsData.map((post) => (
            <Link href={`/place/${post.area[0].parentSlug}/${post.area[0].slug}/${post.id}`} className={styles.homePlace} key={post.id}>
                {post._embedded['wp:featuredmedia'] && (
                <div>
                    {post._embedded['wp:featuredmedia'].map((featuredmedia) => (
                    <img src={featuredmedia.source_url} key={featuredmedia.id} alt={`${post.title.rendered}`} />
                    ))}
                </div>
                )}
                {/* タイトル表示 */}
                <div>{post.title.rendered}</div>
                {/* アクセス表示 */}
                <div>
                {post.acf.access1.access_2}
                {post.acf.access1.access_3}
                {post.acf.access1.access_4}
                {post.acf.access1.access_5}
                </div>
                {/* 住所表示 */}
                <div>
                {post.acf.address.address_prefecture}
                {post.acf.address.address_city}
                {post.acf.address.address_1}
                {post.acf.address.address_2}
                </div>

            </Link>
            ))}
          </div>


          <Header />
          {/* <!-- modal --> */}
          <div className="bl_modal" id="easyModal">
              <div className="bl_modal_content">
                  <div className="bl_modal_w_text-1">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        {/* <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                        {/* <style>svg{fill:#c2493f}</style> */}
                        <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
                      </svg>
                      <div className="bl_modal_text-1">緊急・お急ぎの方へのご案内</div>
                      <div className="bl_modal_h-people-img"><img src="/img/h-people.png" alt="" className="wi100 lazyload" /></div>
                  </div>
                  <div className="bl_modal_text-2">1. 弊社への事前相談がなくてもご対応可能ですので、ご安心ください。</div>
                  <div className="bl_modal_text-3">2. オペレーターにお急ぎの旨をお伝えください。</div>
                  <a href="tel:0120-949-823" className="bl_btn">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        {/* <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <style>svg{fill:#ffffff}</style> */}
                        <path d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z"/>
                      </svg>
                      <div className="bl_btn_text-1">0120-949-823</div>
                  </a>
                  <div className="el_element_w_text-1">
                      <div className="el_element_text-1">24時間365日対応</div>
                      <div className="el_element_text-1">相談は全て無料です</div>
                  </div>
              </div>
          </div>

          <div>
            <div className="overfow-hidden">
                <section className="ly_fv">
                    <div className="bl_fv">
                        <div className="sp80">
                            <div className="wi1200">
                                <div className="bl_fv_in">
                                    <div className="bl_fv_left">
                                        <div className="bl_fv_wapper_text-1">
                                            <div className="bl_fv_text-1-1">誕生花で</div>
                                            <div className="bl_fv_h-1-img"><img src="/img/h-1.png" alt="" className="wi100 lazyload"/></div>
                                        </div>
                                        <div className="bl_fv_text-1 pc">故人を見送るお葬式</div>
                                        <div className="bl_fv_text-1 sp">故人を見送る<br/>お葬式</div>
                                        <div className="pc">
                                            <div className="el_fv_wapper_el">
                                                <div className="el_fv_el-1"><span>安心の明朗会計</span></div>
                                                <div className="el_fv_el-1"><span>エンディングプランナー監修</span></div>
                                                <div className="el_fv_el-1"><span>熟練スタッフ</span></div>
                                            </div>
                                        </div>
                                        <div className="bl_fv_price_wapper">
                                            <div className="bl_fv_price">
                                                <div className="bl_fv_price_text-1">最<br/>安</div>
                                                <div className="bl_fv_price_text-2">78<span>,</span>000</div>
                                                <div className="bl_fv_price_wapper_text-3">
                                                    <div className="bl_fv_price_text-3">税抜</div>
                                                    <div className="bl_fv_price_text-4">円〜</div>
                                                </div>
                                                <div className="bl_fv_price_text-5 pc">(税込<span>85,800</span>円~)</div>
                                            </div>
                                            <div className="bl_fv_price_text-5 sp">(税込<span>85,800</span>円~)</div>
                                        </div>
                                        <div className="sp">
                                            <div className="el_fv_wapper_el">
                                                <div className="el_fv_el-1"><span>安心の明朗会計</span></div>
                                                <div className="el_fv_el-1"><span>エンディングプランナー監修</span></div>
                                                <div className="el_fv_el-1"><span>熟練スタッフ</span></div>
                                            </div>
                                        </div>
                                        <div className="bl_fv_price_text-6 pc">感謝のお葬式以外にも、一般的なお葬式プランもご用意しております。緊急の場合もできるかぎりご要望にお応えしますので、気軽にご相談ください。</div>
                                    </div>
                                    <div className="bl_fv_right pc">
                                        <div className="bl_fv_fv-p1-img"><img src="/img/fv-p1.png" alt="女性スタッフ" className="wi100 lazyload"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="bl_fv_price_text-6 sp">感謝のお葬式以外にも、一般的なお葬式プランもご用意しております。緊急の場合もできるかぎりご要望にお応えしますので、気軽にご相談ください。</div>
                <CtaS />
                <section className="ly_birthFlower">
                    <div className="bl_birthFlower">
                        <div className="sp80">
                            <div className="wi1200">
                                <div className="bl_birthFlower_in">
                                    <div className="bl_birthFlower_left">
                                        <div className="bl_birthFlower_text-1">感謝のお葬式では、<br/>誕生花などの<br/>故人にゆかりのある花で、<br/>葬儀を飾ります</div>
                                        <div className="bl_birthFlower_text-2">故人にゆかりのお花祭壇で葬儀を演出</div>
                                        <div className="bl_birthFlower_text-3">故人を想う最適なお葬式として、『感謝のお葬式』は生まれました。このお葬式をきっかけに、送ったあとも温かい想いに包まれるような葬儀が増えることを祈っております。</div>
                                    </div>
                                    <div className="bl_birthFlower_b-1-img"><img src="/img/b-1.png" alt="誕生花" className="wi100 lazyload"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ly_plan" id="plan">
                    <div className="bl_plan">
                        <div className="sp80">
                            <div className="wi1200">
                                <div className="bl_plan_in">
                                    <div className="bl_plan_text-1"><span className="bl_plan_text-1__1">感謝のお葬式</span>では<br/><span className="bl_plan_text-1__2">７つの料金プラン</span><br className="pcNone"/>をご用意しました</div>
                                    <div className="day2Course">
                                        <div className="plan__courseTitleWrap day2Course__titleWrap">
                                            <h3 className="plan__courseTitle h3--default fontColor--white100">２日コース</h3>
                                            <div className="plan__tag p--l fontColor--white100">お通夜 → 告別式 → ご火葬</div>
                                        </div>
                                        <div className="bl_plan_wapper_card">
                                            <div className="bl_plan_card">
                                                <div className="bl_plan_pl-1-img">
                                                    <img src="/img/pl-1.png" alt="家族葬プラン" className="wi100 lazyload"/>
                                                </div>
                                                <div className="bl_plan_c_bt">
                                                    <div className="bl_plan_c_text-1 fontColor--purple100">家族葬プラン</div>
                                                    <div className="bl_plan_c_text-2">小規模で開催したい方向け</div>
                                                    <div className="bl_plan_wapper_check">
                                                        <div className="tag tag--s tag--brown">通夜式</div>
                                                        <div className="tag tag--s tag--brown">告別式</div>
                                                        <div className="tag tag--s tag--brown">火葬</div>
                                                        <div className="tag tag--s tag--brown">誕生花</div>
                                                        <div className="tag tag--s tag--brown">曲選定</div>
                                                    </div>
                                                    <div className="bl_plan_price">
                                                        <div className="bl_plan_price_text-1">550<span>,</span>000</div>
                                                        <div className="bl_plan_price_wapper_text-2">
                                                            <div className="bl_plan_price_text-2">税抜</div>
                                                            <div className="bl_plan_price_text-3">円〜</div>
                                                        </div>
                                                    </div>
                                                    <div className="bl_plan_c_text-2">548,900円 (税込)</div>
                                                    <div className="bl_plan_c_bt_wapper">
                                                        <div className="bl_plan_c_bt_text-1">参列者の目安 ~<span>20</span>人</div>
                                                    </div>
                                                    <div className="plan__buttonWrap">
                                                        <a href="<?php echo get_home_url() ?>/kazokuso" className="button--s button--white p--default font-bold">プランの詳細</a>
                                                    </div>
                                                </div>
                                                <img className="bl_plan_card_emblem lazyload" src="/img/emblem1.png" alt="推奨プラン"/>
                                            </div>
                                            <div className="bl_plan_card">
                                                <div className="bl_plan_pl-1-img"><img src="/img/pl-2.png" alt="一般プラン" className="wi100 lazyload"/></div>
                                                <div className="bl_plan_c_bt">
                                                    <div className="bl_plan_c_text-1 fontColor--orange80">一般プラン</div>
                                                    <div className="bl_plan_c_text-2">お別れに添える誕生花、お好きな曲を選定可能</div>
                                                    <div className="bl_plan_wapper_check">
                                                        <div className="tag tag--s tag--brown">通夜式</div>
                                                        <div className="tag tag--s tag--brown">告別式</div>
                                                        <div className="tag tag--s tag--brown">火葬</div>
                                                        <div className="tag tag--s tag--brown">誕生花</div>
                                                        <div className="tag tag--s tag--brown">曲選定</div>
                                                    </div>
                                                    <div className="bl_plan_price">
                                                        <div className="bl_plan_price_text-1">770<span>,</span>000</div>
                                                        <div className="bl_plan_price_wapper_text-2">
                                                            <div className="bl_plan_price_text-2">税抜</div>
                                                            <div className="bl_plan_price_text-3">円〜</div>
                                                        </div>
                                                    </div>
                                                    <div className="bl_plan_c_text-2">768,900円 (税込)</div>
                                                    <div className="bl_plan_c_bt_wapper">
                                                        <div className="bl_plan_c_bt_text-1">参列者の目安 <span>20</span>人〜</div>
                                                    </div>
                                                    <div className="plan__buttonWrap">
                                                        <a href="<?php echo get_home_url() ?>/ippanso" className="button--s button--white p--default font-bold">プランの詳細</a>
                                                    </div>
                                                    <img className="bl_plan_card_emblem lazyload" src="/img/emblem2.png" alt="人気プラン"/>
                                                </div>
                                            </div>
                                            <div className="bl_plan_card">
                                                <div className="bl_plan_pl-1-img"><img src="/img/pl-3.png" alt="ばら色プラン" className="wi100 lazyload"/></div>
                                                <div className="bl_plan_c_bt">
                                                    <div className="bl_plan_c_text-1 fontColor--red80">ばら色葬プラン</div>
                                                    <div className="bl_plan_c_text-2">好きな花を選べて、花も増量の華やかなプラン</div>
                                                    <div className="bl_plan_wapper_check">
                                                        <div className="tag tag--s tag--brown">通夜式</div>
                                                        <div className="tag tag--s tag--brown">告別式</div>
                                                        <div className="tag tag--s tag--brown">火葬</div>
                                                        <div className="tag tag--s tag--brown">誕生花</div>
                                                        <div className="tag tag--s tag--brown">曲選定</div>
                                                    </div>
                                                    <div className="bl_plan_price">
                                                        <div className="bl_plan_price_text-1">1<span>,</span>100<span>,</span>000</div>
                                                        <div className="bl_plan_price_wapper_text-2">
                                                            <div className="bl_plan_price_text-2">税抜</div>
                                                            <div className="bl_plan_price_text-3">円〜</div>
                                                        </div>
                                                    </div>
                                                    <div className="bl_plan_c_text-2">1,208,900円 (税込)</div>
                                                    <div className="bl_plan_c_bt_wapper">
                                                        <div className="bl_plan_c_bt_text-1">参列者の目安 <span>20</span>人〜</div>
                                                    </div>
                                                    <div className="plan__buttonWrap">
                                                        <a href="<?php echo get_home_url() ?>/barairoso" className="button--s button--white p--default font-bold">プランの詳細</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="day1Course">
                                        <div className="plan__courseTitleWrap day1Course__titleWrap">
                                            <h3 className="plan__courseTitle h3--default fontColor--white100">1日コース</h3>
                                            <div className="plan__tag p--l fontColor--white100"><span className="fontColor--white10">お通夜 → </span>告別式 → ご火葬</div>
                                        </div>
                                        <div className="bl_plan_wapper_card">
                                            <div className="bl_plan_card">
                                                <div className="bl_plan_pl-1-img"><img src="/img/pl-6.png" alt="一日葬プラン" className="wi100 lazyload"/></div>
                                                <div className="bl_plan_c_bt">
                                                    <div className="bl_plan_c_text-1 fontColor--green90">一日葬プラン</div>
                                                    <div className="bl_plan_c_text-2">こだわりつつ１日で式を挙げたい方向け</div>
                                                    <div className="bl_plan_wapper_check">
                                                        <div className="tag tag--s tag--gray">通夜式</div>
                                                        <div className="tag tag--s tag--brown">告別式</div>
                                                        <div className="tag tag--s tag--brown">火葬</div>
                                                        <div className="tag tag--s tag--brown">誕生花</div>
                                                        <div className="tag tag--s tag--brown">曲選定</div>
                                                    </div>
                                                    <div className="bl_plan_price">
                                                        <div className="bl_plan_price_text-1">430<span>,</span>000</div>
                                                        <div className="bl_plan_price_wapper_text-2">
                                                            <div className="bl_plan_price_text-2">税抜</div>
                                                            <div className="bl_plan_price_text-3">円〜</div>
                                                        </div>
                                                    </div>
                                                    <div className="bl_plan_c_text-2">473,000円 (税込)</div>
                                                    <div className="bl_plan_c_bt_wapper">
                                                        <div className="bl_plan_c_bt_text-1">参列者の目安 ~<span>20</span>人</div>
                                                    </div>
                                                    <div className="plan__buttonWrap">
                                                        <a href="<?php echo get_home_url() ?>/ichinichiso" className="button--s button--white p--default font-bold">プランの詳細</a>
                                                    </div>
                                                </div>
                                                <img className="bl_plan_card_emblem lazyload" src="/img/emblem1.png" alt="推奨プラン"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="simpleCourse">
                                        <div className="plan__courseTitleWrap simpleCourse__titleWrap">
                                            <h3 className="plan__courseTitle h3--default fontColor--white100">シンプルコース</h3>
                                            <div className="plan__tag p--l fontColor--white100"><span className="fontColor--white10">お通夜 → 告別式 → </span>ご火葬</div>
                                        </div>
                                        <div className="bl_plan_wapper_card">
                                            <div className="bl_plan_card">
                                                <div className="bl_plan_pl-1-img"><img src="/img/pl-7.png" alt="シンプル葬プラン" className="wi100 lazyload"/></div>
                                                <div className="bl_plan_c_bt">
                                                    <div className="bl_plan_c_text-1 fontColor--blue90">シンプル葬プラン</div>
                                                    <div className="bl_plan_c_text-2">最小規模で行いたい方向け</div>
                                                    <div className="bl_plan_wapper_check">
                                                        <div className="tag tag--s tag--gray">通夜式</div>
                                                        <div className="tag tag--s tag--gray">告別式</div>
                                                        <div className="tag tag--s tag--brown">火葬</div>
                                                        <div className="tag tag--s tag--gray">誕生花</div>
                                                        <div className="tag tag--s tag--gray">曲選定</div>
                                                    </div>
                                                    <div className="bl_plan_price">
                                                        <div className="bl_plan_price_text-1">78<span>,</span>000</div>
                                                        <div className="bl_plan_price_wapper_text-2">
                                                            <div className="bl_plan_price_text-2">税抜</div>
                                                            <div className="bl_plan_price_text-3">円〜</div>
                                                        </div>
                                                    </div>
                                                    <div className="bl_plan_c_text-2">85,800円 (税込)</div>
                                                    <div className="bl_plan_c_bt_wapper">
                                                        <div className="bl_plan_c_bt_text-1">参列者の目安<span>1</span>人〜</div>
                                                    </div>
                                                    <div className="plan__buttonWrap">
                                                        <a href="<?php echo get_home_url() ?>/simpleso" className="button--s button--white p--default font-bold">プランの詳細</a>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div className="bl_plan_card">
                                                <div className="bl_plan_pl-1-img"><img src="/img/pl-4.png" alt="火葬式プラン" className="wi100 lazyload"/></div>
                                                <div className="bl_plan_c_bt">
                                                    <div className="bl_plan_c_text-1 fontColor--yellow90">火葬式プラン</div>
                                                    <div className="bl_plan_c_text-2">火葬だけを行いたい方向け</div>
                                                    <div className="bl_plan_wapper_check">
                                                        <div className="tag tag--s tag--gray">通夜式</div>
                                                        <div className="tag tag--s tag--gray">告別式</div>
                                                        <div className="tag tag--s tag--brown">火葬</div>
                                                        <div className="tag tag--s tag--gray">誕生花</div>
                                                        <div className="tag tag--s tag--gray">曲選定</div>
                                                    </div>
                                                    <div className="bl_plan_price">
                                                        <div className="bl_plan_price_text-1">170<span>,</span>000</div>
                                                        <div className="bl_plan_price_wapper_text-2">
                                                            <div className="bl_plan_price_text-2">税抜</div>
                                                            <div className="bl_plan_price_text-3">円〜</div>
                                                        </div>
                                                    </div>
                                                    <div className="bl_plan_c_text-2">184,000円 (税込)</div>
                                                    <div className="bl_plan_c_bt_wapper">
                                                        <div className="bl_plan_c_bt_text-1">参列者の目安<span>1</span>人〜</div>
                                                    </div>
                                                    <div className="plan__buttonWrap">
                                                        <a href="<?php echo get_home_url() ?>/kasoshiki" className="button--s button--white p--default font-bold">プランの詳細</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bl_plan_card">
                                                <div className="bl_plan_pl-1-img"><img src="/img/pl-5.png" alt="お花式プラン" className="wi100 lazyload"/></div>
                                                <div className="bl_plan_c_bt">
                                                    <div className="bl_plan_c_text-1 fontColor--pink70">お花式プラン</div>
                                                    <div className="bl_plan_c_text-2">火葬式より華やか、一般葬よりお手軽</div>
                                                    <div className="bl_plan_wapper_check">
                                                        <div className="tag tag--s tag--gray">通夜式</div>
                                                        <div className="tag tag--s tag--gray">告別式</div>
                                                        <div className="tag tag--s tag--brown">火葬</div>
                                                        <div className="tag tag--s tag--brown">誕生花</div>
                                                        <div className="tag tag--s tag--gray">曲選定</div>
                                                    </div>
                                                    <div className="bl_plan_price">
                                                        <div className="bl_plan_price_text-1">290<span>,</span>000</div>
                                                        <div className="bl_plan_price_wapper_text-2">
                                                            <div className="bl_plan_price_text-2">税抜</div>
                                                            <div className="bl_plan_price_text-3">円〜</div>
                                                        </div>
                                                    </div>
                                                    <div className="bl_plan_c_text-2">319,000円 (税込)</div>
                                                    <div className="bl_plan_c_bt_wapper">
                                                        <div className="bl_plan_c_bt_text-1">参列者の目安<span>1</span>人〜</div>
                                                    </div>
                                                    <div className="plan__buttonWrap">
                                                        <a href="<?php echo get_home_url() ?>/ohanashiki" className="button--s button--white p--default font-bold">プランの詳細</a>
                                                    </div>
                                                </div>
                                                <img className="bl_plan_card_emblem lazyload" src="/img/emblem1.png" alt="推奨プラン"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ly_map">
                    <div className="bl_map">
                        <div className="sp80">
                            <div className="wi1200">
                                <div className="bl_mao_in">
                                    <div className="bl_map_wapper_text-1">
                                        <div className="bl_map_text-1">都内全域でお近くの葬儀場が見つかります</div>
                                        <div className="bl_map_text-2">提携している葬儀場もございます。こちらの葬儀場の場合、他社様と比べても自由度高くご利用いただけます。</div>
                                    </div>
                                    <div id="funeralMap">
                                      <FuneralMap updatedMapPostsData={updatedAllPostsDataB}/>
                                    </div>
                                    <div className="map__buttonWrap">
                                        <a href="<?php echo get_home_url() ?>/place" className="buttonIcon--s button--white--l">
                                            <div className="buttonIcon--s__wrap">
                                                <i className="fas fa-search icon"></i>
                                                <p className="p--default font-bold text">東京の葬儀場を探す</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="top-search" className="search">
                    <div className="search__wrap container">
                        <div className="searchBlock">
                            <div className="searchBlock__titleWrap">
                                <div className="headingWrap--h2Underline">
                                    <h2 className="searchBlock__title">東京都の市区町村から探す</h2>
                                </div>
                            </div>

                            <ul className="searchBlock__lists">
                            {updatedPrefecturePostsData
                            .filter((post, index, self) => self.findIndex(p => p.area[0].slug === post.area[0].slug) === index)
                            .map(post => (
                              <li className="searchBlockList iconText" key={post.id}>
                                <i className="ph-fill ph-caret-right iconText__icon searchBlockList__icon"></i>
                                <Link href={`/place/${post.area[0].parentSlug}/${post.area[0].slug}`} className="iconText__text link searchBlockList__text">
                                  {post.area[0].name}
                                </Link>
                              </li>
                            ))}
                            </ul>

                        </div>
                    </div>
                </section>
                <section id="topInformation" className="topInformation">
                    <div className="topInformation__wrap container">
                        <div className="topInformationBlock">
                            <div className="topInformationBlock__titleWrap">
                                <div className="headingWrap--h2Underline">
                                    <h2 className="topInformationBlock__title">東京都の葬儀場情報</h2>
                                </div>
                            </div>
                            <div className="imgText">
                              {updatedPrefectureLimitPostsData.map((post) => (
                              <Link href={`/place/${post.area[0].parentSlug}/${post.area[0].slug}/${post.id}`} className="imgText__item" key={post.id}>
                                  {post._embedded['wp:featuredmedia'] && (
                                  <div>
                                      {post._embedded['wp:featuredmedia'].map((featuredmedia) => (
                                      <img src={featuredmedia.source_url} key={featuredmedia.id} alt={`${post.title.rendered}`} className="imgText__img" />
                                      ))}
                                  </div>
                                  )}
                                  {/* タイトル表示 */}
                                  <h4 className="imgText__name">{post.title.rendered}</h4>
                                  {/* アクセス表示 */}
                                  <div className="imgText__access">
                                    <p className="iconText imgText__text">
                                      <i className="ph ph-signpost imgText__icon iconText__icon"></i>
                                      <span className="imgText__station iconText__text">{post.acf.access1.access_2}</span>
                                      <span>{post.acf.access1.access_3}</span>
                                      <span>{post.acf.access1.access_4}</span>
                                      <span>{post.acf.access1.access_5}</span>
                                    </p>
                                  </div>
                                  {/* 住所表示 */}
                                  <div className="imgText__address iconText">
                                    <i className="ph ph-map-pin imgText__icon iconText__icon"></i>
                                    <span className="iconText__text">{post.acf.address.address_prefecture}{post.acf.address.address_city} {post.acf.address.address_1}{post.acf.address.address_2}</span>
                                  </div>
                              </Link>
                              ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ly_sample">
                    <div className="bl_sample">
                        <div className="sp80">
                            <div className="wi1200">
                                <div className="bl_sample_in">
                                    <div className="bl_sample_wapper_text-1">
                                        <div className="bl_sample_text-1">提携施設例</div>
                                        <div className="bl_sample_text-2 p--default fontColor--black80">こちらは提携している葬儀場になります。様々な葬儀場がございますので、1人1人に最善の葬儀場をご案内させていただきます。</div>
                                    </div>
                                    <div className="bl_sample_wapper_card">
                                        <div className="parent">
                                            <div className="div1">
                                                <div className="bl_sample_s-1-img"><img src="/img/s-1.png" alt="提携葬儀場 受付" className="wi100 lazyload"/></div>
                                            </div>
                                            <div className="div2">
                                                <div className="bl_sample_s-1-img"><img src="/img/s-2.png" alt="提携葬儀場 入り口" className="wi100 lazyload"/></div>
                                            </div>
                                            <div className="div3">
                                                <div className="bl_sample_s-1-img"><img src="/img/s-3.png" alt="提携葬儀場 待合室" className="wi100 lazyload"/></div>
                                            </div>
                                            <div className="div4">
                                                <div className="bl_sample_s-1-img"><img src="/img/s-4.png" alt="提携葬儀場 廊下" className="wi100 lazyload"/></div>
                                            </div>
                                            <div className="div5">
                                                <div className="bl_sample_s-1-img"><img src="/img/s-5.png" alt="提携葬儀場 会場入口" className="wi100 lazyload"/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <CtaL />
                <section className="ly_point">
                    <div className="bl_point">
                        <div className="bl_point_in">
                            <div className="container">
                                <h2 className="bl_point_text-1">お葬式の会社とプラン選びのポイント</h2>
                                <section id="staffCommentWrap" className="staffCommentWrap">
                                    <div className="box--white">
                                        <div className="box--white__title headingWrap--h3Underline">
                                            <h3 className="h3--default">監修スタッフの紹介</h3>
                                        </div>
                                        <div className="box--white__content staffComment--2">
                                            <div className="imgWrap">
                                                <img src="/img/staff-img.png" alt="" className="speechBallonImg lazyload"/>
                                            </div>
                                            <div className="textWrap">
                                                <p className="smText--default fontColor--black80">暦30年の弊社葬儀スタッフ</p>
                                                <p className="underline p--default">佐藤 幸一郎</p>
                                                <p className="p--sm fontColor--black80">30年以上の経験を活かし、当日の対応も心から安心いただけるよう、サポートいたします。
                                                    <br/>どんなに良いプランがあっても、金額が他社よりお得でも、当日の対応で大きなミスが起きると、残念な記憶が残ってしまいます。私が最も重要視しているのは当日の対応品質です。
                                                    <br/>私たちはみなさまが安心かつ心に残るお葬式を行っていただけるよう、長年の経験や知見を活かし、しっかり当日もお手伝いさせていただきます。</p>
                                            </div>
                                        </div>
                                        <div className="box--white__content box--white">
                                            <div className="box--white__title">
                                                <h4 className="h4--sm">葬儀スタッフのオススメポイント</h4>
                                            </div>
                                            <p className="p--default">弊社が実施したインタビューでは『どんな基準で選べばいいかわからない』と言ったお悩みをお持ちの方は8割以上いらっしゃいました。お葬式の会社・プラン選びは以下のお葬式を3点でお選びください。</p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="container spWidth--100">
                                <div className="bl_point_cardWrap">
                                    <div className="bl_point_card">
                                        <div className="headingWrap--h3Underline headingWrap--Underline--dotted">
                                            <h3 className="bl_point_card__title h3--smBorderLeft headingBorderLeft--gradientRed">1. 葬儀のあらゆる費用が明確に示されていること</h3>
                                        </div>
                                        <div className="box--white">
                                            <div className="col--2">
                                                <div className="colItem--30">
                                                    <img className="lazyload" src="/img/p-1.png" alt="葬儀のあらゆる費用が明確に示されていること"/>
                                                </div>
                                                <div className="colItem--70">
                                                    <p className="bl_point_card__text p--default">最終的にいくら程かかるのかがわからない葬儀会社が多く存在します。
                                                    <br/>感謝のお葬式は基本プランの金額はもちろん、その他にかかる費用から、想定の参列者数に応じて、最終的にいくらくらいかかるのかを簡単にお見積もりいただけるので安心です。</p>
                                                    <a href="<?php echo get_home_url() ?>/simulator/" className="buttonIcon--s button--white--l" target="_blank" rel="noopener noreferrer">
                                                        <div className="buttonIcon--s__wrap">
                                                            <i className="fa fa-search icon"></i>
                                                            <p className="p--default font-bold text">１分で簡単料金シミュレーション</p>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bl_point_card">
                                        <div className="headingWrap--h3Underline headingWrap--Underline--dotted">
                                            <h3 className="bl_point_card__title h3--smBorderLeft headingBorderLeft--gradientRed">2. お葬式スタッフの信頼感があること</h3>
                                        </div>
                                        <div className="box--white">
                                            <div className="col--2">
                                                <div className="colItem--30">
                                                    <img className="lazyload" src="/img/p-3.png" alt="お葬式スタッフの信頼感があること"/>
                                                </div>
                                                <div className="colItem--70">
                                                    <p className="bl_point_card__text p--default">どんなに素晴らしいプランでも、当日のスタッフのクオリティが低ければ、大切なご親族のお葬式が嫌な思い出として残ってしまいます。そのため、対応するスタッフが親切に対応してくれるか、信頼できるかどうかか非常に重要なポイントです。</p>
                                                    <p className="bl_point_card__text p--default">感謝のお葬式は、創業27年の葬儀社提携のため、高品質な対応が魅力の一つ。当日も徹底的に親切な対応を心がけてサポートいたしますので、安心してご依頼ください。また、初めての喪主で何から準備すればわからない方に、事前に知っておいていただきたい事項をまとめておりますので、ぜひご覧ください。</p>
                                                    <a href="<?php echo get_home_url() ?>/howto/" className="buttonIcon--s button--white--l" target="_blank" rel="noopener noreferrer">
                                                        <div className="buttonIcon--s__wrap">
                                                            <i className="fa fa-search icon"></i>
                                                            <p className="p--default font-bold text">はじめての喪主の方はこちら</p>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bl_point_card">
                                        <div className="headingWrap--h3Underline headingWrap--Underline--dotted">
                                            <h3 className="bl_point_card__title h3--smBorderLeft headingBorderLeft--gradientRed">3. ご希望に合ったプランが完備されていること</h3>
                                        </div>
                                        <div className="box--white">
                                            <div className="col--2">
                                                <div className="colItem--30">
                                                    <img className="lazyload" src="/img/p-2.png" alt="ご希望に合ったプランが完備されていること"/>
                                                </div>
                                                <div className="colItem--70">
                                                    <p className="bl_point_card__text p--default">どんなに素晴らしいプランでも、当日のスタッフのクオリティが低ければ、大切なご親族のお葬式が嫌な思い出として残ってしまいます。
                                                    <br/>そのため、対応するスタッフが親切に対応してくれるか、信頼できるかどうかか非常に重要なポイントです。</p>
                                                    <p className="bl_point_card__text p--default">感謝のお葬式は、創業27年の葬儀社提携のため、高品質な対応が魅力の一つ。当日も徹底的に親切な対応を心がけてサポートいたしますので、安心してご依頼ください。</p>
                                                    <p className="bl_point_card__text p--default">また、初めての喪主で何から準備すればわからない方に、事前に知っておいていただきたい事項をまとめておりますので、ぜひご覧ください。</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="point__simulation box--bgGray__content box--white">
                                    <div className="head--flex gap--12 box--white__title headingWrap--h3Underline">
                                        <h3 className="h3--sm">料金シミュレーション</h3>
                                    </div>
                                    <div className="box--white__content">
                                        <p className="p--default fontColor--black80">基本プランの料金だけを表示して、最終的にいくら程かかるのかがわからない葬儀会社が多く存在します。
                                            <br/>お葬式選びをされる際には『最終的にいくら支払うのか』の観点から、予算に合うプランの中で、より理想に近いお葬式を選ぶこが重要です。感謝のお葬式では基本プランの金額はもちろん、その他にかかる費用から、想定の参列者数に応じて、最終的にいくらくらいかかるのかを簡単にお見積もりいただけるので安心です！</p>
                                    </div>
                                    <div className="box--white__content">
                                        <div className="toSimulatorWrap bgImgBlock">
                                            <h2 className="bgImgBlock__title h2--default">1分で簡単料金シミュレーション</h2>
                                            <p className="bgImgBlock__text p--l">プラン金額 ＝ 負担額ではありません。
                                            <br/>お葬式の費用はプラン金額などから香典金額などを差し引いた金額が実質負担金額です。
                                            <br/>感謝のお葬式なら、おおよその実質負担金額がすぐにわかるので安心です。</p>
                                            <a href="<?php echo get_home_url() ?>/simulator/" className="button--m button--yellow" target="_blank" rel="noopener noreferrer">
                                                <p className="p--ll font-bold text">料金シミュレーションをしてみる</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <CtaS />
                <section id="topFlow" className="flow">
                    <div className="container">
                        <div className="topFlow__titleWrap">
                            <h2 className="topFlow__title h2--default">お葬式の流れ</h2>
                            <p className="topFlow__text p-default">感謝葬の葬儀では、初めての喪主でご不安な方にも安心していただけるよう、丁寧にサポートさせていただきます。</p>
                        </div>
                        <div className="flowMain">
                            <div className="flowBlock">
                                <h3 className="flowBlock__title">ご逝去日</h3>
                                <ul className="flowBlock__listWrap">
                                    <li className="flowList">
                                        <img className="flowList__img lazyload" src="/img/flowListImg_0-1.png" alt="葬儀社にご連絡"/>
                                        <div className="flowList__textBlock">
                                            <h4 className="flowList__title">葬儀社にご連絡</h4>
                                            <p className="flowList__text fontColor--black80">24時間365日対応。事前のご相談なくご依頼いただけます。</p>
                                            <div className="flowList__tag">
                                                <div className="flowList__tagWrap">
                                                    <div className="tag tag--s tagSp--xs tag--black">24時間365日</div>
                                                    <div className="tag tag--s tagSp--xs tag--black">通話料無料</div>    
                                                </div>
                                                <div className="tel__number iconText">
                                                    <i className="ph-fill ph-phone-call fontColor--red60"></i>
                                                    <p className="iconText__text h4--default fontColor--red60">0120-949-823</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="flowList">
                                        <img className="flowList__img lazyload" src="/img/flowListImg_0-2.png" alt="お迎え"/>
                                        <div className="flowList__textBlock">
                                            <h4 className="flowList__title">お迎え</h4>
                                            <p className="flowList__text fontColor--black80">１時間程度で病院やご自宅へお迎えにあがります</p>
                                        </div>
                                    </li>
                                    <li className="flowList">
                                        <img className="flowList__img lazyload" src="/img/flowListImg_0-3.png" alt="ご安置"/>
                                        <div className="flowList__textBlock">
                                            <h4 className="flowList__title">ご安置</h4>
                                            <p className="flowList__text fontColor--black80">お葬式までの間、ご安置します。</p>
                                        </div>
                                    </li>
                                    <li className="flowList">
                                        <img className="flowList__img lazyload" src="/img/flowListImg_0-4.png" alt="お打ち合わせ"/>
                                        <div className="flowList__textBlock">
                                            <h4 className="flowList__title">お打ち合わせ</h4>
                                            <p className="flowList__text fontColor--black80">お葬式のプランや日程について打ち合わせを行います。
                                            <br/>「感謝のお葬式」では葬儀業界歴30年以上のスタッフなど、安心のベテランスタッフが対応いたしますので、プランだけでなく、当日までの準備や手続きなどについても、丁寧にご説明いたします。</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="flowBlock">
                                <h3 className="flowBlock__title">1日目</h3>
                                <ul className="flowBlock__listWrap">
                                    <li className="flowList">
                                        <img className="flowList__img lazyload" src="/img/flowListImg_1-1.png" alt="納棺"/>
                                        <div className="flowList__textBlock">
                                            <h4 className="flowList__title">納棺</h4>
                                            <p className="flowList__text fontColor--black80">故人さまを棺にお納めします。</p>
                                        </div>
                                    </li>
                                    <li className="flowList">
                                        <img className="flowList__img lazyload" src="/img/flowListImg_1-2.png" alt="通夜式"/>
                                        <div className="flowList__textBlock">
                                            <h4 className="flowList__title">通夜式</h4>
                                            <p className="flowList__text fontColor--black80">通常夕刻にお集まりいただき、お通夜を行います。</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="flowBlock">
                                <h3 className="flowBlock__title">2日目</h3>
                                <ul className="flowBlock__listWrap">
                                    <li className="flowList">
                                        <img className="flowList__img lazyload" src="/img/flowListImg_2-1.png" alt="告別式"/>
                                        <div className="flowList__textBlock">
                                            <h4 className="flowList__title">告別式</h4>
                                            <p className="flowList__text fontColor--black80">故人さまとの最後のお別れをする告別式を行います。</p>
                                        </div>
                                    </li>
                                    <li className="flowList">
                                        <img className="flowList__img lazyload" src="/img/flowListImg_2-2.png" alt="火葬"/>
                                        <div className="flowList__textBlock">
                                            <h4 className="flowList__title">火葬</h4>
                                            <p className="flowList__text fontColor--black80">火葬場へ納棺します。ご火葬の後は納骨を行います。</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ly_column">
                    <div className="bl_column">
                        <div className="sp80">
                            <div className="wi1200">
                                <div className="bl_column_in marginBottom--16">
                                    <div className="bl_column_text-1">感謝のお葬式の、葬儀がわかるコラム</div>
                                    <div className="bl_column_text-2">葬儀の疑問が解決するコラムです。何かわからないことがあればコラムを見てみましょう</div>
                                    <div className="bl_column_wapper_card">

                                            {Limit4PostsData.length === 0 ? (
                                              <div className="post">
                                                <p>申し訳ございません。<br />該当する記事がございません。</p>
                                              </div>
                                            ) : (
                                            Limit4PostsData.map((post) => (
                                              <Link href="" className="bl_column_card" key={post.id}>
                                                  {post._embedded['wp:featuredmedia'] && (
                                                  <div className="bl_column_c-1-img">
                                                      {post._embedded['wp:featuredmedia'].map((featuredmedia) => (
                                                      <img src={featuredmedia.source_url} key={featuredmedia.id} className="wi100 wp-post-image" alt={`${post.title.rendered}`} />
                                                      ))}
                                                  </div>
                                                  )}
                                                  {/* タイトル表示 */}
                                                  <div className="bl_column_c_text-1">{post.title.rendered}</div>
                                                  <div className="bl_column_c_text-2" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}/>
                                              </Link>
                                              ))
                                              )}


                                    </div>
                                </div>
                                <div className="text--center">
                                    <a href="<?php echo get_home_url() ?>/articles" className="button--s button--white p--default font-bold text--center">コラム一覧をみる</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ly_supervision">
                    <div className="bl_supervision">
                        <div className="sp80">
                            <div className="wi960">
                                <div className="bl_supervision_in">
                                    <div className="bl_supervision_text-1">感謝のお葬式は</div>
                                    <div className="bl_supervision_text-2">エンディングプランナー監修</div>
                                    <div className="bl_supervision_in_in">
                                        <div className="bl_supervision_in_left">
                                            <div className="bl_supervisione_l_p-1-img pc"><img src="/img/su-1.png" alt="堀田純子" className="wi100 lazyload"/></div>
                                            <div className="bl_supervisione_l_p-1-img sp"><img src="/img/su-1-sp.png" alt="堀田純子" className="wi100 lazyload"/></div>
                                            <div className="bl_supervision_l_wapper_w_text-1">
                                                <div className="bl_supervision_l_wapper_text-1">
                                                    <div className="bl_supervision_l_text-1">堀田 純子</div>
                                                    <div className="bl_supervision_l_text-2">Junko Horita</div>
                                                </div>
                                                <div className="bl_supervision_l_text-3">・JADB認定 終活ライフケアプランナー /</div>
                                                <div className="bl_supervision_l_text-3">・銀座おとな塾認定講師</div>
                                                <div className="bl_supervision_l_text-3">・元船井総研エンディング部門アドバイザー</div>
                                                <div className="bl_supervision_l_text-4">主なメディア・セミナー実績</div>
                                                <div className="bl_supervision_l_text-3">・東急グループ 終活セミナー </div>
                                                <div className="bl_supervision_l_text-3">・週刊朝日 シニアライフを充実させるための終活とは</div>
                                                <div className="bl_supervision_l_text-3">・テレビ北海道 ぶっちゃけ終活TVレギュラー出演</div>
                                            </div>
                                        </div>
                                        <div className="bl_supervision_in_right">
                                            <div className="bl_supervision_r_w_text-1">
                                                <div className="bl_supervision_r_text-1">お葬式は人生の卒業式</div>
                                                <div className="bl_supervision_r_text-2">近年、小さくコンパクトにお葬式を開こうとする方が多いですが、大切な親族と過ごせる最後の日を、本当にそんな形でいいのでしょうか。私は10年以上葬儀を始め終活に携わって参りましたが、お葬式は菊などの供花で寂しげに飾られたものが多いなど慣習的なものが多く、もっと細やかな配慮で故人のためにブラッシュアップされるべきだと強く感じておりました。また、今の主流になりつつある家族葬のように、小さく行う方が支出が増える可能性が高く、費用を抑えるならある程度の規模で行う方が最終的な負担金額は安くなるという事もお見送りした後に分かる事もしばしばです。そこで故人のための、故人を想う最適なお葬式として、『感謝のお葬式』を作りました。このお葬式をきっかけに、送ったあとも温かい想いに包まれるような人生の卒業式で送り出す方が増えることを祈っております。</div>
                                            </div>
                                            <div className="bl_supervision_r_w_text-2">
                                                <div className="bl_supervision_r_text-1">TV番組等多数のメデイアに出演</div>
                                                <div className="bl_supervision_r_w_m">
                                                    <div className="bl_supervisione_m-1-img"><img src="/img/m-1.png" alt="堀田純子 番組出演スクリーンショット" className="wi100 lazyload"/></div>
                                                    <div className="bl_supervisione_m-1-img"><img src="/img/m-2.png" alt="堀田純子 番組出演スクリーンショット" className="wi100 lazyload"/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ly_comment">
                    <div className="bl_comment">
                        <div className="">
                            <div className="">
                                <div className="bl_comment_in">
                                    <div className="bl_comment_text-1 pc">実際に喪主を務められた多くの方からの声で<br/>「感謝のお葬式」は生まれました</div>
                                    <div className="bl_comment_text-1 sp">実際に喪主を務められた<br/>多くの方からの声で<br/>「感謝のお葬式」は生まれました</div>
                                    <div className="bl_comment_text-2 pc">大切な人生の卒業式を、安心で彩りあるものに</div>
                                    <div className="bl_comment_text-2 sp">大切な人生の卒業式を、安心で彩りあるものに</div>
                                    <div className="loopSlider" onMouseEnter={handleSliderHover} onMouseLeave={handleSliderLeave}>
                                      <Slider {...settings} pauseOnHover={isHovered} clasName="bl_comment_wapper_card loopSlider">
                                        <div className="bl_comment_card">
                                            <div className="bl_comment_card_in">
                                                <div className="bl_comment_c_text-1">初めてのこと喪主で忙しくて急いで葬儀会社を選んだが、結果的にお葬式で故人を想う時間をつくることができなかった。安心安全であることは前提で、もっと故人の好きなものをつかったお葬式があってほしい。</div>
                                                <div className="bl_comment_c_text-2">H・Mさま</div>
                                            </div>
                                        </div>
                                        <div className="bl_comment_card">
                                            <div className="bl_comment_card_in">
                                                <div className="bl_comment_c_text-1">精神的余裕がなく、最良の葬儀プランを選ぶことができなかった。菊だけの祭壇などではなく、もっと前向きに故人にを送り出せる式があれば選びたい。</div>
                                                <div className="bl_comment_c_text-2">S・Hさま</div>
                                            </div>
                                        </div>
                                        <div className="bl_comment_card">
                                            <div className="bl_comment_card_in">
                                                <div className="bl_comment_c_text-1">急なお葬式だったため相談できる人がおらず、知り合いから紹介された葬儀会社にお願いしたところ、言われるがままのプランを選んでしまった。後から考えたらもっと亡くなった家族のためにプランを選定したかった。</div>
                                                <div className="bl_comment_c_text-2">K・Kさま</div>
                                            </div>
                                        </div>
                                        <div className="bl_comment_card">
                                            <div className="bl_comment_card_in">
                                                <div className="bl_comment_c_text-1">知識がなく、何で選べばいいか分からないまま、葬儀会社の提案通りの式を選んだところ、提案にない料金を請求された。安心で明朗な提案をしてくださる葬儀会社を選びたい。</div>
                                                <div className="bl_comment_c_text-2">O・Hさま</div>
                                            </div>
                                        </div>
                                      </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <CtaL />
                <section className="ly_news">
                    <div className="bl_news">
                        <div className="sp80">
                            <div className="wi960">
                                <div className="bl_news_in">
                                    <div className="bl_news_text-1">お知らせ</div>
                                    <div className="bl_news_wapper">

                                        {Limit4PostsNewsData.length === 0 ? (
                                          <div className="post">
                                            <p>申し訳ございません。<br />該当する記事がございません。</p>
                                          </div>
                                        ) : (
                                          Limit4PostsNewsData.map((post) => (
                                            <a key={post.id} href={`https://kansha-ososhiki.com/articles/${post.id}/`} className="bl_news_wapper_w">
                                              <div className="bl_news_w_text-1">{post.date}</div>
                                              <div className="bl_news_w_text-2">
                                                <ul>
                                                  <li>{post.cate}</li>
                                                </ul>
                                              </div>
                                              {/* cate が 'コラム' の場合 */}
                                              {post.cate === 'コラム' && (
                                                <div className="bl_news_w_text-3">新規コラムが追加されました。「{post.title}」</div>
                                              )}
                                              {/* cate が 'ニュース' の場合 */}
                                              {post.cate === 'ニュース' && (
                                                <div className="bl_news_w_text-3">{post.title}</div>
                                              )}
                                            </a>
                                          ))
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
          </div>
          <footer>
            <Footer />

            <SpFloating />

          </footer>

        </>
  )
}


/* 自動スクロール *//*
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

		findUl.wrapAll('<div className="loopSliderWrap" />');
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
});*/


//SSG実装
export async function getStaticProps() {
  try {
    // getPrefecturePost関数呼び出し
    const prefectureTokyoLimitPostsData = await getPrefecturePost(98,4);

    // getAllPostsSlugData関数を呼ぶ
    const getAllPostsSlugDataB = await getAllPostsSlugData();
    //console.log('getAllPostsSlugDataB', getAllPostsSlugDataB);

    // updatedAllPostsData関数を呼ぶ
    const updatedPrefectureLimitPostsData = await updatedPostsData(prefectureTokyoLimitPostsData, getAllPostsSlugDataB);
    //console.log('updatedPrefectureLimitPostsData', updatedPrefectureLimitPostsData);



    // getAllPostsData関数を呼び出し area98=東京都でソート
    const prefectureTokyoPostsData = await getAllPostsData(98);
    //console.log('prefectureTokyoPostsData', prefectureTokyoPostsData);

    // updatedAllPostsData関数を呼ぶ
    const updatedPrefecturePostsData = await updatedPostsData(prefectureTokyoPostsData, getAllPostsSlugDataB);
    //console.log('updatedPrefectureLimitPostsData', updatedPrefectureLimitPostsData);


    //GoogleMap.jsに渡すデータ
    // getPrefecturePost関数呼び出し
    const allPostsDataC = await getAllPostsData();

    // updatedAllPostsData関数を呼ぶ
    const updatedAllPostsDataB = await updatedPostsData(allPostsDataC, getAllPostsSlugDataB);
    //console.log('updatedPrefectureLimitPostsData', updatedPrefectureLimitPostsData);

    // getPostsNewsData関数を呼ぶ
    const Limit4PostsNewsData = await getPostsNewsData();
    //console.log("Limit4PostsNewsData:", Limit4PostsNewsData);

    // getPostsNewsData関数を呼ぶ
    const Limit4PostsData = await getPostsData();
    //console.log("Limit4PostsData:", Limit4PostsData);

    return {
      props: {
        updatedPrefecturePostsData,
        updatedPrefectureLimitPostsData,
        updatedAllPostsDataB,
        Limit4PostsNewsData,
        Limit4PostsData,
      },
    };
  } catch (error) {
    console.error('データの取得エラー:', error);

    return {
      props: {
        updatedPrefecturePostsData: [],
        updatedPrefectureLimitPostsData: [],
        updatedAllPostsDataB: [],
        Limit4PostsNewsData: [],
        Limit4PostsData: [],
      },
    };
  }
}