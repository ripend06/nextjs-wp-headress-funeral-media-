import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
// import Top from './componetns/Top';
import { getAllPostsData } from '@/libs/place/getAllPostsPlaceData';
import { getPrefecturePost } from '@/libs/place/getPrefecturePost';


export default function Home( {allPostsData, prefecturePostsData} ) {

  return (
    <>
            <Head>
                <title>test</title>
            </Head>

            <h3>東京都の市区町村から探す</h3>
            <div className="homeCity">
            {allPostsData
            .filter((post, index, self) => self.findIndex(p => p.acf.address.address_city === post.acf.address.address_city) === index)
            .map(post => (
              <div key={post.id}>
                <Link href={`/place/${post.acf.address.address_prefecture}/${post.acf.address.address_city}`}>
                  {post.acf.address.address_city}
                </Link>
              </div>
            ))}
            </div>


            <h3>東京都の葬儀場情報</h3>
            {prefecturePostsData.map((post) => (
            <Link href={`place/${post.acf.address.address_prefecture}/${post.acf.address.address_city}/${post.title.rendered}`} className={styles.homePlace} key={post.id}>
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

        </>
  )
}


//SSG実装
export async function getStaticProps() {
  try {
    // getPrefecturePost関数呼び出し
    const prefecturePostsData = await getPrefecturePost(98,4);

    // getAllPostsData関数を呼び出し
    const allPostsData = await getAllPostsData();

    return {
      props: {
        prefecturePostsData,
        allPostsData,
      },
    };
  } catch (error) {
    console.error('データの取得エラー:', error);

    return {
      props: {
        prefecturePostsData: [],
        allPostsData: [],
      },
    };
  }
}