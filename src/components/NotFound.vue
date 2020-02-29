<template>
  <div>
    <div class="wrap">
      <div class="logo">
        <p>お探しのページはみつかりません。</p>
        <img :src="NotFoundImage" />
        <div class="sub">
          <p>
            <a :href="moveTop">Top</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      NotFoundImage: process.env.VUE_APP_IMAGE_PATH_NOTFOUND
    };
  },
  methods: {
    moveTop() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss">
@import "@/static/scss/404.scss";
@import "@/static/scss/common.scss";
</style>
