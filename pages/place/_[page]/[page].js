import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { React } from "react";
//import Top from 'inedx';


function page({ allPostsData, area, currentPage, totalPages }) {

  const postsPerPage = 8;

    console.log('currentPage:',currentPage);
    console.log('totalPages:',totalPages);
    //console.log(allPostsData);
    //console.log(totalPages);
    // console.log(Math.ceil(allPostsData.filter(post => post.acf.address.address_prefecture === area).length));

    const startIdx = (currentPage - 1) * postsPerPage;
    const endIdx = startIdx + postsPerPage;
    const displayedPosts = allPostsData
      .filter(post => post.acf.address.address_prefecture === area)
      .slice(startIdx, endIdx);
    

    return (
        <>

            idPage
            {/* <div>{area}</div> */}
            <h3>{area}東京都の葬儀場情報</h3>
            {/* {allPostsData
            .filter(post => post.acf.address.address_prefecture === area)
            .map((post) => ( */}
            {displayedPosts.map((post) => (
            <Link href={`place/${post.acf.address.address_prefecture}/${post.acf.address.address_city}/${post.title.rendered}`} className={styles.homePlace} key={post.id}>
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

export default page;


//SSG実装
export async function getStaticProps(context) {
    try {

        //const area = context.params.area;

        const currentPage = context.params.page ? parseInt(context.params.page, 10) : 1;
        console.log(context.params);
  
  
      // getAllPostsData関数を呼び出し、結果をpropsとして返す
      const allPostsData = await getAllPostsData();
        //console.log(allPostsData);
      
      return {
        props: {
          allPostsData,
          area,
          currentPage,
          totalPages: Math.ceil(allPostsData.filter(post => post.acf.address.address_prefecture === area).length / 8),
        },
      };
    } catch (error) {
      console.error('propsデータの取得エラー:', error);
  
      return {
        props: {
          allPostsData: [],
          area: [],
          currentPage: 1,
          totalPages: 0,
        },
      };
    }
  }



//getStaticPaths 関数の追加
export async function getStaticPaths() {
    try {
      // データを取得するロジック（WordPress の REST API を使用する例）
    //   const res = await fetch("http://funeralmedia.local/wp-json/wp/v2/place?page=1&per_page=10");
    //   const posts = await res.json();

    // getAllPostsData関数を呼び出し、結果をpropsとして返す
    const allPostsDataA = await getAllPostsData();
  
      // 有効な area の値のリストを生成
      // const paths = allPostsDataa.map((post) => ({
      //   params: {
      //     area: post.acf.address.address_prefecture.toString(), // パラメータは文字列である必要があります
      //     //page: (index + 1).toString(),
      //   },
      // }));

      const paths = allPostsDataA.flatMap((post) => {
        const totalPages = Math.ceil(allPostsDataA.filter(item => item.acf.address.address_prefecture === post.acf.address.address_prefecture).length / 8);
        return Array.from({ length: totalPages }, (_, index) => ({
          params: {
            page: (index + 1).toString(), // ページ番号を指定
            //area: post.acf.address.address_prefecture.toString(),
          },
        }));
      });


      //console.log(paths);
    //   console.log(totalPages);

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