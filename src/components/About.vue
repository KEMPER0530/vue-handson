<template>
  <div class="about" align="center">
    <h2>Profile</h2>
    <img src="../static/img/mark-profile.svg" class="about" decoding="async" />
    <p>転職活動中</p>
    <p>Sier出身ですが、WEB業界に行きたい36歳です。</p>
    <p>Sierとしては金融機関向けの業務アプリの開発を実施しています。</p>
    <p>最近はVue、Goでアプリ開発したりAWSを触ったりしております。</p>
    <p>このアプリもAWS上で稼働しています。</p>
    <br />
    <h2>このアプリで実装していること</h2>
    <p>2019.11.16時点</p>
    <ul class="list-group" style="max-width: 400px;">
      <li class="list-group-item">
        バックエンドをGoで作成し、APIでデータ取得を実施
        <span class="badge badge-danger badge-pill">new</span>
      </li>
      <li class="list-group-item">
        ぐるなびAPIを利用したお店検索機能
      </li>
      <li class="list-group-item">
        WORK画面の更新
      </li>
      <li class="list-group-item">topページをp5でビジュアルコーディング</li>
      <li class="list-group-item">vue-routerの利用</li>
      <li class="list-group-item">bootstrap4を利用し、見栄え整理</li>
      <li class="list-group-item">
        vuexを利用したログイン状態の管理、
        <br />メンバー整列状態の管理
      </li>
      <li class="list-group-item">ログイン機能(SAMPLE押下時に遷移)</li>
      <li class="list-group-item">カウンター機能、メンバー整列機能</li>
    </ul>
  </div>
</template>
<style lang="scss">
// プロフィール用のscss読込
@import '@/static/scss/about.scss';
</style>
