import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAllPostsData } from '@/libs/place/getAllPostsPlaceData';
import { getAllPostsSlugData } from '@/libs/place/getAllPostsSlugData';
import { filteredPostsPath } from '@/libs/place/filteredPostsPath';
import { updatedPostsData } from '@/libs/place/updatedPostsData';
import FuneralMap from '../componetns/googleMap/GoogleMap';


//都道府県別ソートページ
function Area({ allPostsData, area, city, totalPages, filterPathData, updatedPostsDataB, areaName }) {

  console.log('totalPages', totalPages);
  console.log('updatedPostsDataB', updatedPostsDataB);
  console.log('filterPathData', filterPathData);
  console.log('areaName', areaName);
  //console.log('cityName', cityName);
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
    console.log('pageValue', pageValue);


    //URLのページ番号に対応するPlaceデータをソート
    const postsPerPage = 8;
    const startIdx = (parseInt(pageValue) - 1) * postsPerPage;
    const endIdx = startIdx + postsPerPage;
    const displayedPosts = filterPathData
      //.filter(post => post.acf.address.address_prefecture === area)
      .slice(startIdx, endIdx);

    console.log('Display posts:',displayedPosts);


    return (
      <>

            areaPage
            <h3>
            <Link href={`/place/${area}`}>{areaName}</Link>
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
                <Link key={index + 1} href={`/place/${area}?page=${index + 1}`}>
                    <span style={{ margin: '0 5px' }}>{index + 1}</span>
                </Link>
                ))}
            </div>
        </>
    );
}

export default Area;


//SSG実装
export async function getStaticProps({ params }) {
    try {
      //const city = params.city;
      const area = params.area;
      console.log('params', params);

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
        post.area.some((area) => area.parentSlug === params.area)
      );
      //console.log('filterPathData:', filterPathData);


      //　総ページ数を取得
      const totalPages = Math.ceil(filterPathData.length / 8);
      //console.log('totalPages', totalPages);


      //現在のページのnameを取り出す
      // const cityName = updatedPostsDataB
      //   .filter((post) => post.area[0].slug === params.city)
      //   .map((post) => post.area[0].name);
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
          //city,
          // cityName,
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
          //city: [],
          // cityName: [],
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

      console.log('paths:', paths);
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