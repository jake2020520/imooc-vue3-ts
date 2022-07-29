// callback

const fetchUser = (cb) => {
  setTimeout(() => {
    cb("hello");
  }, 200);
};
// // 回调函数
// it("test callback", (done) => {
//   fetchUser((data) => {
//     expect(data).toBe("hello");
//     done();
//   });
// });

const loopFetchUser = (cb) => {
  setTimeout(() => {
    cb("one");
    setTimeout(() => {
      cb("two");
    }, 2000);
  }, 1000);
};
// 接管 所有time
jest.useFakeTimers();
// 测试中就使用jest.fn() 生成的mock 函数来模拟真实的回调函数
it("test the callback after 1 sec", () => {
  const callback = jest.fn();
  fetchUser(callback);
  expect(callback).not.toHaveBeenCalled(); // 此时还未执行
  jest.runAllTimers(); // 所有执行完毕
  expect(callback).toHaveBeenCalled();
  expect(callback).toHaveBeenCalledWith("hello");
});
it("test the callback in timeout loops", () => {
  const callback = jest.fn();
  loopFetchUser(callback);
  expect(callback).not.toHaveBeenCalled(); // 此时还未执行
  jest.runOnlyPendingTimers(); // 单个执行
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith("one");
  jest.runOnlyPendingTimers(); // 单个执行
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenCalledWith("two");
});
it("test the callback with advance timer", () => {
  const callback = jest.fn();
  loopFetchUser(callback);
  expect(callback).not.toHaveBeenCalled(); // 此时还未执行
  jest.advanceTimersByTime(1000); // 手动限制时间 测试timer
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith("one");
  jest.advanceTimersByTime(2000); // 手动限制时间
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenCalledWith("two");
});
