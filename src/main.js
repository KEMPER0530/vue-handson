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

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faSpinner, faClipboardList, faAngleDoubleUp, faUtensils, faSignInAlt, faWrench, faCreditCard, faEnvelope, faDoorClosed, faAddressCard, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import firebase from 'firebase';

library.add(
    faCoffee,
    faSpinner,
    faClipboardList,
    faAngleDoubleUp,
    faUtensils,
    faSignInAlt,
    faWrench,
    faCreditCard,
    faEnvelope,
    faDoorClosed,
    faAddressCard,
    faUserCircle
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

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

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.VUE_APP_FIREBASE_APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
    router,
    store,
    // vuetify: new Vuetify(),
    render: h => h(App)
}).$mount('#app'); // index.html のid=appにマウントをする