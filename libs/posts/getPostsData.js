// POSTの最新４つのデータを取得
export async function getPostsData() {
    try {
      const responsePosts = await fetch('https://kansha-ososhiki.com/wp-json/wp/v2/posts?_embed&per_page=4&page=1&_fields=title,id,excerpt,_links,_embedded&_embed');
      const postsData = await responsePosts.json();
  
      //console.log("Latest Four Items:", postsData);
  
      return postsData;
  
    } catch (error) {
      console.error("Error fetching news data:", error);
      return []; // エラー時は空の配列を返す
    }
  }

