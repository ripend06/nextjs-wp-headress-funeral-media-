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
import FuneralMap from '@/pages/componetns/googleMap/GoogleMap';
//import CtaS from '@/pages/componetns/includes/cta/CtaS';
import CtaL from '@/pages/componetns/includes/cta/CtaL';
import Footer from '@/pages/componetns/includes/Footer';
import Header from '@/pages/componetns/includes/Header';


export default function Place( {updatedPrefecturePostsData, updatedPrefectureLimitPostsData, updatedAllPostsDataB, updatedSaitamaLimitPostsData} ) {

  //console.log('updatedPrefectureLimitPostsData', updatedPrefectureLimitPostsData);
  //console.log('updatedAllPostsDataB', updatedAllPostsDataB);


  return (
    <>
      <div id="pagePlace">
        <div className="topIndex">


          <Head>
              <title>葬儀場一覧</title>
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

        <div>
        {/* <?php get_header(); ?> */}

            <Header />
            <section id="head" class="head head--style">
                <div class="head__wrap container">

                    <div class="breadcrumb ">
                        <div class="breadcrumb__link"><i class="ph-fill ph-house-line breadcrumb__icon"></i><a class="link breadcrumb__a" href="<?php echo home_url() ?>">ホーム</a></div>
                        <div class="breadcrumb__link"><i class="ph ph-caret-right breadcrumb__icon"></i>葬儀場一覧</div>
                    </div>
                </div>
            </section>
            <section class="title">
                <div class="container">
                    <div class="head__title marginBottom--32">
                        <h1 class="h1--default">葬儀場一覧</h1>
                    </div>
                </div>
            </section>
            <section class="addInfo marginBottom--40">
                <div class="container">
                    <div class="box--bgGray">
                        <div class="col--2">
                            <i class="addInfo__icon far fa-lightbulb"></i>
                            <p class="addInfo__text p--default fontColor--black80">掲載されている葬儀場以外にも、関東全域の葬儀場をご利用いただくことが可能です。
                                <br/>ご希望の葬儀場やお探しの葬儀場の条件がある場合には、お問い合わせの際にお申し出ください。</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ここからマップセクション --> */}
            <section id="map" class="map marginBottom--64">
                <div class="map__wrap container">
                  <div id="funeralMap">
                    <FuneralMap updatedMapPostsData={updatedAllPostsDataB}/>
                  </div>
                </div>
            </section>
            {/* <!-- ここまでマップセクション --> */}
            <section id="search" class="search marginBottom--64">
                <div class="search__wrap container">
                    <div class="searchBlock marginBottom--32">
                        <div class="headingWrap--h3Underline marginBottom--16">
                            <h3 class="h3--default">東京都の市区町村から探す</h3>
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
            <section id="infomation" class="infomation marginBottom--64">
                <div class="infomation__wrap container">
                    <div class="infomationBlock marginBottom--32">
                        <h2 class="h2--default marginBottom--16">東京都の葬儀場情報</h2>
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
                    
                    <div class="infomationBlock marginBottom--32">
                        <h2 class="h2--default marginBottom--16">埼玉県の葬儀場情報</h2>
                        <div className="imgText">
                          {updatedSaitamaLimitPostsData.map((post) => (
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
            <section id="megaMessage" class="megaMessage">
                <div class="container">
                    <div class="col--2">
                        <div class="colItem--35">
                            <div class="megaMessage__title">
                                <h2 class="h2--default fontColor--white100">だから<br/>感謝のお葬式が<br/>選ばれています</h2>
                            </div>
                        </div>
                        <div class="colItem--65">
                            <div class="megaMessage__main">
                                <p class="megaMessage__text p--default fontColor--white100">「お葬式をどんな基準で、どこに頼んでいいかわからない。」
                                    <br/>そんな方のために、創業27年の葬儀社とプロの終活アドバイザー監修のもと、
                                    <br/>葬儀業界暦30年の葬儀スタッフを初めとした熟練のスタッフが、「日本一安心・納得できるお葬式」を提供しています。</p>
                                <p class="megaMessage__text p--default fontColor--white100">故人との最後の思い出になるお葬式には、
                                    <br/>故人に由来のあるお花とともに、
                                    <br/>故人を愛しむ大切な時間を過ごしませんか。</p>
                                <p class="megaMessage__text p--default fontColor--white100">丁寧で安心できるお葬式を実現いたします。</p>
                            </div>
                        </div>
                    </div>
                  </div>
            </section>
            <CtaL />
            <footer>
                <Footer />
            </footer>

        </div>

      </div>

    </>
  )
}


//SSG実装
export async function getStaticProps() {
  try {
    // getPrefecturePost関数呼び出し
    const prefectureTokyoLimitPostsData = await getPrefecturePost(98,4);

    // getPrefecturePost関数呼び出し
    const prefectureSaitamaLimitPostsData = await getPrefecturePost(148,4);

    // getAllPostsSlugData関数を呼ぶ
    const getAllPostsSlugDataB = await getAllPostsSlugData();
    //console.log('getAllPostsSlugDataB', getAllPostsSlugDataB);

    // updatedAllPostsData関数を呼ぶ
    const updatedPrefectureLimitPostsData = await updatedPostsData(prefectureTokyoLimitPostsData, getAllPostsSlugDataB);
    //console.log('updatedPrefectureLimitPostsData', updatedPrefectureLimitPostsData);

    // updatedAllPostsData関数を呼ぶ
    const updatedSaitamaLimitPostsData = await updatedPostsData(prefectureSaitamaLimitPostsData, getAllPostsSlugDataB);
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












    return {
      props: {
        updatedPrefecturePostsData,
        updatedPrefectureLimitPostsData,
        updatedAllPostsDataB,
        updatedSaitamaLimitPostsData,
      },
    };
  } catch (error) {
    console.error('データの取得エラー:', error);

    return {
      props: {
        updatedPrefecturePostsData: [],
        updatedPrefectureLimitPostsData: [],
        updatedAllPostsDataB: [],
        updatedSaitamaLimitPostsData: [],
      },
    };
  }
}