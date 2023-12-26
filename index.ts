type FlatryFn<Result extends unknown> = () => Result;
function flatryFunction<Result>(fn: FlatryFn<Result>) {
  try {
    return [null, fn()] as const;
  } catch (err: unknown) {
    return [err] as const;
  }
}

async function flatryPromise<Error, Result>(promise: PromiseLike<Result>) {
  try {
    const value = await promise;
    return [null, value];
  } catch (err) {
    console.log('caught error')
    return [err];
  }
}

export default function flatry<T>(
  promise: PromiseLike<T>
): Promise<[unknown, never] | [null, T]>;
export default function flatry<T>(fn: () => T): [unknown, never] | [null, T];
export default function flatry(functionOrPromise: any): any {
  if (typeof functionOrPromise.then === "function") {
    return flatryPromise(functionOrPromise);
  }
  
  if (typeof functionOrPromise === "function") {
    return flatryFunction(functionOrPromise);
  }

  throw new Error("Argument must be a function or Promise");
}
