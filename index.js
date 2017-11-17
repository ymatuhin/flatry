function flatrySync(fn) {
  try {
    return [null, fn()];
  } catch (err) {
    return [err, null];
  }
}

function flatry(fn) {
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
