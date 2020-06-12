import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import Gmap from '@/components/Gmap.vue';
import BootstrapVue, {
    BButton,
} from "bootstrap-vue";
import axios from 'axios';
import Vuex from 'vuex';
import constMixin from "@/mixins/ConstMixin";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);
localVue.use(axios);

let wrapper;
let store;
let storeMock;

beforeEach(() => {
    //Vuexストアのモックを作成する
    storeMock = {
        getters: {
            latitude: 0,
            longitude: 0,
            address: ""
        },
    };
    store = new Vuex.Store({
        storeMock
    });
    wrapper = shallowMount(Gmap, {
        localVue,
        store,
        constMixin
    });
    wrapper.setData({
        geocoder: {},
        address: "",
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 14,
        result: false,
        marker_items: [{
            position: {
                lat: 0,
                lng: 0
            },
            title: 'Present location'
        }, ],
        infos: [],
    })
})

afterEach(() => {
    wrapper.destroy();
    jest.resetAllMocks();
})

describe('Testing Gmap component', () => {
    it('Vueインスタンスが生成されているか', () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    });
    it('検索ボタンの存在確認', () => {
        expect(wrapper.find(BButton).exists()).toBe(true);
    });
});