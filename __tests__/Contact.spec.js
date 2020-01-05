import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import Components from '@/components/Contact.vue';
import BootstrapVue, {
    BButton,
    BFormInput
} from "bootstrap-vue";
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

let wrapper;

beforeEach(() => {
    wrapper = shallowMount(Components, {
        localVue,
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