// Vueをimportする代わりに、'@vue/test-utils'を使いcreateLocalVue、shallowMount をimportします
import { shallowMount, createLocalVue } from '@vue/test-utils';
// vuexをimport
import Vuex from 'vuex';
// firebaseのインポート
import firebase from "firebase";
// テスト対象ファイル（@/views/App.vue）をimportする
import App from '@/App.vue';
import store from "@/store";
import router from "@/router";
import BootstrapVue from "bootstrap-vue";
import VueScrollTo from 'vue-scrollto';
import Header from "@/components/Header";
import Home from "@/components/Home";

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

const localVue = createLocalVue();
localVue.use(Vuex, store, firebase, router, BootstrapVue, VueScrollTo);

let wrapper;
let vm;

beforeEach(() => {
    wrapper = shallowMount(App, {
        localVue,
        Header,
        Home,
    });
    vm = wrapper.vm;
})

afterEach(() => {
    wrapper.destroy();
});

describe('Testing Header component', () => {
    it('Vueインスタンスが生成されているか', () => {
            expect(wrapper.isVueInstance).toBeTruthy();
        }),
        it('Headerインスタンスが生成されているか', () => {
            expect(wrapper.find(Header).exists()).toBeTruthy();
        })
})