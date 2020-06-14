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
    <b-container fluid>
      <b-row align-v="start">
        <b-col>
          <div id="firebaseui-auth-container"></div>
        </b-col>
      </b-row>
      <br />
    </b-container>
    <b-container>
      <b-row align-v="end">
        <b-col md="6" offset-md="3">
          <b-button variant="outline-danger" block pill @click="onBack()"
            >戻る</b-button
          >
        </b-col>
      </b-row>
    </b-container>
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
      result: false
    };
  },
  mounted() {
    const vm = this;
    // SMSインプットモードオン
    vm.$store.dispatch("changeSmsInputON");
    // firebase設定
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        uiShown() {},
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          const { isNewUser } = authResult.additionalUserInfo;
          const { displayName } = authResult.user;
          const { photoURL } = authResult.user;
          const nextpage = vm.$route.query.redirect;
          const user = {
            displayName,
            photoURL
          };

          firebase
            .auth()
            .currentUser.updateProfile(user)
            .then(res => {
              vm.$store.dispatch("changeSmsLogin");
              vm.$store.dispatch("changeSmsInputOFF");
              vm.$router.push(nextpage).catch(e => {});
            });
        },
        signInFailure(error) {
          vm.data.errored = true;
          vm.$store.dispatch("changeSmsInputOFF");
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
  methods: {
    onBack() {
      this.$store.dispatch("changeSmsLogoff");
      this.$store.dispatch("changeSmsInputOFF");
      this.$store.dispatch("changeLogoff").then(() => {
        window.sessionStorage.removeItem("vuex");
        this.$router.go(-1);
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/static/scss/login.scss";
@import "@/static/scss/common.scss";
</style>
