import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import Gnavi from '@/components/Gnavi.vue';
import BootstrapVue, {
    BButton,
    BFormInput
} from "bootstrap-vue";
import VueScrollTo from 'vue-scrollto';
import axios from 'axios';
import Vuex from 'vuex';
import constMixin from "@/mixins/ConstMixin";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(VueScrollTo);
localVue.use(Vuex);
localVue.use(axios);

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
    wrapper = shallowMount(Gnavi, {
        localVue,
        store,
        constMixin
    });
    wrapper.setData({
        name: "",
        list: "",
        BaseUrl: process.env.VUE_APP_GNAVI_URL,
        APIKEY: process.env.VUE_APP_GNAVI_API_KEY,
        PAGE: process.env.VUE_APP_GNAVI_PAGE,
        PREF: "",
        options: [{
                text: "東京",
                value: "PREF13"
            },
            {
                text: "神奈川",
                value: "PREF14"
            }
        ],
        errored: false,
        emessage: "",
        scrollY: constMixin.zero
    })
})

afterEach(() => {
    wrapper.destroy();
    jest.resetAllMocks();
})

describe('Testing Gnavi component', () => {
    it('Vueインスタンスが生成されているか', () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    });
    it('検索フォームの存在確認', () => {
        expect(wrapper.find(BFormInput).exists()).toBe(true);
    });
    it('検索ボタンの存在確認', () => {
        expect(wrapper.find(BButton).exists()).toBe(true);
    });
});