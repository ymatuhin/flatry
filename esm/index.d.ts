type FlatryFn<Result extends unknown> = () => Result;
export default function flatry<Result>(fn: FlatryFn<Result>): readonly [null, Result] | readonly [unknown];
export default function flatry<Error, Result>(promise: Promise<Result>): Promise<readonly [null, Result] | readonly [Error]>;
export {};
