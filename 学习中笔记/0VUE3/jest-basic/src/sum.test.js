var sum = require("./index");

// 断言

test("adds  1+2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("test not equal", () => {
  expect(sum(2, 2)).not.toBe(5);
});

test("test to be true or false", () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});
test("test number", () => {
  expect(4).toBeGreaterThan(3);
  expect(2).toBeLessThan(3);
});

test("test oject", () => {
  expect({ name: "viking" }).toEqual({ name: "viking" });
});
