import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { getAllPostsData } from '@/libs/place/getAllPostsPlaceData';
import { getMediaData } from '@/libs/place/getMedeiaData';


//施設情報ページ
function FacillityName({ filteredPosts, city, area, facillityName, mediaData }) {

    //対応する施設名でソート
    //const filteredPosts = allPostsData.filter((post) => post.title.rendered === facillityName);

    console.log('mediaData', mediaData);

    return (
        <>

        facillityNamePage
        <h3>
            <Link href={`/place/${area}`}>{area}</Link>
            {">"}
            <Link href={`/place/${area}/${city}`}>{city}</Link>
            {">"}
            <Link href={`/place/${area}/${city}/${facillityName}`}>{facillityName}</Link>
        の葬儀場情報</h3>
        <div class="mediaDatass">
        {mediaData.flat().map((post) => (
            <div class="mediaDatas" key={post.id}>
                <img src={post.guid.rendered} alt={post.id} />
            </div>
        ))}
        </div>
        {filteredPosts.map((post) => (
        <Link href={`/place/${post.acf.address.address_prefecture}/${post.acf.address.address_city}/${post.title.rendered}`} className={styles.homePlace} key={post.id}>
            {post._embedded['wp:featuredmedia'] && (
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

            <div>
                <div>駐車場</div>
                <div>駅近く</div>
                <div>控室あり</div>
                <div>宿泊可</div>
                <div>安置施設</div>
                <div>バリアフリー</div>
            </div>
        </Link>
        ))}
    </>
    );
}

export default FacillityName;


//SSG実装
export async function getStaticProps({ params }) {
    try {
      const city = params.city;
      const area = params.area;
      const facillityName = params.facillityName;

      // getAllPostsData関数を呼ぶ
      const allPostsData = await getAllPostsData();

      //対応する施設名でソート
    const filteredPosts = allPostsData.filter((post) => post.title.rendered === facillityName);

      // 各記事の img_slider を取り出して、それぞれのメディア情報を取得
        //const mediaPromises = [];
        //console.log('filteredPosts', filteredPosts);

        // const mediaPromises = filteredPosts.map(async (post) => {
        //     const nonEmptyValues = Object.values(post.acf.img_slider).filter((value) => value !== '');
            
        //     // 各非空のメディアIDに対してfetchを行う
        //     const mediaPromises = nonEmptyValues.map(async (mediaId) => {
        //       const mediaRes = await fetch(`http://funeralmedia.local/wp-json/wp/v2/media/${mediaId}?_fields=guid,id`);
        //       return mediaRes.json();
        //     });
            
        //     // メディア情報の取得が完了するまで待つ
        //     const mediaData = await Promise.all(mediaPromises);
            
        //     //console.log('Media Data for non-empty img_slider values:', mediaData);
            
        //     return mediaData;
        //   });
          
        //   const mediaData = await Promise.all(mediaPromises.flat());
          
        // console.log('Media Data for non-empty img_slider values:', mediaData);

        const mediaData = await getMediaData(filteredPosts);


        // const mediaPromises = filteredPosts.flatMap((post) => {
        //     if (post.acf.img_slider) {
        //         return Object.values(post.acf.img_slider)
        //             .filter((mediaId) => mediaId) // 空の値を除外
        //             .map((mediaId) => {
        //                 return fetch(`http://funeralmedia.local/wp-json/wp/v2/media/${mediaId}?_fields=guid`)
        //                     .then((mediaRes) => {
        //                         if (!mediaRes.ok) {
        //                             throw new Error(`Failed to fetch media for ID ${mediaId}`);
        //                         }
        //                         return mediaRes.json();
        //                     });
        //             });
        //     }
        //     return [];
        // });
        
        // const mediaData = await Promise.all(mediaPromises.flat());

        // console.log('mediaData', mediaData);


      return {
        props: {
          filteredPosts,
          facillityName,
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
          city: [],
          area: [],
          facillityName: [],
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
      const allPostsDataA = await getAllPostsData();

      // 動的ルーティングpath実装
      const paths = allPostsDataA.flatMap((post) => {
        return {
            params: {
                facillityName: post.title.rendered.toString(),
                area: post.acf.address.address_prefecture.toString(),
                city: post.acf.address.address_city.toString(),
            },
        };
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