// callback

const fetchUser = (cb) => {
  setTimeout(() => {
    cb("hello");
  }, 200);
};
// // 回调函数
it("test callback", (done) => {
  fetchUser((data) => {
    expect(data).toBe("hello");
    done();
  });
});

// promise
const userPromise = () => Promise.resolve("hello");
it("test promise", () => {
  return userPromise().then((data) => {
    expect(data).toBe("hello");
  });
});

it("test with async", async () => {
  const data = await userPromise();
  expect(data).toBe("hello");
});

it("test with expect", () => {
  return expect(userPromise()).resolves.toBe("hello");
});

const rejectPromise = () => Promise.reject("hello");
it("test with expect reject", () => {
  return expect(rejectPromise()).rejects.toBe("hello");
});
