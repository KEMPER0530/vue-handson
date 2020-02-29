<template>
  <div id="app">
    <Header />
    <br />
    <router-view />
    <!-- <Fotter /> -->
  </div>
</template>

<script>
import Vue from "vue";
import Header from "@/components/Header";
import Home from "@/components/Home";
import Counter from "@/components/Counter";
import Fotter from "@/components/Fotter";

export default Vue.extend({
  name: "App",
  components: {
    Header,
    Fotter,
    Counter
  },
  created() {
    
  },
  data: () => ({})
});
</script>
<style lang="scss">
// ヘッダー用のscss読込
@import "@/static/scss/common.scss";
</style>
