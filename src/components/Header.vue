<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="samuraiblue">
      <b-navbar-brand to="/">
        {{ title }}
        <span v-if="loggedin">
          <font-awesome-icon icon="sign-in-alt" />
        </span>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/profile">
            <span class="mgr-3">
              <font-awesome-icon icon="user-circle" />
            </span>
            Profile
          </b-nav-item>
          <b-nav-item to="/work">
            <span class="mgr-3">
              <font-awesome-icon icon="wrench" />
            </span>
            Work
          </b-nav-item>
          <!-- <b-nav-item to="/counter">カウンター機能</b-nav-item> -->
          <b-nav-item to="/paycard">
            <span class="mgr-3">
              <font-awesome-icon icon="credit-card" />
            </span>
            CardRegist
          </b-nav-item>
          <b-nav-item to="/gnavi">
            <span class="mgr-3">
              <font-awesome-icon icon="utensils" />
            </span>
            Gurunavi
          </b-nav-item>
          <b-nav-item to="/contact">
            <span class="mgr-3">
              <font-awesome-icon icon="envelope" />
            </span>
            Contact
          </b-nav-item>
          <b-button size="sm" class="my-2 my-sm-0" @click="logout" v-if="loggedin">LOGOUT</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  components: {},
  data() {
    return {
      title: "",
      github: process.env.VUE_APP_GITHUB_URL
    };
  },
  computed: {
    loggedin() {
      return this.$store.getters.getAuth ? true : false;
    }
  },
  created() {
    this.title = this.$store.getters.getTitle;
  },
  methods: {
    logout() {
      this.$store.dispatch("changeLogoff").then(() => {
        window.sessionStorage.clear();
        this.$router.push("/");
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
