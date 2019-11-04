import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "@/App.vue";
import router from "@/router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "@/store";
// import {
//     library
// } from '@fortawesome/fontawesome-svg-core';
// import {
//     faCoffee
// } from '@fortawesome/free-solid-svg-icons';
// import {
//     FontAwesomeIcon
// } from '@fortawesome/vue-fontawesome';

// library.add(faCoffee);
// Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app"); // index.html のid=appにマウントをする