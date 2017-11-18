# Flatry

[![Build Status](https://travis-ci.org/ymatuhin/flatry.svg?branch=master)](https://travis-ci.org/ymatuhin/flatry)
[![codecov](https://codecov.io/gh/ymatuhin/flatry/branch/master/graph/badge.svg)](https://codecov.io/gh/ymatuhin/flatry)
[![GitHub license](https://img.shields.io/github/license/ymatuhin/flatry.svg)](https://github.com/ymatuhin/flatry/blob/master/LICENSE)

Flatry (flat try) converting promise or function to flat array response with `[err, result]`.

Inspired by golang style error handling without try/catch.

&nbsp;

## Install

```bash
npm install flatry
# or
yarn add flatry
```

&nbsp;

## Use

```js
import flatry from 'flatry';
// or
const flatry = require('flatry');
```

&nbsp;

## Examples

![Flatry example](https://raw.githubusercontent.com/ymatuhin/flatry/master/example.png)

&nbsp;

### Asynchronous (async/await)


```js
// Before
async asyncData({ app, error }) {
  try {
    const categories = (await app.$axios.$get('forum')).sections;
    return { categories };
  } catch (err) {
    return error({ statusCode: err.statusCode });
  }
}


// After
async asyncData({ app, error }) {
  const [err, res] = await flatry(app.$axios.$get('forum'));
  if (err) return error({ statusCode: err.statusCode });
  return { categories: res.sections };
}
```


### Synchronous

```js
// Before
let result = false;
try {
    result = mayThrowErrorSomeday()
} catch (error) {
    console.log('Error catched', error)
}
console.log('result', result);


// After
const [err, result] = flatry(mayThrowErrorSomeday);
if (err) console.log('Error catched', err)
console.log('result', result);
```
