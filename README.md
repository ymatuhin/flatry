# Flatry

Flatry converting promise or function to flat response with array like `[err, response]`
Inspired by golang style error handling without try/catch.

## Examples

### With async/await

Before:
```js
async asyncData({ app, error }) {
  try {
    const categories = (await app.$axios.$get('forum')).sections;
    return { categories };
  } catch (err) {
    return error({ statusCode: err.statusCode });
  }
}
```

After:
```js
async asyncData({ app, error }) {
  const [err, res] = await flatry(app.$axios.$get('forum'));
  if (err) return error({ statusCode: err.statusCode });
  return { categories: res.sections };
}
```

### Sync


Before:
```js
function throwErrorIn10percent() {
  if (Math.random() > 0.9) throw new Error('Random error');
  return true;
}

let result = false;
try {
    result = throwErrorIn10percent()
} catch (error) {
    console.log('Error catched', error)
}
console.log('result', result);
```

After:
```js
function throwErrorIn10percent() {
  if (Math.random() > 0.9) throw new Error('Random error');
  return true;
}

const [err, result] = flatry(throwErrorIn10percent);
if (err) console.log('Error catched', err)
console.log('result', result);
```
