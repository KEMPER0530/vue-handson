import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "@/App.vue";
import router from "@/router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "@/store";
import feather from 'vue-icon'
// ページトップ用のプラグイン
import VueScrollTo from 'vue-scrollto'
// import Vuetify from "vuetify";
// import "vuetify/dist/vuetify.min.css"

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
Vue.use(feather, 'v-icon');
Vue.use(VueScrollTo, {
    container: "body", // スクロールするcontainer
    duration: 500, // スクロールアニメーションの長さ（ミリ秒）
    easing: "ease", // 使用されるイージング
    force: true, // スクロールターゲットがすでに表示されている場合でも、スクロールを実行するかどうか。
    cancelable: false // ユーザーがスクロールをキャンセルできるかどうか
});
// Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    // vuetify: new Vuetify(),
    render: h => h(App)
}).$mount('#app'); // index.html のid=appにマウントをする