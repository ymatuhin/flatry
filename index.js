var isPromise = require('is-promise');

function flatrySync(fn) {
  try {
    return [null, fn()];
  } catch (err) {
    return [err, null];
  }
}

module.exports = function flatry(fn) {
  if (typeof fn !== 'function' && !isPromise(fn)) {
    throw new Error('Argument must be a function or Promise');
  }

  var successFn = function (value) {
    return [null, value];
  };
  var errorFn = function (err) {
    return [err, null];
  };

  return isPromise(fn) ? fn.then(successFn, errorFn) : flatrySync(fn);
}
