import Vue from "vue";
import Vuex from "vuex";

//import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
    auth: false,
};

const members = {
    member: [],
}

const mutations = {
    changeLogin(state) {
        state.auth = true;
    },
    changeLogoff(state) {
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
    }
};

const getters = {
    getAuth(state) {
        return state.auth;
    },
    getMember(members) {
        return members.member;
    },
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
    }
};

const store = new Vuex.Store({
    state,
    members,
    getters,
    actions,
    mutations
});

export default store;