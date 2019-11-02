<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">{{ title }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="https://github.com/KEMPER0530/vue-handson" target="_blank">
            <img src="@/static/img/mark-github.svg" title="github" />
          </b-nav-item>
          <b-nav-item to="/login" v-if="!loggedin">LOGIN</b-nav-item>
          <b-nav-item to="/about">PROFILE</b-nav-item>
          <b-nav-item to="/work">WORK</b-nav-item>
          <b-nav-item to="/counter">SAMPLE</b-nav-item>
          <b-button size="sm" class="my-2 my-sm-0" @click="logout" v-if="loggedin">LOGOUT</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      github: process.env.VUE_APP_GITHUB_URL
    };
  },
  computed: {
    loggedin() {
      if (this.$store.getters.getAuth) {
        return true;
      }
      return false;
    }
  },
  created() {
    this.title = this.$store.getters.getTitle;
  },
  methods: {
    logout() {
      this.$store.dispatch("changeLogoff");
      this.$router.push({ name: "home" });
    }
  }
};
</script>
<style lang="scss">
// ヘッダー用のscss読込
@import "@/static/scss/header.scss";
</style>
