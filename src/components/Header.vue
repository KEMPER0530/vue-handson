<template>
  <div class="header">
    <h3>This is Vue Sample</h3>
    <ul>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/main">サンプルカウンター</router-link>
      </li>
    </ul>
  </div>
</template>
<script></script>
<style lang="scss">
// ログイン用のscss読込
@import "@/static/scss/header.scss";
</style>
