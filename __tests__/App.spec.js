import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils';
import App from '@/App.vue';
import Header from '@/components/Header.vue';

const localVue = createLocalVue();
let wrapper

beforeEach(() => {
    wrapper = shallowMount(App, {
        localVue,
        stubs: ['router-link', 'router-view']
    })
})

afterEach(() => {
    wrapper.destroy();
})

describe('Testing Header component', () => {
    it('Vueインスタンスが生成されているか', () => {
        expect(wrapper.isVueInstance).toBeTruthy()
    })
    it('Headerインスタンスが生成されているか', () => {
        expect(wrapper.find(Header).exists()).toBeTruthy()
    })
})