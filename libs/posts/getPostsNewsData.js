// NEWS POSTの最新４つのデータを取得
export async function getPostsNewsData() {
    try {
      const responseNews = await fetch('https://kansha-ososhiki.com/wp-json/wp/v2/news?per_page=4&page=1&_fields=date,title,id,link');
      const responsePosts = await fetch('https://kansha-ososhiki.com/wp-json/wp/v2/posts?per_page=4&page=1&_fields=date,title,id,link');
      const newsData = await responseNews.json();
      const postsData = await responsePosts.json();
  
      // ニュースの各エントリから日付とタイトルを取得して1つのオブジェクトにまとめる
      const newsItems = newsData.map(newsItem => ({
        date: formatDate(new Date(newsItem.date)),
        title: newsItem.title.rendered,
        id: newsItem.id,
        link: newsItem.link,
        cate: "ニュース",
      }));
      const postsItems = postsData.map(postsItem => ({
        date: formatDate(new Date(postsItem.date)),
        title: postsItem.title.rendered,
        id: postsItem.id,
        link: postsItem.link,
        cate: "コラム",
      }));

      //console.log("newsItems:", newsItems);
      //console.log("postsItems:", postsItems);
  
      // newsItemsとpostsItemsを結合し、日付でソート
      const allItems = [...newsItems, ...postsItems];
      allItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      // 最新の4つのエントリのみを取得
      const latestFourItems = allItems.slice(0, 4);
  
      //console.log("Latest Four Items:", latestFourItems);
  
      return latestFourItems;
  
    } catch (error) {
      console.error("Error fetching news data:", error);
      return []; // エラー時は空の配列を返す
    }
  }
  
  // 2024/2/6 の形式に日付をフォーマットする関数
  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため、1を加える
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  }
