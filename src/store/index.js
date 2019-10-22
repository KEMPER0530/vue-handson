import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

// Vue.use(Vuex);

const Auth = {
  //  loggedIns: false,
  loggedIn: false,
  login() {
    this.loggedIn = true;
  },
  logout() {
    this.loggedIn = false;
  }
};

export default Auth;
