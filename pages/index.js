import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import Top from './componetns/top';

// const inter = Inter({ subsets: ['latin'] })

export default function Home( {posts, mediaData, allPostsData} ) {

  return (
    <>
      <Top posts={posts} mediaData={mediaData} allPostsData={allPostsData} />
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


// getAllPostsData関数を追加
async function getAllPostsData() {
  // ここにgetAllPostsData関数の中身を追加
  // すべての記事を格納するための配列
  const allPosts = [];
  // ページ数を管理する変数
  let currentPage = 1;

  // 無限ループ
  while (true) {
    try {
      // REST APIへのリクエスト
      //const response = await fetch(`http://funeralmedia.local/wp-json/wp/v2/place?per_page=1&page=${currentPage}&_fields=id,acf.address.address_city,acf.address.address_prefecture`, {
      const response = await fetch(`http://funeralmedia.local/wp-json/wp/v2/place?_embed&per_page=1&page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 取得したデータをJSON形式に変換
      const responseData = await response.json();

      // 取得したデータが空の場合、ページに記事がないと判断してループ終了
      if (responseData.length === 0) {
        console.log('No more pages. Exiting...');
        break;
      }

      // 取得した記事をallPostsに追加
      allPosts.push(...responseData);

      // ページ数を増やす
      currentPage++;
    } catch (error) {
      // エラーが発生した場合の処理
      console.error('Error in request:', error);

      // エラーが発生したら終了
      break;
    }
  }

  // すべての記事をコンソールに出力
  //console.log('All posts:', allPosts);

  // ページが呼び出されたときにpropsとして記事を返す
  return allPosts;
}