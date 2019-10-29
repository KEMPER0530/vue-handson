<template>
  <div class="header">
    <h3 v-if="loggedin">
      This is Vue Sample
      <span>
        <img src="@/static/img/mark-login.svg" title="login" width="40" height="40" />
      </span>
    </h3>
    <h3 v-else>This is Vue Sample</h3>
    <ul>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li v-if="loggedin">ログイン</li>
      <li v-else>
        <router-link to="/login">ログイン</router-link>
      </li>
      <li>
        <router-link to="/main">サンプルカウンター</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    loggedin() {
      if (this.$store.getters.getAuth) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style lang="scss">
// ログイン用のscss読込
@import "@/static/scss/header.scss";
</style>
