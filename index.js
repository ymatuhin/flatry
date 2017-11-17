function isPromise(fn) {
  return fn.then && typeof fn === 'function';
}

function flatrySync(fn) {
  try {
    return [null, fn()];
  } catch (err) {
    return [err, null];
  }
}

function flatry(fn) {
  if (isPromise(fn))
    return fn.then(
      function(value) {
        return [null, value];
      },
      function(err) {
        return [err, null];
      },
    );

  return flatrySync(fn);
}

module.exports = flatry;
