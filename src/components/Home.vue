<template>
  <div>
    <h1 class="title">
      {{ title }}
      <br />
      <font-awesome-icon icon="spinner" spin />
    </h1>
    <div id="p5Canvas"></div>
  </div>
</template>

<script>
import sketch from "@/static/js/backgroundHome";
import constMixin from "@/mixins/ConstMixin";

export default {
  mixins: [constMixin],
  name: "Home",
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
