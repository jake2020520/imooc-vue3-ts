### 一、 tsx 项目配置 jest

1. 环境配置

**安装依赖**

```
yarn add -D jest ts-jest @types/jest @vue/test-utils
```

- jest：测试框架本体
- ts-jest：Typescript transformer，将 Typescript 代码转为 Jest 能读懂的 Javascript 代码。同时检查类型。
- @types/jest：Jest 的类型声明。
- @vue/test-utils：vue 的测试套件库。

**tsconfig.json 修改配置**

```
{
  ...,
  "compilerOptions": {
    ...,
    "jsx": "react",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment",
  }
}
```

- jsx 选项指示 Typescript 编译器遇到 JSX 代码时应该如何处理；默认为 preserve，原样保留 JSX 代码。但因为 Jest 无法运行 JSX 代码，因此需要配置为 react 进行转译。
- jsxFactory 选项可以修改编译 JSX 时使用的工厂函数。这里需要修改为 h，这样才能使用 Vue 自带的 h 函数来将 JSX 代码编译成 Vue Runtime 可运行的代码。否则默认会使用 createElements，这是 React 的函数。
- jsxFragmentFactory 选项和 jsxFactory 同理，但处理的是 Fragment 的情况。参考 React Fragment 和 Vue Fragments。

**生成 jest.config.js**

```
yarn ts-jest config:init
```

- testEnvironment 选项。如果你测试的是前端项目，配置成 jsdom。默认是 node。
  要安装 yarn add -D jest-environment-jsdom

### 二、jest 使用 api

1. mount 和 shallowMount 的区别

- mount 一股脑全部渲染
- shallowMount 只渲染组件本身，外来的都不渲染，所以更快，适合单元测试

2. get 和 find 的区别，相当于 dom 操作的 获取节点

- 找不到的时候，get throw 错误，case 报错；find 返回 null
- 通用规则： 总是使用 get,除非你想判断一些元素不存在的时候，这种情况使用 find

3. 查找 组件包的 组件 getComponent findComponent

4. trigger 响应事件
   await 渲染页面时异步的

```
  it('should update the count when clicking the button ', async () => {
    const wrapper = mount(Button);
    await wrapper.get('button').trigger('click');
    expect(wrapper.get('button').text()).toBe('3');
  });
```

5. wrapper.emitted()

```
    // expect(wrapper.emitted()).toHaveProperty('send');
    // const events: any = wrapper.emitted('send');
    // expect(events[0]).toEqual([todoContent]);
```

6. 异步

- 不要依赖第三方库，模拟依赖第三方库的实现
- 使用 flushPromises 将所有 Promise pending 状态都改成完成
- 将 mock 对象断言为特定类型，使用 jest.Mocked<>
  使用 only 跑一个单独的 case
  ```
  jest.mock('axios');
  const mockAxios = axios as jest.Mocked<typeof axios>;
  ```

7. 周期函数

```
// 开始前
  beforeAll(() => {
    wrapper = shallowMount(HelloWorld, {
      props: { msg }
    });
  });
// 开始后
  afterEach(() => {
    // 重置参数
    mockAxios.get.mockReset();
  });
// skip 跳过
```
