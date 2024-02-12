import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAllPostsData } from '@/libs/place/getAllPostsPlaceData';
import { getAllPostsSlugData } from '@/libs/place/getAllPostsSlugData';
import { filteredPostsPath } from '@/libs/place/filteredPostsPath';
import { updatedPostsData } from '@/libs/place/updatedPostsData';
import FuneralMap from '@/pages/componetns/googleMap/GoogleMap';
//import CtaS from '@/pages/componetns/includes/cta/CtaS';
import CtaL from '@/pages/componetns/includes/cta/CtaL';
import Footer from '@/pages/componetns/includes/Footer';
import Header from '@/pages/componetns/includes/Header';


//都道府県別ソートページ
function Area({ allPostsData, area, city, totalPages, filterPathData, updatedPostsDataB, cityName, areaName }) {

  // console.log('totalPages', totalPages);
  // console.log('updatedPostsDataB', updatedPostsDataB);
  // console.log('filterPathData', filterPathData);
  // console.log('cityName', cityName);
  // console.log('areaName', areaName);
  //console.log('allPostsData', allPostsData);

    //ページネーション番号付与Placeデータ
    // const paths = allPostsData.flatMap((post) => {
    //   const totalPages = Math.ceil(allPostsData.filter(item => item.acf.address.address_prefecture === post.acf.address.address_prefecture).length / 8);
    //   return Array.from({ length: totalPages }, (_, index) => ({
    //     params: {
    //       area: post.acf.address.address_prefecture.toString(),
    //       page: (index + 1).toString(), // ページ番号を指定
    //       item: post,
    //     },
    //   }));
    // });
    //console.log('paths:',paths);


    //URLからページ場号取得
    const router = useRouter();

    const url = new URL(router.asPath, 'http://dummyurl');
    const paramsURL = new URLSearchParams(url.search);
    const pageValueUrl = paramsURL.get('page');

    const pageValue = pageValueUrl || '1';
    //console.log('pageValue', pageValue);


    //URLのページ番号に対応するPlaceデータをソート
    const postsPerPage = 8;
    const startIdx = (parseInt(pageValue) - 1) * postsPerPage;
    const endIdx = startIdx + postsPerPage;
    const displayedPosts = filterPathData
      //.filter(post => post.acf.address.address_prefecture === area)
      .slice(startIdx, endIdx);

    //console.log('Display posts:',displayedPosts);


    return (
      <>

        <div id="archivePlace">
          <div className="topIndex">
            areaPage
            <h3>
            <Link href={`/place/${area}`}>{areaName}{cityName}</Link>
            の葬儀場情報</h3>
            <h3>{pageValue}/{totalPages}ページ目</h3>

            <h3>地図</h3>
            <FuneralMap updatedMapPostsData={filterPathData}/>

            {displayedPosts.map((post) => (
            <Link href={`/place/${post.area[0].parentSlug}/${post.area[0].slug}/${post.id}`} className={styles.homePlace} key={post.id}>
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
                {post.acf.address.address_prefecture}
                {post.acf.address.address_city}
                {post.acf.address.address_1}
                {post.acf.address.address_2}
                </div>
            </Link>
            ))}
            {/* ページネーションのリンクを表示 */}
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                <Link key={index + 1} href={`/place/${area}/${city}?page=${index + 1}`}>
                    <span style={{ margin: '0 5px' }}>{index + 1}</span>
                </Link>
                ))}
            </div>
          </div>

          <div>
        {/* <?php get_header(); ?> */}

            <Header />
            <section id="head" class="head head--style">
                <div class="head__wrap container">
                    <div class="breadcrumb ">
                      <div class="breadcrumb__link"><i class="ph-fill ph-house-line breadcrumb__icon"></i><Link class="link breadcrumb__a" href="/">ホーム</Link></div>
                      <div class="breadcrumb__link"><i class="ph ph-caret-right breadcrumb__icon"></i><Link class="link breadcrumb__a" href="/place">葬儀場一覧</Link></div>
                      <div class="breadcrumb__link"><i class="ph ph-caret-right breadcrumb__icon"></i><Link class="link breadcrumb__a" href={`/place/${area}`}>{areaName}</Link></div>
                      <div class="breadcrumb__link"><i class="ph ph-caret-right breadcrumb__icon"></i>{cityName}</div>
                    </div>
                </div>
            </section>
            <section class="title">
                <div class="container">
                    <div class="head__title marginBottom--32">
                        <h1 class="h1--default">{areaName}{cityName}の葬儀場</h1>
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
                    <FuneralMap updatedMapPostsData={filterPathData}/>
                  </div>
                </div>
            </section>
            {/* <!-- ここまでマップセクション --> */}
            <section id="places" class="places marginBottom--64">
              <div class="places__wrap container">

              {displayedPosts.map((post) => (

                <div class="place spNone" key={post.id}>
                  <div class="placeHead">
                    <h2 class="placeHead__title">{post.title.rendered}</h2>
                    <div class="placeHead__address iconText">
                      <i class="ph ph-map-pin placeHead__icon iconText__icon"></i>
                      <p class="placeHead__text iconText__text">{post.acf.address.address_prefecture} {post.acf.address.address_city} {post.acf.address.address_1} {post.acf.address.address_2}</p></div><div class="placeHead__btn">
                      <Link href={`/place/${post.area[0].parentSlug}/${post.area[0].slug}/${post.id}`} class="placeHead__a">詳細を見る</Link>
                    </div>
                  </div>
                  <div class="placeContent">
                    <div class="placeContent__inner">
                    {post._embedded && post._embedded['wp:featuredmedia'] && (
                        <div class="placeContent__img">
                          {post._embedded['wp:featuredmedia'].map((featuredmedia) => (
                            <img src={featuredmedia.source_url} key={featuredmedia.id} alt={`${post.title.rendered}`} />
                          ))}
                        </div>
                      )}
                      <div class="placeContent__wrap">
                        <div class="placeContent__access">
                          <p class="iconText">
                            <i class="ph ph-signpost placeContent__icon iconText__icon"></i>
                            <span class="placeContent__station iconText__text">{post.acf.access1.access_2}</span>
                            <span>から</span><span>{post.acf.access1.access_3}{post.acf.access1.access_4}</span>
                          </p>
                        </div>
                        <div class="placeContent__text placeContent__text--pc">{post.acf.feature_text}</div>
                        {post.acf.feature_tag && (
                        <div class="placeContent__tag">
                          <div class={`${post.acf.feature_tag.includes('tag1') ? 'active' : ''} tag placeContent__tag--lay tag--m placeContent__tag--color`}>駐車場</div>
                          <div class={`${post.acf.feature_tag.includes('tag2') ? 'active' : ''} tag placeContent__tag--lay tag--m placeContent__tag--color`}>駅近く</div>
                          <div class={`${post.acf.feature_tag.includes('tag3') ? 'active' : ''} tag placeContent__tag--lay tag--m placeContent__tag--color`}>控室あり</div>
                          <div class={`${post.acf.feature_tag.includes('tag4') ? 'active' : ''} tag placeContent__tag--lay tag--m placeContent__tag--color`}>宿泊可</div>
                          <div class={`${post.acf.feature_tag.includes('tag5') ? 'active' : ''} tag placeContent__tag--lay tag--m placeContent__tag--color`}>安置施設</div>
                          <div class={`${post.acf.feature_tag.includes('tag6') ? 'active' : ''} tag placeContent__tag--lay tag--m placeContent__tag--color`}>バリアフリー</div>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              ))}


              {displayedPosts.map((post) => (

                <div class="place pcNone" key={post.id}>
                  <div class="placeHead">
                    <h2 class="placeHead__title">{post.title.rendered}</h2>
                    <div class="placeHead__address iconText">
                      <i class="ph ph-map-pin placeHead__icon iconText__icon"></i>
                      <p class="placeHead__text iconText__text">{post.acf.address.address_prefecture} {post.acf.address.address_city} {post.acf.address.address_1} {post.acf.address.address_2}</p></div><div class="placeHead__btn">
                      <Link href={`/place/${post.area[0].parentSlug}/${post.area[0].slug}/${post.id}`} class="placeHead__a">詳細を見る</Link>
                    </div>
                  </div>
                  <div class="placeContent">
                    <div class="placeContent__inner">
                    {post._embedded && post._embedded['wp:featuredmedia'] && (
                        <div class="placeContent__img">
                          {post._embedded['wp:featuredmedia'].map((featuredmedia) => (
                            <img src={featuredmedia.source_url} key={featuredmedia.id} alt={`${post.title.rendered}`} />
                          ))}
                        </div>
                      )}
                      <div class="placeContent__wrap">
                        <div class="placeContent__access">
                          <p class="iconText">
                            <i class="ph ph-signpost placeContent__icon iconText__icon"></i>
                            <span class="placeContent__station iconText__text">{post.acf.access1.access_2}</span>
                            <span>から</span><span>{post.acf.access1.access_3}{post.acf.access1.access_4}</span>
                          </p>
                        </div>
                        <div class="placeContent__text placeContent__text--sp">{post.acf.feature_text}</div>
                        {post.acf.feature_tag && (
                        <div class="placeContent__tag">
                          <div class={`${post.acf.feature_tag.includes('tag1') ? 'active' : ''} tag placeContent__tag--lay tag--xs placeContent__tag--color`}>駐車場</div>
                          <div class={`${post.acf.feature_tag.includes('tag2') ? 'active' : ''} tag placeContent__tag--lay tag--xs placeContent__tag--color`}>駅近く</div>
                          <div class={`${post.acf.feature_tag.includes('tag3') ? 'active' : ''} tag placeContent__tag--lay tag--xs placeContent__tag--color`}>控室あり</div>
                          <div class={`${post.acf.feature_tag.includes('tag4') ? 'active' : ''} tag placeContent__tag--lay tag--xs placeContent__tag--color`}>宿泊可</div>
                          <div class={`${post.acf.feature_tag.includes('tag5') ? 'active' : ''} tag placeContent__tag--lay tag--xs placeContent__tag--color`}>安置施設</div>
                          <div class={`${post.acf.feature_tag.includes('tag6') ? 'active' : ''} tag placeContent__tag--lay tag--xs placeContent__tag--color`}>バリアフリー</div>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              ))}


                {/* <div class="place pcNone">
                  <a href="https://kansha-ososhiki.com/place/tokyo/setagaya-ku/1021/">
                    <div class="placeHead">
                      <h2 class="placeHead__title">みどり会館</h2>
                      <div class="placeHead__address iconText">
                        <i class="ph ph-map-pin placeHead__icon iconText__icon"></i>
                        <p class="placeHead__text iconText__text"> 東京都 世田谷区 北烏山5-1-5</p>
                      </div>
                    </div>
                    <div class="placeContent">
                      <div class="placeContent__inner">
                        <div class="placeContent__img"><img class=" lazyloaded" data-src="https://kansha-ososhiki.com/wp-content/uploads/2023/08/012_img01-680x390.jpg" alt="みどり会館" src="https://kansha-ososhiki.com/wp-content/uploads/2023/08/012_img01-680x390.jpg"/></div>
                        <div class="placeContent__wrap">
                          <div class="placeContent__access">
                            <p class="iconText">
                              <i class="ph ph-signpost placeContent__icon iconText__icon"></i>
                              <span class="placeContent__station iconText__text">千歳烏山駅</span>
                              <span>から</span>
                              <span>徒歩12分</span>
                            </p>
                          </div>
                          <div class="placeContent__tag">
                            <div class="tag placeContent__tag--lay tag--xs placeContent__tag--color active">駐車場</div>
                            <div class="tag placeContent__tag--lay tag--xs placeContent__tag--color">駅近く</div>
                            <div class="tag placeContent__tag--lay tag--xs placeContent__tag--color">控室あり</div>
                            <div class="tag placeContent__tag--lay tag--xs placeContent__tag--color active">宿泊可</div>
                            <div class="tag placeContent__tag--lay tag--xs placeContent__tag--color active">安置施設</div>
                            <div class="tag placeContent__tag--lay tag--xs placeContent__tag--color">バリアフリー</div>
                          </div>
                        </div>
                      </div>
                      <div class="placeContent__text placeContent__text--sp">みどり会館は千歳烏山駅から徒歩12分の世田谷区民斎場です。 駐車場は最大20台駐車可能で余裕があります。 みどり会館でご葬儀をご希望の方は 0120-949-823 までお電話ください。資料のご請求、ご相談、お問い合わせ等も同じ電話番号で承っておりますので、お気軽にご連絡ください。</div>
                    </div>
                  </a>
                </div> */}

              </div>
            </section>

             {/* ページネーションのリンクを表示 */}
            <section id="pageNation" class="pageNation">
              <div class="pageNation__wrap container">
                <ul class="page-numbers">
                  {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index + 1}>
                          <Link className={pageValue == index + 1 ? "page-numbers current" : "page-numbers"} href={`/place/${area}/${city}?page=${index + 1}`}>
                              <span style={{ margin: '0 5px' }}>{index + 1}</span>
                          </Link>
                      </li>
                  ))}
                </ul>
              </div>
            </section>



            <CtaL />
            <footer>
                <Footer />
            </footer>

          </div>


        </div>
        </>
    );
}

