import { getAllPostsData } from "./getAllPostsPlaceData";
import { getAllPostsSlugData } from "./getAllPostsSlugData";


// getAllPostsSlugDataにareaのslugを付与する関数

export async function updatedAllPostsData() {
    // getAllPostsSlugData関数を呼ぶ
    const getAllPostsSlugDataB = await getAllPostsSlugData();
  
    // IdとSlugオブジェクトの作成
    const postIdSlug = getAllPostsSlugDataB.map((post) => ({
      id: post.id,
      slug: post.slug,
      // name: post.name,
      // parent: post.parent
    }));

    console.log('postIdSlug', postIdSlug);
  
    // idとslug情報を入れて、allPostsDataを更新する
    const updatedAllPostsData = getAllPostsData.map((post) => ({
      ...post,
      area: post.area.map((id) => ({
        id: id,
        slug: postIdSlug.find((p) => p.id === id).slug
      })),
    }));

    // const areaData = updatedAllPostsData.map((post) => (post.area));
    // console.log('', areaData);


    return updatedAllPostsData;
  }
