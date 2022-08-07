import { shallowMount, mount, VueWrapper } from '@vue/test-utils';
import Uploader from '@/components/uploader';
import axios from 'axios';
import { flushPromises } from '@vue/test-utils';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
let wrapper: VueWrapper<any>;
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

const mockComponent = {
  template: '<div><slot></slot></div>'
};
const mockComponents = {
  DeleteOutlined: mockComponent,
  LoadingOutlined: mockComponent,
  FileOutlined: mockComponent
};
const setInputValue = (fileInput: HTMLInputElement) => {
  const files = [testFile] as any;
  Object.defineProperty(fileInput, 'files', {
    value: files,
    writable: false
  });
};
describe('uploader component', () => {
  beforeAll(() => {
    wrapper = shallowMount(Uploader, {
      props: {
        action: 'test.url'
      }
    });
  });
  it.skip('basic layout before uploading', () => {
    // TODO:
    // 测试左侧是否为input ,类型和值是否正确
    expect(wrapper.find('button').exists()).toBeTruthy();
    expect(wrapper.get('button').text()).toBe('点击上传');
    expect(wrapper.get('input').isVisible()).toBeFalsy();
  });
  it.skip('upload process should works fine', async () => {
    mockAxios.post = jest.fn().mockResolvedValueOnce({ status: 'success' });
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    setInputValue(fileInput);

    await wrapper.get('input').trigger('change');
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(wrapper.get('button').text()).toBe('点击上传');
    // button 为 disableds
    console.log('---attributes---', wrapper.get('button').attributes());
    // expect(wrapper.get('button').attributes()).toContain('disabled');
    // 列表长度修改 并且有正确的 class
    expect(wrapper.findAll('li').length).toBe(1);
    const firstItem = wrapper.get('li:first-child');
    // expect(firstItem.classes()).toContain('upload-loading');
    expect(firstItem.classes()).toContain('upload-success');

    await flushPromises();
    expect(wrapper.get('button').text()).toBe('点击上传');
    expect(firstItem.classes()).toContain('upload-success');
    expect(firstItem.get('.filename').text()).toBe(testFile.name);
  });
  it.skip('should return error text when post is rejected', async () => {
    mockAxios.post.mockResolvedValueOnce({ status: 'error' });
    await wrapper.get('input').trigger('change');
    expect(mockAxios.post).toHaveBeenCalledTimes(2);
    expect(wrapper.get('button').text()).toBe('正在上传');
    await flushPromises();
    expect(wrapper.get('button').text()).toBe('点击上传');
    // 列表长度增加，并且列表的最后一项有正确的class 名
    expect(wrapper.findAll('li').length).toBe(2);
    const lastItem = wrapper.get('li:last-child');
    expect(lastItem.classes()).toContain('upload-error');
    // 点击列表中右侧的 button ,可以删除这一项
    await lastItem.get('.delete-icon').trigger('click');
    expect(wrapper.findAll('li').length).toBe(1);
  });
  it.skip('should show the correct interface when using custom slot', async () => {
    mockAxios.post = jest.fn().mockResolvedValueOnce({ data: { url: 'demmy.url' } });
    const wrapper = mount(Uploader, {
      props: {
        action: 'test.url'
      },
      slots: {
        default: '<button>Custom button</button>',
        loading: '<div class="loading>Custom loading</div>',
        uploaded: '<template #uploaded="{uploadedData}"><div class="custom-loaded">{uploadedData}</div></template>'
      },
      global: { stubs: mockComponents }
    });
    expect(wrapper.get('button').text()).toBe('Custom button');
    const fileInput = wrapper.get('input').element as HTMLInputElement;
    setInputValue(fileInput);
    await wrapper.get('input').trigger('change');
    expect(wrapper.get('.loading').text()).toBe('Custom loading');
    await flushPromises();
    expect(wrapper.get('.custom-loaded').text()).toBe('dummy.url');
  });
});
