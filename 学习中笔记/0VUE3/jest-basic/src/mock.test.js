const getUserName = require("./user");
const axios = require("axios");
// 接管 axios方法
// 第一种 直接用以下
// jest.mock("axios");
// axios.get.mockImplementation(() => {
//   return Promise.resolve({ data: { username: "viking" } });
// });
// 第二种 根目录 __mocks__ 创建 axios.js

it("test with async", async () => {
  const data = await getUserName(1);
  console.log("getUserName:name: ", data);
  //   expect(data).toBe("Bret1");
  expect(axios.get).toHaveBeenCalled();
  expect(axios.get).toHaveBeenCalledTimes(1); // 执行次数
});

function mockTest(shouldCall, cb) {
  if (shouldCall) {
    return cb(42);
  }
}
// 在jest 创建一个Mock 函数最简单的方法就是调用jest.fn() 方法
// 测试中就使用jest.fn() 生成的mock 函数来模拟真实的回调函数
it("test with mock function", () => {
  const mockCb = jest.fn();
  mockTest(true, mockCb);
  expect(mockCb).toHaveBeenCalled(); // 是否被调用
  expect(mockCb).toHaveBeenCalledWith(42); // 参数 是否被用到
  expect(mockCb).toHaveBeenCalledTimes(1); // 执行次数
  console.log("mock calls: ", mockCb.mock.calls);
  console.log("mock result0: ", mockCb.mock.results);
});
it("test mock with implementation", () => {
  const mockCb = jest.fn((x) => x * 2);
  mockTest(true, mockCb);
  console.log("mock result1: ", mockCb.mock.results);
});
it("test mock with implementation 20", () => {
  const mockCb = jest.fn().mockReturnValue(20);
  mockTest(true, mockCb);
  console.log("mock result1: ", mockCb.mock.results);
});
