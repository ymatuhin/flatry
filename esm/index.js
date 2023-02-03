function flatryFunction(fn) {
    try {
        return [null, fn()];
    }
    catch (err) {
        return [err];
    }
}
function flatryPromise(promise) {
    var successFn = function (value) {
        return [null, value];
    };
    var errorFn = function (err) {
        return [err];
    };
    return promise.then(successFn, errorFn);
}
export default function flatry(functionOrPromise) {
    if (typeof functionOrPromise === "function") {
        return flatryFunction(functionOrPromise);
    }
    if (Promise.resolve(functionOrPromise) === functionOrPromise) {
        return flatryPromise(functionOrPromise);
    }
    throw new Error("Argument must be a function or Promise");
}
