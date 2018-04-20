var isPromise = require('is-promise');

function flatrySync(fn) {
  try {
    return [void 0, fn()];
  } catch (err) {
    return [err, void 0];
  }
}

module.exports = function flatry(fn) {
  if (typeof fn !== 'function' && !isPromise(fn)) {
    throw new Error('Argument must be a function or Promise');
  }

  var successFn = function(value) {
    return [void 0, value];
  };
  var errorFn = function(err) {
    return [err, void 0];
  };

  return isPromise(fn) ? fn.then(successFn, errorFn) : flatrySync(fn);
};
