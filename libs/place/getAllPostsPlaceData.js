export async function getAllPostsData() {
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