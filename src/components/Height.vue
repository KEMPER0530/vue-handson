<template>
  <div class="d-flex flex-column">
    <div class="pt-2 mx-auto list-row">
      <!-- <router-link :to="`/member/:${data.id}`"> -->
      <div :class="color">
        {{ data.name }} #{{ data.id }}/{{ data.position }}/身長{{ data.height }}
      </div>
      <!-- </router-link> -->
    </div>
    <div class="p-0 mx-sm-auto">
      <div class="float-right">
        <b-button variant="outline-danger" @click="changeHeight(-1)"
          >-</b-button
        >
        <b-button variant="outline-primary" @click="changeHeight(1)"
          >+</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    id: Number
  },
  // eslint-disable-line
  // コンポーネント `data` オプションは関数を必要する
  data() {
    return {
      heightValue: this.data.height
    };
  },
  computed: {
    color() {
      const height = this.heightValue;
      if (height < 170) {
        return "bg-danger text-white";
      }
      if (height >= 170 && height < 180) {
        return "bg-primary text-white";
      }
      return "bg-success text-white";
    }
  },
  methods: {
    changeHeight(value) {
      this.heightValue = this.heightValue + value;
      this.$emit("changeHeight", this.id, this.heightValue);
    }
  }
};
</script>
<style lang="scss">
// ログイン用のscss読込
@import "@/static/scss/height.scss";
</style>
