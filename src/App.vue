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
import firebase from "firebase";

export default Vue.extend({
  name: "App",
  components: {
    Header,
    Fotter,
    Counter
  },
  created() {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        process.env.VUE_APP_FIREBASE_EMAIL,
        process.env.VUE_APP_FIREBASE_PASS
      )
      .then(
        res => {
          res.user.getIdToken(/* forceRefresh */ true).then(idToken => {
            sessionStorage.setItem("jwt", idToken.toString());
          });
        },
        err => {
          alert(err.message);
        }
      );
  },
  data: () => ({})
});
</script>
<style lang="scss">
// ヘッダー用のscss読込
@import "@/static/scss/common.scss";
</style>
