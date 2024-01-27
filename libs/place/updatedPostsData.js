// getAllPostsSlugDataにareaのslugを付与する関数

export async function updatedPostsData(beforeUpdatePostsData, getAllPostsSlugData) {
  
    // IdとSlugオブジェクトの作成
    const postIdSlug = getAllPostsSlugData.map((post) => ({
      id: post.id,
      slug: post.slug,
      name: post.name,
      parent: post.parent,
      //parentSlug: getParentSlug(post.parent, getAllPostsSlugData),
    }));

    console.log('postIdSlug', postIdSlug);

    // idとslug情報を入れて、allPostsDataを更新する
    const updatedPostsData = beforeUpdatePostsData.map((post) => {
      const filteredArea = post.area
        .map((id) => postIdSlug.find((p) => p.id === id))
        .filter(areaData => areaData && areaData.parent !== 0); // parentが0でないものだけを抽出

      return {
        ...post,
        area: filteredArea.map(areaData => ({
          id: areaData.id,
          slug: areaData.slug,
          name: areaData.name,
          parent: areaData.parent,
          parentSlug: areaData.parent === 0 ? '' : postIdSlug.find((p) => p.id === areaData.parent).slug,
          parentName: areaData.parent === 0 ? '' : postIdSlug.find((p) => p.id === areaData.parent).name,
        })),
      };
    });

    //console.log('updatedPostsData', updatedPostsData);
    const areaData = updatedPostsData.map((post) => (post.area));
    console.log('areaData', areaData);

    return updatedPostsData;
  }