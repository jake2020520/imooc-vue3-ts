import { shallowMount, mount, VueWrapper, config } from '@vue/test-utils';
import axios from 'axios';
import { flushPromises } from '@vue/test-utils';
import { ElMessage, ElButton } from 'element-plus';
// import flushPromises from 'flush-promises';
import UserProfile from '@/components/userProfile';
import Hello from '@/views/home/testCase/Hello';
import ElementPlus from 'element-plus';
// 使用测试 第三方组件 element-plus 是失败的所以这个 测试 暂时 到此
// jest.mock('vuex');
import store from '../../src/store/index'; // 可以直接使用

jest.mock('element-plus');

jest.mock('axios');
jest.mock('http');
// const mockAxios = axios as jest.Mocked<typeof axios>;
const mockedRoutes: string[] = [];
jest.mock('vue-router', () => ({
  useRouter: () => {
    push: (url: string) => mockedRoutes.push(url);
  }
}));

// 第三方 组件，可以用这种方式使用
jest.mock('element-plus', () => ({
  ElMessage: {
    success: jest.fn()
  }
}));

// 第三方 组件，可以用这种方式使用
const mockComponent = {
  // template: '<div><slot></slot></div>',
  template: '<div><slot></slot></div>'
};
const mockComponent2 = {
  template: '<div><slot></slot><slot name="dropdown"></slot></div>'
};

const globalComponents = {
  'el-button': mockComponent,
  'el-dropdown': mockComponent2,
  'el-dropdown-menu': mockComponent,
  'el-dropdown-item': mockComponent,
  'el-message': mockComponent
};

const CustomStub = {
  name: 'Hello',
  template: '<p>custom stub content Hello</p>'
};
// config.global.stubs = { ElButton: { template: '<div><slot></slot></div>' } };
// config.plugins.VueWrapper[ElementPlus] = '<div />';
let wrapper: VueWrapper<any>;
describe('UserProfile component', () => {
  beforeAll(() => {
    wrapper = shallowMount(UserProfile, {
      props: { user: { isLogin: false } },

      global: {
        // components: {
        //   Hello: {
        //     template: '<div><slot></slot></div>'
        //   }
        // },
        provide: { store },
        // plugins: [ElementPlus],
        stubs: {
          Hello: { template: '<div>fsafa<slot></slot></div>' },
          ElButton: { template: '<div>elbutton<slot></slot></div>' }
        }
      }
    });
  });
  it('render', () => {
    expect(wrapper.find('h2'));
  });
  it('should render login button when login is false', async () => {
    console.log(wrapper.html());
    expect(wrapper.get('div').text()).toBe('登录');
    await wrapper.get('.login-button').trigger('click');
    expect(ElMessage.success).toHaveBeenCalled();
    expect(store?.state?.common?.user.userName).toBe('viking');
  });
  it('should render username when login is true', async () => {
    await wrapper.setProps({
      user: { isLogin: true, userName: 'viking' }
    });
    console.log(wrapper.html());
    // expect(wrapper.get('.current-user-name').html()).toContain('viking');
  });
  it('should call logout and show message call router.push', async () => {
    console.log(wrapper.html());
    await wrapper.get('.el-dropdown-login').trigger('click');
    expect(store?.state?.common?.user.isLogin).toBeFalsy();

    // expect(wrapper.get('.current-user-name').html()).toContain('viking');
  });

  afterEach(() => {
    // 重置参数
    // mockAxios.get.mockReset();
    // (ElMessage as jest.Mock<typeof message>).success.mockReset();
  });
});
