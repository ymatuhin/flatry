const isFunction = fn => typeof fn === 'function';
const isPromise = fn => fn.then && isFunction(fn.then);

function flatrySync(fn) {
  try {
    return [null, fn()];
  } catch (err) {
    return [err, null];
  }
}

function flatry(fn) {
  if (isPromise(fn)) return fn.then(value => [null, value], err => [err, null]);
  return flatrySync(fn);
}

module.exports = flatry;
