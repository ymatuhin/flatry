function flatrySync(fn) {
  try {
    return [null, fn()];
  } catch (err) {
    return [err, null];
  }
}

function flatry(fn) {
  if (typeof fn !== 'function' && typeof fn !== 'object') {
    throw new Error('Argument must be a function or Promise');
  }
  var isPromise = fn.then && typeof fn.then === 'function';
  var successFn = function(value) {
    return [null, value];
  };
  var errorFn = function(err) {
    return [err, null];
  };

  return isPromise ? fn.then(successFn, errorFn) : flatrySync(fn);
}

module.exports = flatry;
