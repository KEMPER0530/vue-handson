<template>
  <div>
    <!-- <Height :id="data.id" :data="data" @changeHeight="changeHeight" /> -->
    <!-- <Height :id="data.id" :data="data" /> -->
    <Height :id="data.id" :data="data" @sortHeight="sortHeight" />
  </div>
</template>

<script>
import Height from "@/components/Height";

export default {
  components: {
    Height
  },
  props: {
    id: Number,
    data: Object
  },
  // data() {
  //   return {
  //     data: this.$store.getters.getMember
  //   };
  // }
  methods: {
    sortHeight() {
      this.$emit("sortHeight");
    }
  }
};
</script>

<style></style>
