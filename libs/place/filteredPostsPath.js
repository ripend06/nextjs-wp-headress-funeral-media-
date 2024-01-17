//現在の動的ルーティングpathとupdatedAllPostsDataのスラッグと同じものをソートする関数

import { updatedAllPostsData } from "./updatedAllPostsData";

export async function filteredPostsPath() {

    const filteredPosts = updatedAllPostsData.map((post) => ({
        ...post,
        area: post.area.filter((areaObj) => areaObj.slug === params.area),
    }));

    //console.log('filteredPosts', filteredPosts);

    return filteredPosts;
}