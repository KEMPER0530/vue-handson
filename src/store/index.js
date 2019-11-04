import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
    auth: false,
    title: "Top"
};

const members = {
    member: [],
};

const glists = {
    g_list: [],
    name: ""
};

const mutations = {
    changeLogin(state) {
        state.auth = true;
    },
    changeLogoff(state, members, glists) {
        state.auth = false;
    },
    putmember(members, data) {
        members.member = data
    },
    changeHeight(members, userInf) {
        members.member.forEach(index => {
            if (index.id === userInf.userId) {
                if (members.member[index.id - 1]) {
                    // members.$set(members.member[index.id - 1], "height", userInf.userHeight);
                    members.member[index.id - 1].height = userInf.userHeight;
                }
            }
            return;
        });
    },
    putGlist(glists, data) {
        glists.g_list = data;
    },
    putName(glists, name) {
        glists.name = name;
    }
};

const getters = {
    getAuth(state) {
        return state.auth;
    },
    getMember(members) {
        return members.member;
    },
    getTitle(state) {
        return state.title;
    },
    getGlist(glists) {
        return glists.g_list;
    },
    getName(glists) {
        return glists.name;
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
    putGlist({ commit }, data) {
        commit("putGlist", data);
    },
    putName({ commit }, name) {
        commit("putName", name);
    }
};

const store = new Vuex.Store({
    state,
    members,
    glists,
    getters,
    actions,
    mutations,
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
});

export default store;