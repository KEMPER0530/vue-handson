<template>
  <div>
    <Height :id="data.id" :data="data" @changeHeight="changeHeight" />
  </div>
</template>

<script>
import Height from "@/components/Height";

export default {
  components: {
    Height
  },
  props: {
    data: Object
  },
  methods: {
    changeHeight(id, value) {
      this.$emit("changeHeightApp", id, value);
    }
  }
};
</script>

<style></style>
