<template>
  <div class="container">
    <section v-if="errored">
      <p>
        <span class="text-danger">{{ errorMsg }}</span>
      </p>
    </section>
    <h4 align="center">
      アカウント確認のために
      <br />SMS認証を行います
    </h4>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>
<script>
import store from "@/store";
import constMixin from "@/mixins/ConstMixin";
import firebase from "firebase";
import firebaseui from "firebaseui-ja";
require("firebaseui-ja/dist/firebaseui.css");

export default {
  name: "AuthSms",
  data() {
    return {
      errored: false,
      result: false,
    };
  },
  mounted() {
    const vm = this;
    let ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        uiShown: function() {},
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          let isNewUser = authResult.additionalUserInfo.isNewUser;
          let displayName = authResult.user.displayName;
          let photoURL = authResult.user.photoURL;
          let nextpage = vm.$route.query.redirect;
          let user = {
            displayName: displayName,
            photoURL: photoURL
          };

          firebase
            .auth()
            .currentUser.updateProfile(user)
            .then(res => {
              vm.$store.dispatch("changeSmsLogin");
              vm.$router.push(nextpage).catch(e => {});
            });
        },
        signInFailure: function(error) {
          vm.data.errored = true;
          vm.$router.push("/").catch(e => {});
        }
      },
      autoUpgradeAnonymousUsers: true,
      signInFlow: "redirect",
      // signInSuccessUrl: '/createacount',
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: "JP",
          whitelistedCountries: ["JP", "+81"]
        }
      ]
    });
  },
};
</script>
<style lang="scss">
@import "@/static/scss/common.scss";
</style>
