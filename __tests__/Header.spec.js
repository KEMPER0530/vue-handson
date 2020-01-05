import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import mapGetters from '@/store/index';
import BootstrapVue from "bootstrap-vue";
import Vuex from 'vuex';
import Header from '@/components/Header.vue';

const localVue = createLocalVue();
localVue.use(mapGetters);
localVue.use(BootstrapVue);

let store
let storeMock
let wrapper

beforeEach(() => {
    //Vuexストアのモックを作成する
    storeMock = {
        getters: {
            auth: () => true,
            title: "Top"
        },
    }
    store = new Vuex.Store({
        storeMock
    })
    wrapper = shallowMount(Header, {
        localVue,
        store
    })
})

afterEach(() => {
    wrapper.destroy();
})

describe('Testing Header component', () => {
    it('Vueインスタンスが生成されているか', () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })
})