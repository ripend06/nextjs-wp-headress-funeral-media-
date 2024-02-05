import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAllPostsData } from '@/libs/place/getAllPostsPlaceData';


//市町村別ソートページ
function City({ allPostsData, city, area, totalPages }) {

    //ページネーション番号付与Placeデータ
    const paths = allPostsData.flatMap((post) => {
      const totalPages = Math.ceil(allPostsData.filter(item => item.acf.address.address_city === post.acf.address.address_city).length / 8);
      return Array.from({ length: totalPages }, (_, index) => ({
        params: {
          city: post.acf.address.address_city.toString(),
          page: (index + 1).toString(), // ページ番号を指定
          item: post,
        },
      }));
    });
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
    const displayedPosts = allPostsData
      .filter(post => post.acf.address.address_city === city)
      .slice(startIdx, endIdx);

    //console.log('Display posts:',displayedPosts);


    return (
        <>

            CityPage
            <h3>
                <Link href={`/place/${area}`}>{area}</Link>
                {">"}
                <Link href={`/place/${area}/${city}`}>{city}</Link>
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
                {post.acf.address.address_city}
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
        </>
    );
}

export default City;


//SSG実装
export async function getStaticProps({ params }) {
    try {
      const city = params.city;
      const area = params.area;

      // getAllPostsData関数を呼ぶ
      const allPostsData = await getAllPostsData();


      return {
        props: {
          allPostsData,
          city,
          area,
          totalPages: Math.ceil(allPostsData.filter(post => post.acf.address.address_city === city).length / 8),
        },
      };
    } catch (error) {
      console.error('propsデータの取得エラー:', error);
  
      return {
        props: {
          allPostsData: [],
          city: [],
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

      //動的ルーティングpath実装
      const paths = allPostsDataA.flatMap((post) => {
        const totalPages = Math.ceil(allPostsDataA.filter(item => item.acf.address.address_city === post.acf.address.address_city).length / 8);
        return Array.from({ length: totalPages }, (_, index) => ({
          params: {
            area: post.acf.address.address_prefecture.toString(),
            city: post.acf.address.address_city.toString(),
            page: (index + 1).toString(), // ページ番号を指定 ⭐pageはいらないかも
          },
        }));
      });

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