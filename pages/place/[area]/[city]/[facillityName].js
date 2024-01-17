import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { getAllPostsData } from '@/libs/place/getAllPostsPlaceData';
import { getMediaData } from '@/libs/place/getMedeiaData';
import { getNearbyPosts } from '@/libs/place/getNearbyPosts';


//施設情報ページ
function FacillityName({ filteredPosts, city, area, facillityName, mediaData, nearbyPostsData }) {

    //console.log('mediaData', mediaData);

    return (
        <>

        facillityNamePage
        <h3>
            <Link href="/">ホーム</Link>
            {">"}
            <Link href={`/place/`}>葬儀一覧</Link>
            {">"}
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
                        <Link href={`/place/${post.acf.address.address_prefecture}/${post.acf.address.address_city}/${post.title.rendered}`} className={styles.homePlace}>
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

        // getMediaData関数を呼ぶ
        const mediaData = await getMediaData(filteredPosts);
        // console.log('mediaData', mediaData);


        // getNearbyPosts関数を呼ぶ
        const nearbyPostsData = await getNearbyPosts(allPostsData, city, area);


        return {
            props: {
            filteredPosts,
            nearbyPostsData,
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
                nearbyPostsData: [],
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