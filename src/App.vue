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
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
