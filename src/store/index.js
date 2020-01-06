import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
    auth: false,
    title: "Top",
    g_list: [],
    name: "",
    pref: "",
    member: [],
};

const mutations = {
    changeLogin(state) {
        state.auth = true;
    },
    changeLogoff(state) {
        state.auth = false;
    },
    putmember(state, data) {
        state.member = data
    },
    changeHeight(state, userInf) {
        state.member.forEach(index => {
            if (index.id === userInf.userId) {
                if (state.member[index.id - 1]) {
                    // state.$set(state.member[index.id - 1], "height", userInf.userHeight);
                    state.member[index.id - 1].height = userInf.userHeight;
                }
            }
            return;
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
    }
};

const getters = {
    getAuth(state) {
        return state.auth;
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
    }
};

const actions = {
    changeLogin({ commit }) {
        commit("changeLogin");
    },
    changeLogoff({ commit }) {
        commit("changeLogoff");
    },
    putmember({ commit }, data) {
        commit("putmember", data);
    },
    changeHeight({
        commit
    }, userInf) {
        commit("changeHeight", userInf);
    },
    putG_list({ commit }, data) {
        commit("putG_list", data);
    },
    putName({ commit }, name) {
        commit("putName", name);
    },
    putPref({
        commit
    }, pref) {
        commit("putPref", pref);
    }
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
});

export default store;