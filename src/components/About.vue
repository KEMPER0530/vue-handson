<template>
  <div class="about" align="center">
    <h2>Profile</h2>
    <img src="../static/img/mark-profile.svg" class="about" />
    <p>転職活動中</p>
    <p>Sier出身ですが、WEB業界に行きたい36歳です。</p>
    <p>Sierとしては金融機関向けの業務アプリの開発を実施しています。</p>
    <p>マネージャー、リーダー業務しか実施していないので、最近は勉強会に行ったり、</p>
    <p>自分でプログラミングしたり、AWSを触ったりしております。</p>
    <p>このアプリもAWS上で稼働しています。</p>
    <br />
    <h2>このアプリで実装していること</h2>
    <p>2019.11.1時点</p>
    <ul class="list-group" style="max-width: 400px;">
      <li class="list-group-item">ログイン機能</li>
      <li class="list-group-item">カウンター機能、メンバー整列機能</li>
      <li class="list-group-item">vue-routerの利用</li>
      <li class="list-group-item">
        vuexを利用したログイン状態の管理、
        <br />メンバー整列状態の管理
      </li>
      <li class="list-group-item">topページをp5でビジュアルコーディング</li>
      <li class="list-group-item">ぐるなびAPIを利用したお店検索機能</li>
    </ul>
  </div>
</template>
<style lang="scss">
// プロフィール用のscss読込
@import "@/static/scss/about.scss";
</style>
