import flatry from "./index";

test("imported", () => {
  expect(typeof flatry).toBe("function");
});

test("sync", () => {
  const testSuccessFn = () => 1;
  const testErrorFn = () => {
    throw new Error("Oops...");
  };

  const [err1, resp1] = flatry(testSuccessFn);
  const [err2, resp2] = flatry(testErrorFn);

  expect(err1).toBeNull();
  expect(err2).toBeDefined();
  expect(resp1).toBe(1);
  expect(resp2).toBeUndefined();
});

test("async", async () => {
  const testSuccessFn = Promise.resolve(1);
  const testErrorFn = Promise.reject(new Error("Oops..."));

  const [err1, resp1] = await flatry(testSuccessFn);
  const [err2, resp2] = await flatry(testErrorFn);

  expect(err1).toBeNull();
  expect(err2).toBeDefined();
  expect(resp1).toBe(1);
  expect(resp2).toBeUndefined();
});

test("thenable", async () => {
  // @ts-ignore
  const [err1, resp1] = await flatry({ then: cb => { cb(1); } });
  const [err2, resp2] = await flatry({ then: () => { throw new Error("Oops..."); } });

  expect(err1).toBeNull();
  expect(err2).toBeDefined();
  expect(resp1).toBe(1);
  expect(resp2).toBeUndefined();
});

test("should throw exception if arg not a function", () => {
  // @ts-ignore
  expect(() => flatry(undefined)).toThrow();
});
