import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import Components from '@/components/Gnavi.vue';
import BootstrapVue, {
    BButton,
    BFormInput
} from "bootstrap-vue";
import VueScrollTo from 'vue-scrollto';
import axios from 'axios';
import Vuex from 'vuex';

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
    }
    store = new Vuex.Store({
        storeMock
    })
    wrapper = shallowMount(Components, {
        localVue,
        store
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