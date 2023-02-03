type FlatryFn<Result extends unknown> = () => Result;
function flatryFunction<Result>(fn: FlatryFn<Result>) {
  try {
    return [null, fn()] as const;
  } catch (err: unknown) {
    return [err] as const;
  }
}

function flatryPromise<Error, Result>(promise: Promise<Result>) {
  var successFn = function (value: Result) {
    return [null, value] as const;
  };
  var errorFn = function (err: Error) {
    return [err] as const;
  };
  return promise.then(successFn, errorFn);
}

export default function flatry<Result>(
  fn: FlatryFn<Result>
): readonly [null, Result] | readonly [unknown];

export default function flatry<Error, Result>(
  promise: Promise<Result>
): Promise<readonly [null, Result] | readonly [Error]>;

export default function flatry(functionOrPromise: any): any {
  if (typeof functionOrPromise === "function") {
    return flatryFunction(functionOrPromise);
  }

  if (Promise.resolve(functionOrPromise) === functionOrPromise) {
    return flatryPromise(functionOrPromise);
  }

  throw new Error("Argument must be a function or Promise");
}
