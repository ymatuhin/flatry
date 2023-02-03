type FlatryFn<Result extends unknown> = () => Result;
export default function flatry<Error, Result>(functionOrPromise: Promise<Result> | FlatryFn<Result>): readonly [unknown] | readonly [any, Result] | Promise<readonly [any, Result] | readonly [Error]>;
export {};
