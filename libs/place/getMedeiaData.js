// フィルターされた記事からメディア情報を取得する関数
export async function getMediaData(filteredPosts) {
    try {
      const mediaPromises = filteredPosts.flatMap(async (post) => {
        const nonEmptyValues = Object.values(post.acf.img_slider).filter((value) => value !== '');
  
        // 各非空のメディアIDに対してfetchを行う
        const mediaPromises = nonEmptyValues.map(async (mediaId) => {
            const mediaRes = await fetch(`http://funeralmedia.local/wp-json/wp/v2/media/${mediaId}?_fields=guid,id`);
            return mediaRes.json();
        });
  
        // メディア情報の取得が完了するまで待つ
        return Promise.all(mediaPromises);
      });
  
      // フラット化して一括でメディア情報を取得
      const mediaData = await Promise.all(mediaPromises.flat());
  
      console.log('Media Data for non-empty img_slider values:', mediaData);
  
      return mediaData;
    } catch (error) {
      console.error('Error fetching media data:', error);
      throw error;
    }
  }