export default Area;


//SSG実装
export async function getStaticProps({ params }) {
    try {
      const city = params.city;
      const area = params.area;
      //console.log('params', params);

      // getAllPostsData関数を呼ぶ
      const allPostsData = await getAllPostsData();
      //console.log('allPostsData', allPostsData);

      const getAllPostsSlugDataB = await getAllPostsSlugData();
      //console.log('getAllPostsSlugDataB', getAllPostsSlugDataB);

      // updatedPostsData関数を呼ぶ
      const updatedPostsDataB = await updatedPostsData(allPostsData, getAllPostsSlugDataB);
      //console.log('updatedPostsData', updatedPostsDataB);



      // updatedPostsDataBからparentが0かつslugがparams.areaと一致するものを取り出す
      const filterPathData = updatedPostsDataB
      .filter((post) =>
        post.area.some((area) => area.slug === params.city)
      );
      // console.log('filteredAndSortedPosts:', filteredAndSortedPosts);


      //　総ページ数を取得
      const totalPages = Math.ceil(filterPathData.length / 8);
      //console.log('totalPages', totalPages);


      //現在のページのnameを取り出す
      const cityName = updatedPostsDataB
        .filter((post) => post.area[0].slug === params.city)
        .map((post) => post.area[0].name)[0];
      //console.log('cityName:', cityName);

      //現在のページのparentNameを取り出す
      const areaName = updatedPostsDataB
        .filter((post) => post.area[0].parentSlug === params.area)
        .map((post) => post.area[0].parentName)[0];
      //console.log('cityName:', cityName);


      return {
        props: {
          allPostsData,
          area,
          city,
          cityName,
          areaName,
          totalPages,
          updatedPostsDataB,
          filterPathData,
        },
      };
    } catch (error) {
      console.error('propsデータの取得エラー:', error);
  
      return {
        props: {
          allPostsData: [],
          area: [],
          city: [],
          cityName: [],
          areaName: [],
          totalPages: 0,
          updatedPostsDataB: [],
          filterPathData: [],
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