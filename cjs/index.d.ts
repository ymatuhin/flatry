export default function flatry<T>(promise: PromiseLike<T>): Promise<[unknown, never] | [null, T]>;
export default function flatry<T>(fn: () => T): [unknown, never] | [null, T];
