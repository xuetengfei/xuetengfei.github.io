## Node:util.promisify

```javascript
const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const file = `${__dirname}/test.json`;

// to.js
function to(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}

/* async/await */

async function fn() {
  const [err, res] = await to(readFilePromise(file, {}));
  if (err) {
    console.log('err: ', err);
    return;
  }
  const data = await JSON.parse(res.toString());
  console.log('data: ', data);
}

fn();
```

## javascript:promisify

```javascript
const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result))),
  );

const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!')); //  Promise resolves after 2s
```
