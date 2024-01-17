import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAllPostsData } from '@/libs/place/getAllPostsPlaceData';
import { getAllPostsSlugData } from '@/libs/place/getAllPostsSlugData';
// import { filteredPostsPath } from '@/libs/place/filteredPostsPath';
// import { updatedAllPostsData } from '@/libs/place/updatedAllPostsData';


//都道府県別ソートページ
function Area({ allPostsData, area, totalPages, filterPathData }) {

  console.log('totalPages', totalPages);
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
            <Link href={`/place/${area}`}>{area}</Link>
            の葬儀場情報</h3>
            <h3>{pageValue}/{totalPages}ページ目</h3>
            {displayedPosts.map((post) => (
            <Link href={`/place/${post.acf.address.address_prefecture}/${post.acf.address.address_city}/${post.title.rendered}`} className={styles.homePlace} key={post.id}>
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
      const area = params.area;
      console.log('params', params);

      // getAllPostsData関数を呼ぶ
      const allPostsData = await getAllPostsData();

      // updatedAllPostsData関数を呼ぶ
      // const updatedAllPostsData = await updatedAllPostsData();
      // console.log('updatedAllPostsData', updatedAllPostsData);

      // // filteredPostsPath関数を呼ぶ
      // const filterPathData = await filteredPostsPath();


      const getAllPostsSlugDataB = await getAllPostsSlugData();



      // IdとSlugオブジェクトの作成
      const postIdSlug = getAllPostsSlugDataB.map((post) => ({
        id: post.id,
        slug: post.slug,
        // name: post.name,
        // parent: post.parent
      }));

      //console.log('postIdSlug', postIdSlug);
    
      // idとslug情報を入れて、allPostsDataを更新する
      const updatedAllPostsData = allPostsData.map((post) => ({
        ...post,
        area: post.area.map((id) => ({
          id: id,
          slug: postIdSlug.find((p) => p.id === id).slug
        })),
      }));

      //const areaData = updatedAllPostsData.map((post) => (post.area));
      //console.log('', areaData);




      const filterPathData = updatedAllPostsData.map((post) => ({
        ...post,
        area: post.area.filter((areaObj) => areaObj.slug === params.area),
      }));

      //console.log('filteredPosts', filteredPosts);






      //　総ページ数を取得
      const totalPages = Math.ceil(filterPathData.length / 8);
      //console.log('totalPages', totalPages);



      return {
        props: {
          allPostsData,
          filterPathData,
          area,
          totalPages,
        },
      };
    } catch (error) {
      console.error('propsデータの取得エラー:', error);
  
      return {
        props: {
          allPostsData: [],
          filterPathData: [],
          area: [],
          totalPages: 0,
        },
      };
    }
  }



//getStaticPaths関数
export async function getStaticPaths() {
    try {

      // getAllPostsData関数を呼ぶ
      const allPostsDataA = await getAllPostsData();
      const getAllPostsSlugDataA = await getAllPostsSlugData();
      //console.log(getAllPostsSlugDataA);

      //動的ルーティングpath実装
      // const paths = allPostsDataA.flatMap((post) => {
      //   const totalPages = Math.ceil(allPostsDataA.filter(item => item.acf.address.address_prefecture === post.acf.address.address_prefecture).length / 8);
      //   return Array.from({ length: totalPages }, (_, index) => ({
      //     params: {
      //       area: post.acf.address.address_prefecture.toString(),
      //       //page: (index + 1).toString(), // ページ番号を指定 ⭐pageはいらないかも
      //     },
      //   }));
      // });
      // エリアのデータを元に動的なパスを生成
      const paths = getAllPostsSlugDataA.map((post) => ({
        params: {
          area: post.slug,
          id: post.id
        },
      }));

      //console.log(paths);
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