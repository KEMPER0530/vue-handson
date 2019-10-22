<template>
  <div>
    <Header />
    <router-view />
    <Fotter />
  </div>
</template>

<script>
import Vue from "vue";
import Header from "@/components/Header";
import Fotter from "@/components/Fotter";

export default Vue.extend({
  name: "App",
  components: {
    Header,
    Fotter
  },
  data: () => ({})
});
</script>
