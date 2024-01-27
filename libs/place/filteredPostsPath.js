//現在の動的ルーティングpathとupdatedAllPostsDataのスラッグと同じものをソートする関数

export async function filteredPostsPath(updatedAllPostsDataB, areaFilter, parentKey) {

    // const filteredPosts = updatedAllPostsData.map((post) => ({
    //     ...post,
    //     area: post.area.filter((areaObj) => areaObj.slug === params.area),
    // }));

    //console.log('filteredPosts', filteredPosts);

    // updatedAllPostsDataBからparentが0かつslugがparams.areaと一致するものを取り出す
    // const filteredPosts = updatedAllPostsDataB
    // .filter((post) =>
    //   post.area.some((area) => slugFillter === areaFillter)
    // );
    //console.log('filteredPosts:', filteredPosts);

    const filteredPosts = updatedAllPostsDataB
      .filter((post) =>
          post.area.some((area) => area[parentKey] === areaFilter)
      );

    return filteredPosts;
}