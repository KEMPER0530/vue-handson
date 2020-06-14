<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="samuraiblue">
      <b-navbar-brand v-if="smsInputMode === false" to="/">
        {{ title }}
        <span v-if="logged_in">
          <font-awesome-icon icon="sign-in-alt" />
        </span>
      </b-navbar-brand>
      <b-navbar-brand>
        <span v-if="logged_in" class="mgl-20 login_name">{{
          $store.getters.getLogin_name
        }}</span>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            v-if="smsInputMode === false"
            to="/profile"
            :prop1="propVal"
          >
            <span class="mgr-3">
              <font-awesome-icon icon="user-circle" />
            </span>
            Profile
          </b-nav-item>
          <b-nav-item v-if="smsInputMode === false" to="/work">
            <span class="mgr-3">
              <font-awesome-icon icon="wrench" />
            </span>
            Work
          </b-nav-item>
          <!-- <b-nav-item to="/counter">カウンター機能</b-nav-item> -->
          <b-nav-item v-if="smsInputMode === false" to="/paycard">
            <span class="mgr-3">
              <font-awesome-icon icon="credit-card" />
            </span>
            CardRegist
          </b-nav-item>
          <b-nav-item v-if="smsInputMode === false" to="/newsjp">
            <span class="mgr-3">
              <font-awesome-icon icon="newspaper" />
            </span>
            NewsAPI
          </b-nav-item>
          <b-nav-item v-if="smsInputMode === false" to="/contact">
            <span class="mgr-3">
              <font-awesome-icon icon="envelope" />
            </span>
            Contact
          </b-nav-item>
          <b-nav-item v-if="smsInputMode === false" to="/gmap">
            <span class="mgr-3">
              <font-awesome-icon icon="map" />
            </span>
            GoogleMap
          </b-nav-item>
          <b-button
            v-if="logged_in"
            size="sm"
            class="my-2 my-sm-0"
            @click="logout"
            >LOGOUT</b-button
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "Header",
  components: {},
  data() {
    return {
      title: "",
      login_name: "",
      github: process.env.VUE_APP_GITHUB_URL,
      propVal: this.pmsg
    };
  },
  computed: {
    logged_in() {
      return this.$store.getters.getAuthSms;
    },
    smsInputMode() {
      return this.$store.getters.getSmsInputMode;
    }
  },
  created() {
    this.title = this.$store.getters.getTitle;
  },
  methods: {
    logout() {
      this.$store.dispatch("changeSmsLogoff");
      this.$store.dispatch("changeSmsInputOFF");
      this.$store.dispatch("changeLogoff").then(() => {
        window.sessionStorage.removeItem("vuex");
        this.$router.push("/").catch(() => {});
      });
    }
  }
};
</script>
<style lang="scss">
// ヘッダー用のscss読込
@import "@/static/scss/header.scss";
@import "@/static/scss/common.scss";
</style>
