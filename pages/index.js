import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
// import Top from './componetns/Top';
import { getAllPostsData } from '@/libs/place/getAllPostsPlaceData';

// const inter = Inter({ subsets: ['latin'] })

export default function Home( {posts, mediaData, allPostsData} ) {

  return (
    <>
            <Head>
                <title>test</title>
            </Head>

            <h3>東京都の市区町村から探す</h3>
            <div className="homeCity">
                {allPostsData.map((post) => (

                <div key={post.id}>
                    <Link href={`place/${post.acf.address.address_prefecture}/${post.acf.address.address_city}`}>{post.acf.address.address_city}</Link>
                </div>
                ))}
            </div>

                {/* <h3>東京都の市区町村から探す</h3>
                {posts.map((post) => (
                <div key={post.id}>
                    <div>{post.acf.address.address_city}</div>
                </div>
                ))} */}

                {/* フェッチしたデータをマップして表示 */}
                <h3>東京都の葬儀場情報</h3>
                {posts.map((post, index) => (
                <Link href={`place/${post.acf.address.address_prefecture}/${post.acf.address.address_city}/${post.title.rendered}`} className={styles.homePlace} key={post.id}>
                    {/* 画像表示 */}
                    {mediaData[index] ? (
                    <img src={mediaData[index].source_url} alt={mediaData[index].alt_text} />
                    ) : (
                    <p>メディアがありません</p>
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

        </>
  )
}


//SSG実装
export async function getStaticProps() {
  try {
    // 全体取得関数 place 東京エリア 1ページ目 WP上限100記事まで
    const res = await fetch("http://funeralmedia.local/wp-json/wp/v2/place?_embed&page=1&per_page=10&area=98");
    const posts = await res.json();

    // posts.map(post => {
    //   post._embedded['wp:term'].map(wpTerm => {
    //       const wpTermIds = wpTerm.map(wpTermId => wpTermId.id);
          
    //       // 最小のwpTermIdを取得
    //       const minWpTermId = Math.min(...wpTermIds);
          
    //       console.log(minWpTermId);

    //   });
    // });


    // 各記事の featured_media を取り出して、それぞれのメディア情報を取得
    const mediaPromises = posts.map(async (post) => {
      if (post.featured_media) {
        const mediaRes = await fetch(`http://funeralmedia.local/wp-json/wp/v2/media/${post.featured_media}`);
        const media = await mediaRes.json();
        return media;
      }
      return null;
    });

    // メディア情報の取得が完了するまで待つ
    const mediaData = await Promise.all(mediaPromises);


    // getAllPostsData関数を呼び出し、結果をpropsとして返す
    const allPostsData = await getAllPostsData();

    //cnosole.log(posts);
    
    return {
      props: {
        posts,
        mediaData,
        allPostsData,
      },
    };
  } catch (error) {
    console.error('データの取得エラー:', error);

    return {
      props: {
        posts: [],
        mediaData: [],
        allPostsData: [],
      },
    };
  }
}