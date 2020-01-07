<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="samuraiblue">
      <b-navbar-brand to="/">
        {{ title }}
        <sapn v-if="loggedin">
          <font-awesome-icon icon="sign-in-alt" />
        </sapn>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/profile">Profile</b-nav-item>
          <b-nav-item to="/work">Work</b-nav-item>
          <!-- <b-nav-item to="/counter">カウンター機能</b-nav-item> -->
          <b-nav-item to="/paycard">CardRegist</b-nav-item>
          <b-nav-item to="/gnavi">Gurunavi</b-nav-item>
          <b-nav-item to="/contact">Contact</b-nav-item>
          <b-button
            size="sm"
            class="my-2 my-sm-0"
            @click="logout"
            v-if="loggedin"
            >LOGOUT</b-button
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  components: {},
  data() {
    return {
      title: '',
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
      this.$store.dispatch('changeLogoff').then(() => {
        window.sessionStorage.clear();
        this.$router.push('/');
      });
    }
  }
};
</script>
<style lang="scss">
// ヘッダー用のscss読込
@import '@/static/scss/header.scss';
@import '@/static/scss/common.scss';
</style>
