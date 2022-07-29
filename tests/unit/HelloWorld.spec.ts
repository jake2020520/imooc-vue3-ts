import { shallowMount, VueWrapper } from '@vue/test-utils';
import axios from 'axios';
import { flushPromises } from '@vue/test-utils';
// import flushPromises from 'flush-promises';
// 运行命令是找的到的 但是显示报错
import HelloWorld from '@/views/home/testCase/HelloWorld';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
const msg = 'hello world';
let wrapper: VueWrapper<any>;
describe('HelloWorld', () => {
  beforeAll(() => {
    wrapper = shallowMount(HelloWorld, {
      props: { msg }
    });
  });
  it('render', () => {
    expect(wrapper.find('h2'));
  });
  it('should update the count when clicking the button ', async () => {
    await wrapper.get('button').trigger('click');
    expect(wrapper.get('button').text()).toBe('2');
  });
  it('should add todo when fill the input and click the add button', async () => {
    const todoContent = 'buy milk';
    await wrapper.get('.inputValue').setValue(todoContent);
    expect(wrapper.get('input').element.value).toBe(todoContent);
    await expect(wrapper.get('.addTodo').trigger('click'));
    expect(wrapper.findAll('li')).toHaveLength(1);
    expect(wrapper.get('li').text()).toBe('1');
    // // emit 的测试
    expect(wrapper.emitted()).toHaveProperty('send');
    const events: any = wrapper.emitted('send');
    console.log('---------------', events[0]);
    expect(events[0]).toEqual([2]);
  });
  // 仅仅执行
  it.only('should load user message when click the load button ', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { username: 'viking' } });
    await wrapper.get('.loadUser').trigger('click');
    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(wrapper.find('.loading').exists()).toBeTruthy();
    await flushPromises();
    // 界面更新完毕
    expect(wrapper.find('.loading').exists()).toBeFalsy();
    expect(wrapper.get('.userName').text()).toEqual('viking');
  });
  afterEach(() => {
    // 重置参数
    mockAxios.get.mockReset();
  });
});
