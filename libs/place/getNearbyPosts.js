// 近くの葬儀場ソート

export async function getNearbyPosts(allPostsData, city, area) {
    // 現在の葬儀場のcityでソート
    const filteredCityPosts = allPostsData.filter(post => post.area[0].slug === city);

    let combinedPosts = filteredCityPosts;

    // cityでフィルタリングされた投稿が４つ未満の場合
    if (filteredCityPosts.length < 4) {
        // areaでフィルタリング
        const filteredAreaPosts = allPostsData.filter(post => post.area[0].parentSlug === area);

        // filteredAreaPostsから足りない数を取得
        const remainingPosts = 4 - filteredCityPosts.length;

        // filteredCityPostsとadditionalPostsを結合
        combinedPosts = filteredCityPosts.concat(filteredAreaPosts.slice(0, remainingPosts));


        // 結合した投稿を表示
        //console.log('combinedPosts', combinedPosts);
        //console.log('４つ未満です');
        // console.log('filteredCityPostsLength', filteredCityPosts.length);
        // console.log('remainingPosts', remainingPosts);
        // console.log('filteredAreaPosts', filteredAreaPosts)
        // console.log('combinedPostsClice', filteredAreaPosts.slice(0, remainingPosts));

        return combinedPosts.slice(0, 4); // 最終的に4つまで表示


    } else {
        // filteredCityPostsが４つ以上ある場合、４つ表示
        //console.log('４つ以上です');
        //console.log('filteredCityPosts', filteredCityPosts);

        return filteredCityPosts.slice(0, 4); // 最終的に4つまで表示
    }

    //return combinedPosts;
}
