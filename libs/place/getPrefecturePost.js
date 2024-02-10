// 都道府県ソート関数
// maxNumで取得数ソート。areaでエリアソート

export async function getPrefecturePost(area, maxNum) {
    const res = await fetch(`https://kansha-ososhiki.com/wp-json/wp/v2/place?_embed&page=1&per_page=${maxNum}&area=${area}`);
    const posts = await res.json();
    return posts;
}