import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import NewsJP from '@/components/NewsJP.vue';
import BootstrapVue, {
    BButton,
    BFormInput
} from "bootstrap-vue";
import VueScrollTo from 'vue-scrollto';
import axios from 'axios';
import Vuex from 'vuex';
import constMixin from "@/mixins/ConstMixin";
import Loading from 'vue-loading-overlay';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(VueScrollTo);
localVue.use(Vuex);
localVue.use(axios);
localVue.use(Loading);

let wrapper;
let store;
let storeMock;

beforeEach(() => {
    //Vuexストアのモックを作成する
    storeMock = {
        getters: {
            g_list: [],
            name: "TEST",
            pref: "PREF014"
        },
    };
    store = new Vuex.Store({
        storeMock
    });
    wrapper = shallowMount(NewsJP, {
        localVue,
        store,
        constMixin
    });
    wrapper.setData({
        name: "",
        list: "",
        BaseUrl: process.env.VUE_APP_GET_NEWS_API,
        PREF: "",
        options: [{
            text: "ビジネス",
            value: "business"
        }, ],
        errored: false,
        emessage: "",
        scrollY: constMixin.zero
    })
})

afterEach(() => {
    wrapper.destroy();
    jest.resetAllMocks();
})

describe('Testing NewsJP component', () => {
    it('Vueインスタンスが生成されているか', () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    });
    it('検索ボタンの存在確認', () => {
        expect(wrapper.find(BButton).exists()).toBe(true);
    });
});