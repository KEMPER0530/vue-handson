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
import firebase from "firebase";

export default Vue.extend({
  name: "App",
  components: {
    Header
  },
  data: () => ({}),
  created() {
    // FirebaseJWT用トークン生成
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
  mounted() {
  }
});
</script>
<style lang="scss">
// ヘッダー用のscss読込
@import "@/static/scss/common.scss";
</style>
