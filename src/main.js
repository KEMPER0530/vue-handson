import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from '@/App.vue';
import router from '@/router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from '@/store';
import feather from 'vue-icon';
import VueScrollTo from 'vue-scrollto';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
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
    faUserCircle,
    faNewspaper,
    faMap,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import firebase from 'firebase';
import * as VueGoogleMaps from 'vue2-google-maps';
import './registerServiceWorker.js';

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
    faUserCircle,
    faNewspaper,
    faMap
);
// アイコンの利用
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(feather, 'v-icon');
// VueBootstrapの利用
Vue.use(BootstrapVue);
// スクロールの利用
Vue.use(VueScrollTo, {
    container: 'body', // スクロールするcontainer
    duration: 500, // スクロールアニメーションの長さ（ミリ秒）
    easing: 'ease', // 使用されるイージング
    force: true, // スクロールターゲットがすでに表示されている場合でも、スクロールを実行するかどうか。
    cancelable: false, // ユーザーがスクロールをキャンセルできるかどうか
});
// GoogleMapの利用
Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
        libraries: 'places',
        region: 'JP',
        language: 'ja',
    },
});

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.VUE_APP_FIREBASE_APPID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebaseのmessaging登録
// try {
//     console.log('messaging isSupported' + ':' + firebase.messaging.isSupported());
//     if (firebase.messaging.isSupported()) {
// FirebaseMessaging用設定
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey(
//     process.env.VUE_APP_FIREBASE_USE_PUBLIC_VAPID_KEY
// );

// 通知の受信許可
// Notification.requestPermission()
//     .then(() => {
//         console.log('Notification permission granted.');
//         // トークン取得
//         return messaging.getToken();
//     })
//     .then((token) => {
//         console.log(`Messaging Token: ${token}`);
//     })
//     .catch((err) => {
//         console.error('Unable to get permission to notify.', err);
//     });
// トークン更新のモニタリング
// messaging.onTokenRefresh(() => {
//     this.messaging
//         .getToken()
//         .then((refreshedToken) => {
//             console.log('Messaging Token refreshed.', refreshedToken);
//         })
//         .catch((err) => {
//             console.error('Unable to retrieve refreshed token ', err);
//         });
// });
// フォアグラウンドでのメッセージ受信
//         messaging.onMessage(function(payload) {
//             console.log(payload);
//             alert(payload);
//         });
//     }
// } catch (e) {
//     console.error('Exception : ', err);
// }

new Vue({
    router,
    store,
    // vuetify: new Vuetify(),
    render: (h) => h(App),
}).$mount('#app'); // index.html のid=appにマウントをする