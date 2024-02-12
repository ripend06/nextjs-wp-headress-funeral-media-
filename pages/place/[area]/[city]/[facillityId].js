import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { getAllPostsData } from '@/libs/place/getAllPostsPlaceData';
import { getMediaData } from '@/libs/place/getMedeiaData';
import { getNearbyPosts } from '@/libs/place/getNearbyPosts';
import { getAllPostsSlugData } from '@/libs/place/getAllPostsSlugData';
import { updatedPostsData } from '@/libs/place/updatedPostsData';
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


//施設情報ページ
function FacillityName({ filteredPosts, city, area, facillityName, areaName, cityName, mediaData, nearbyPostsData, facillityId }) {

    const sliderForRef = useRef(null);
    const sliderNavRef = useRef(null);

    const sliderForSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: sliderNavRef.current,
        draggable: false,
    };

    const sliderNavSettings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: sliderForRef.current,
        dots: true,
        focusOnSelect: true,
    };

    const handleSlideClick = (slideIndex) => {
        sliderNavRef.current.slickGoTo(slideIndex);
        sliderForRef.current.slickGoTo(slideIndex);
    };

    const handlePreviousSlide = () => {
        sliderForRef.current.slickPrev(); // slider-forの前のスライドに移動
        sliderNavRef.current.slickPrev(); // slider-navの前のスライドに移動
    };

    const handleNextSlide = () => {
        sliderForRef.current.slickNext(); // slider-forの次のスライドに移動
        sliderNavRef.current.slickNext(); // slider-navの次のスライドに移動
    };

    //console.log('mediaData', mediaData);
    // console.log('filteredPosts', filteredPosts);
    // console.log('facillityId', facillityId);
    // console.log('areaName', areaName);
    // console.log('cityName', cityName);

    return (
        <>
        <div id="archivePlace">
            <div className="topIndex">
                facillityNamePage
                <h3>
                    <Link href="/">ホーム</Link>
                    {">"}
                    <Link href={`/place/`}>葬儀一覧</Link>
                    {">"}
                    <Link href={`/place/${area}`}>{areaName}</Link>
                    {">"}
                    <Link href={`/place/${area}/${city}`}>{cityName}</Link>
                    {">"}
                    <Link href={`/place/${area}/${city}/${facillityId}`}>{facillityName}</Link>
                の葬儀場情報</h3>
                <div class="mediaDatass">
                {mediaData.flat().map((post) => (
                    <div class="mediaDatas" key={post.id}>
                        <img src={post.guid.rendered} alt={post.id} />
                    </div>
                ))}
                </div>
                {filteredPosts.map((post) => (
                <div key={post.id}>
                    {post._embedded && post._embedded['wp:featuredmedia'] && (
                    <div>
                        {post._embedded['wp:featuredmedia'].map((featuredmedia) => (
                        <img src={featuredmedia.source_url} key={featuredmedia.id} alt={`${post.title.rendered}`} />
                        ))}
                    </div>
                    )}
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
                    {post.acf.address.address_city}
                    {post.acf.address.address_city}
                    {post.acf.address.address_1}
                    {post.acf.address.address_2}
                    </div>

                    <h3>施設特徴</h3>
                    <div>
                        {post.acf.feature_tag && (
                            <div>
                                <div className={`${post.acf.feature_tag.includes('tag1') ? 'add' : ''} facility-feature`}>駐車場</div>
                                <div className={`${post.acf.feature_tag.includes('tag2') ? 'add' : ''} facility-feature`}>駅近く</div>
                                <div className={`${post.acf.feature_tag.includes('tag3') ? 'add' : ''} facility-feature`}>控室あり</div>
                                <div className={`${post.acf.feature_tag.includes('tag4') ? 'add' : ''} facility-feature`}>宿泊可</div>
                                <div className={`${post.acf.feature_tag.includes('tag5') ? 'add' : ''} facility-feature`}>安置施設</div>
                                <div className={`${post.acf.feature_tag.includes('tag6') ? 'add' : ''} facility-feature`}>バリアフリー</div>
                            </div>
                        )}
                    </div>
                    <div>
                        {filteredPosts.map((post) => (
                            <div key={post.id}>
                                {post.acf.feature_text}
                            </div>
                        ))}
                    </div>

                    <h3>基本情報</h3>
                    <div>
                        {filteredPosts.map((post) => (
                            <div key={post.id}>
                                {post.acf.feature_text}
                                <div>
                                    <div>駐車場:{`${post.acf.facility.includes('facility1') ? 'あり' : 'なし'}`}</div>
                                    <div>安置施設:{`${post.acf.facility.includes('facility2') ? 'あり' : 'なし'}`}</div>
                                    <div>控室:{`${post.acf.facility.includes('facility3') ? 'あり' : 'なし'}`}</div>
                                    <div>併設火葬場:{`${post.acf.facility.includes('facility4') ? 'あり' : 'なし'}`}</div>
                                    <div>宿泊室:{`${post.acf.facility.includes('facility5') ? 'あり' : 'なし'}`}</div>
                                    <div>会食室:{`${post.acf.facility.includes('facility6') ? 'あり' : 'なし'}`}</div>
                                    <div>法要室:{`${post.acf.facility.includes('facility7') ? 'あり' : 'なし'}`}</div>
                                    <div>お風呂・シャワー:{`${post.acf.facility.includes('facility8') ? 'あり' : 'なし'}`}</div>
                                    <div>キッズ・託児所:{`${post.acf.facility.includes('facility9') ? 'あり' : 'なし'}`}</div>
                                    <div>バリアフリー:{`${post.acf.facility.includes('facility10') ? 'あり' : 'なし'}`}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3>近くの葬儀場</h3>
                    <div class="nearbyPostsDatas">
                        {nearbyPostsData.map((post) => (
                            <div key={post.id} class="nearbyPostsData">
                                <Link href={`/place/${post.area[0].parentSlug}/${post.area[0].slug}/${post.id}`} className={styles.homePlace}>
                                    {post._embedded && post._embedded['wp:featuredmedia'] && (
                                    <div>
                                        {post._embedded['wp:featuredmedia'].map((featuredmedia) => (
                                        <img src={featuredmedia.source_url} key={featuredmedia.id} alt={`${post.title.rendered}`} />
                                        ))}
                                    </div>
                                    )}
                                    <h2>{post.title.rendered}</h2>
                                    <p>{post.acf.address.address_city}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                ))}
            </div>

            <div>
                <section id="head" class="head head--style">
                    <div class="head__wrap container">
                        <div class="breadcrumb ">
                            <div class="breadcrumb__link"><i class="ph-fill ph-house-line breadcrumb__icon"></i><Link class="link breadcrumb__a" href="/">ホーム</Link></div>
                            <div class="breadcrumb__link"><i class="ph ph-caret-right breadcrumb__icon"></i><Link class="link breadcrumb__a" href="/place">葬儀場一覧</Link></div>
                            <div class="breadcrumb__link"><i class="ph ph-caret-right breadcrumb__icon"></i><Link class="link breadcrumb__a" href={`/place/${area}`}>{areaName}</Link></div>
                            <div class="breadcrumb__link"><i class="ph ph-caret-right breadcrumb__icon"></i><Link class="link breadcrumb__a" href={`/place/${area}/${city}`}>{cityName}</Link></div>
                            <div class="breadcrumb__link"><i class="ph ph-caret-right breadcrumb__icon"></i>{facillityName}</div>
                        </div>
                        {filteredPosts.map((post) => (
                        <div key={post.id} class="head__main">
                            <div class="head__title">
                                <h1 class="head__h1 head__h1--style">{post.title.rendered}</h1>
                            </div>
                            <div class="head__content">
                                <div class="head__left">
                                <div class="headAddress">
                                    <p class="headAddress__text">{areaName}</p>
                                    <p class="headAddress__text">/</p>
                                    <p class="headAddress__text">{cityName}</p>
                                </div>
                                <div class="headAccess">
                                    <div class="headAccess__title iconText"><i class="ph ph-signpost headAccess__icon iconText__icon"></i>
                                    <p class="headAccess__text iconText__text">アクセス</p>
                                    </div>
                                    <p class="headAccess__text">{post.acf.access1.access_1} {post.acf.access1.access_2} {post.acf.access1.access_3} {post.acf.access1.access_4}</p>
                                </div>
                                </div>
                                <div class="head__right">
                                <div class="tel">
                                    <div class="tel__number iconText"><i class="ph-fill ph-phone-call iconText__icon tel__icon"></i>
                                    <p class="iconText__text tel__p">0120-949-823</p>
                                    </div>
                                    <div class="tel__tag">
                                    <div class="tag tel__tag--ly tag--m tag--black">24時間365日</div>
                                    <div class="tag tel__tag--ly tag--m tag--black">通話料無料</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        ))}
                        <div class="slider">
                        <Slider {...sliderForSettings} className="slider-for" ref={sliderForRef}>
                            {mediaData.flat().map((post, index) => (
                                <div key={post.id}>
                                    <img src={post.guid.rendered} alt={post.id} />
                                </div>
                            ))}
                        </Slider>
                        <Slider {...sliderNavSettings} className="slider-nav" ref={sliderNavRef}>
                            {mediaData.flat().map((post, index) => (
                                <div key={post.id} onClick={() => handleSlideClick(index)}>
                                    {/* ここにナビゲーションのサムネイル画像や要素を追加 */}
                                    <img src={post.guid.rendered} alt={post.id} />
                                </div>
                            ))}
                        </Slider>
                        <button onClick={handlePreviousSlide}>Previous</button>
                        <button onClick={handleNextSlide}>Next</button>
                        </div>
                    </div>
                    </section>
            </div>
        </div>
    </>
    );
}

// function CustomPrevArrow(props) {
//     const { className, onClick } = props;
//     return (
//         <div className={className} onClick={onClick}>
//             Previous
//         </div>
//     );
// }

// function CustomNextArrow(props) {
//     const { className, onClick } = props;
//     return (
//         <div className={className} onClick={onClick}>
//             Next
//         </div>
//     );
// }

export default FacillityName;


//SSG実装
export async function getStaticProps({ params }) {
    try {
        const city = params.city;
        const area = params.area;
        const facillityId = params.facillityId;
        //console.log('facillityId:', facillityId)

        // getAllPostsData関数を呼ぶ
        const allPostsData = await getAllPostsData();


        const getAllPostsSlugDataB = await getAllPostsSlugData();
        //console.log('getAllPostsSlugDataB', getAllPostsSlugDataB);

        // updatedPostsData関数を呼ぶ
        const updatedPostsDataB = await updatedPostsData(allPostsData, getAllPostsSlugDataB);
        //console.log('updatedPostsData', updatedPostsDataB);



        //対応する施設名でソート
        const filteredPosts = updatedPostsDataB.filter((post) => post.id == facillityId);


        // getMediaData関数を呼ぶ
        const mediaData = await getMediaData(filteredPosts);
        // console.log('mediaData', mediaData);


        // getNearbyPosts関数を呼ぶ
        const nearbyPostsData = await getNearbyPosts(updatedPostsDataB, city, area);


        //パンくず名を取得
        const facillityName = filteredPosts.map((post) => {
            return post.title.rendered;
        });
        const areaName = filteredPosts.map((post) => {
            return post.area[0].parentName;
        });
        const cityName = filteredPosts.map((post) => {
            return post.area[0].name;
        });




        return {
            props: {
            filteredPosts,
            nearbyPostsData,
            facillityName,
            areaName,
            cityName,
            facillityId,
            city,
            area,
            mediaData,
            //   totalPages: Math.ceil(allPostsData.filter(post => post.acf.address.address_city === city).length / 8),
            },
        };
    } catch (error) {
        console.error('propsデータの取得エラー:', error);
  
        return {
            props: {
                filteredPosts: [],
                nearbyPostsData: [],
                city: [],
                area: [],
                facillityName: [],
                areaName: [],
                cityName: [],
                facillityId: [],
                mediaData: [],
            //   totalPages: 0,
            },
        };
    }
}


//getStaticPaths関数
export async function getStaticPaths() {
    try {

      // getAllPostsData関数を呼ぶ
      const allPostsData = await getAllPostsData();
      //console.log('allPostsData', allPostsData);

      const getAllPostsSlugDataB = await getAllPostsSlugData();
      //console.log('getAllPostsSlugDataB', getAllPostsSlugDataB);

      // updatedPostsData関数を呼ぶ
      const updatedPostsDataB = await updatedPostsData(allPostsData, getAllPostsSlugDataB);
      //console.log('updatedPostsData', updatedPostsDataB);


      //動的ルーティングpath実装
      // getStaticPathsに必要なパスの情報を組み立て
      const paths = updatedPostsDataB.map((post) => {
        const areaSlug = post.area[0].parentSlug;
        const citySlug = post.area[0].slug;
        const titleSlug = post.id.toString();

        return {
          params: {
            area: areaSlug,
            city: citySlug,
            facillityId: titleSlug,
          },
        };
      });

      //console.log('paths:', paths);
      //console.log(totalPages);

      return {
        paths,
        fallback: false, // または 'blocking'
      };
    } catch (error) {
    console.error('pathsデータの取得エラー:', error);
    return {
        paths: [], // エラーが発生した場合、空のリストを返すか、fallback を true に設定して 404 ページにフォールバックするなどの適切な処理を行います
        fallback: false,
    };
    }

  }