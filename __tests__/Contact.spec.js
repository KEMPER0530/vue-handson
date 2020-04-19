import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import Contact from '@/components/Contact.vue';
import router from "@/router";
import BootstrapVue, {
    BButton,
    BFormInput
} from "bootstrap-vue";
import Vuex from 'vuex';
// firebaseのインポート
import firebase from "firebase";
import axios from 'axios';
import constMixin from "@/mixins/ConstMixin";

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
localVue.use(Vuex, firebase, router, BootstrapVue, axios);

let wrapper;
let storeMock;
let store;

beforeEach(() => {
    //Vuexストアのモックを作成する
    storeMock = {
        getters: {
            login_id: "1"
        },
    };
    store = new Vuex.Store({
        storeMock
    });
    wrapper = shallowMount(Contact, {
        localVue,
        store,
        constMixin
    })
})

afterEach(() => {
    wrapper.destroy();
})

describe('Testing Contact component', () => {
    it('Vueインスタンスが生成されているか', () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    });
});