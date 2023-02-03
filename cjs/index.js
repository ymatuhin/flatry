"use strict";
exports.__esModule = true;
// @ts-ignore
var is_promise_1 = require("is-promise");
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
function flatry(functionOrPromise) {
    if (typeof functionOrPromise === "function") {
        return flatryFunction(functionOrPromise);
    }
    if ((0, is_promise_1["default"])(functionOrPromise)) {
        return flatryPromise(functionOrPromise);
    }
    throw new Error("Argument must be a function or Promise");
}
exports["default"] = flatry;
