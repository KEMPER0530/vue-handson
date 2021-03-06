import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
  auth: false,
  authSms: false,
  title: "Top",
  g_list: [],
  name: "",
  pref: "",
  member: [],
  login_name: "",
  login_id: "",
  smsInputmode: false,
  latitude: 0,
  longitude: 0,
  address: ""
};

const mutations = {
  changeLogin(state) {
    state.auth = true;
  },
  changeLogoff(state) {
    state.auth = false;
    state.login_name = "";
    state.login_id = "";
  },
  changeSmsLogin(state) {
    state.authSms = true;
  },
  changeSmsLogoff(state) {
    state.authSms = false;
  },
  putmember(state, data) {
    state.member = data;
  },
  changeHeight(state, userInf) {
    state.member.forEach(index => {
      if (index.id === userInf.userId) {
        if (state.member[index.id - 1]) {
          // state.$set(state.member[index.id - 1], "height", userInf.userHeight);
          state.member[index.id - 1].height = userInf.userHeight;
        }
      }
    });
  },
  putG_list(state, data) {
    state.g_list = data;
  },
  putName(state, name) {
    state.name = name;
  },
  putPref(state, pref) {
    state.pref = pref;
  },
  putLogin_name(state, login_name) {
    state.login_name = login_name;
  },
  putLogin_id(state, login_id) {
    state.login_id = login_id;
  },
  changeSmsInputON(state) {
    state.smsInputmode = true;
  },
  changeSmsInputOFF(state) {
    state.smsInputmode = false;
  },
  putLatitude(state, latitude) {
    state.latitude = latitude;
  },
  putLongitude(state, longitude) {
    state.longitude = longitude;
  },
  putAddress(state, address) {
    state.address = address;
  }
};

const getters = {
  getAuth(state) {
    return state.auth;
  },
  getAuthSms(state) {
    return state.authSms;
  },
  getMember(state) {
    return state.member;
  },
  getTitle(state) {
    return state.title;
  },
  getG_list(state) {
    return state.g_list;
  },
  getName(state) {
    return state.name;
  },
  getPref(state) {
    return state.pref;
  },
  getLogin_name(state) {
    return state.login_name;
  },
  getLogin_id(state) {
    return state.login_id;
  },
  getSmsInputMode(state) {
    return state.smsInputmode;
  },
  getLatitude(state) {
    return state.latitude;
  },
  getLongitude(state) {
    return state.longitude;
  },
  getAddress(state) {
    return state.address;
  }
};

const actions = {
  changeLogin({ commit }) {
    commit("changeLogin");
  },
  changeLogoff({ commit }) {
    commit("changeLogoff");
  },
  changeSmsLogin({ commit }) {
    commit("changeSmsLogin");
  },
  changeSmsLogoff({ commit }) {
    commit("changeSmsLogoff");
  },
  putmember({ commit }, data) {
    commit("putmember", data);
  },
  changeHeight({ commit }, userInf) {
    commit("changeHeight", userInf);
  },
  putG_list({ commit }, data) {
    commit("putG_list", data);
  },
  putName({ commit }, name) {
    commit("putName", name);
  },
  putPref({ commit }, pref) {
    commit("putPref", pref);
  },
  putLogin_name({ commit }, login_name) {
    commit("putLogin_name", login_name);
  },
  putLogin_id({ commit }, login_id) {
    commit("putLogin_id", login_id);
  },
  changeSmsInputON({ commit }) {
    commit("changeSmsInputON");
  },
  changeSmsInputOFF({ commit }) {
    commit("changeSmsInputOFF");
  },
  putLatitude({ commit }, latitude) {
    commit("putLatitude", latitude);
  },
  putLongitude({ commit }, longitude) {
    commit("putLongitude", longitude);
  },
  putAddress({ commit }, address) {
    commit("putAddress", address);
  }
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});

export default store;
