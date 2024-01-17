// 近くの葬儀場ソート

export async function getNearbyPosts(allPostsData, city, area) {
    // 現在の葬儀場のcityでソート
    const filteredCityPosts = allPostsData.filter(post => post.acf.address.address_city === city);

    let combinedPosts = filteredCityPosts;

    // cityでフィルタリングされた投稿が４つ未満の場合
    if (filteredCityPosts.length < 4) {
        // areaでフィルタリング
        const filteredAreaPosts = allPostsData.filter(post => post.acf.address.address_prefecture === area);

        // filteredAreaPostsから足りない数を取得
        const remainingPosts = 4 - filteredCityPosts.length;

        // filteredCityPostsとadditionalPostsを結合
        combinedPosts = filteredCityPosts.concat(filteredAreaPosts.slice(0, remainingPosts));

        // 結合した投稿を表示
        //console.log('combinedPosts', combinedPosts);
        // console.log('４つ未満です');
        // console.log('filteredCityPostsLength', filteredCityPosts.length);
        // console.log('remainingPosts', remainingPosts);
        // console.log('filteredAreaPosts', filteredAreaPosts)
        // console.log('combinedPostsClice', filteredAreaPosts.slice(0, remainingPosts));
    } else {
        // filteredCityPostsが４つ以上ある場合、そのまま表示
        //console.log('filteredCityPosts', filteredCityPosts);
    }

    return combinedPosts;
}
