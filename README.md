This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## 保守注意点
- ①カスタムタクソノミーのエリア追加は、都道府県とエリア両方必ず記載する
- ②カスタムタクソノミーのエリア追加は、大項目から小項目を追加する
    - 都道府県から追加して、エリア追加する
    - 例）東京都、練馬区の順に
        - カスタムタクソノミーIDが都道府県の方を若い数字にする
- ③カスタムフィールドの、都道府県、市町村は必ず記載する
- ④カスタム投稿タイプと、カスタムタクソノミーのRESTAPIをtrueにする
```
// カスタム投稿タイプの登録
$place_args = array(
	'show_in_rest' => true, // ここに追加します
);
register_post_type( apply_filters( 'news_post_type', 'place' ), apply_filters( 'news_post_type_args', $place_args ));

// カスタム投稿タイプのタクソノミー登録
add_action( 'init', 'place_taxonomies', 0 );
function place_taxonomies() {
register_taxonomy(
array( 'hierarchical' => true,
      'show_in_rest' => true,// ここに追加します
),
);
}
```
##　デプロイについて
・WPRESTAPI　Onにする
    ・https://github.com/asucreation/funeral-media/commit/9eb3cd2fc59a88300382fd228459fbadb67cec6d
・ACFも　Onにする
    ・ACFプラグイン管理画面より
・XserverのRESTAPI制限　Offにする
　　・Xserver管理画面より