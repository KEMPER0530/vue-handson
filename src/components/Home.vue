<template>
  <div>
    <h1 class="title">
      {{ title }}
      <br />
      <font-awesome-icon icon="spinner" spin />
      <!-- <b-button
        block
        pill
        to="/covid-19"
        variant="outline-danger"
        target="_blank"
        >COVID-19 感染状況</b-button
      > -->
    </h1>
    <div id="p5Canvas"></div>
  </div>
</template>

<script>
import sketch from "@/static/js/backgroundHome";
import constMixin from "@/mixins/ConstMixin";

export default {
  name: "Home",
  mixins: [constMixin],
  mounted() {
    const backgroundHome = sketch();
    const P5 = require("p5");
    new P5(backgroundHome, "p5Canvas");
  }
};
</script>

<style lang="scss">
// ヘッダー用のscss読込
@import "@/static/scss/home.scss";
@import "@/static/scss/common.scss";
</style>
