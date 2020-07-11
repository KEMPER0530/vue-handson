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
    // FirebaseMessagin用設定
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey(process.env.VUE_APP_FIREBASE_USE_PUBLIC_VAPID_KEY);

    // 通知の受信許可
    Notification.requestPermission().then( permission => {
      console.log('Notification permission granted.');
      // トークン取得
      return messaging.getToken();
    })
    .then( token => {
      console.log(`Messaging Token: ${token}`);
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });

    // トークン更新のモニタリング
    messaging.onTokenRefresh(() => {
        this.messaging.getToken().then((refreshedToken) => {
            console.log('Messaging Token refreshed.', refreshedToken);
        }).catch((err) => {
            console.log('Unable to retrieve refreshed token ', err);
        });
    });

    // フォアグラウンドでのメッセージ受信
    messaging.onMessage(function(payload) {
      alert(payload);
    });
  },
  mounted() {
  }
});
</script>
<style lang="scss">
// ヘッダー用のscss読込
@import "@/static/scss/common.scss";
</style>
