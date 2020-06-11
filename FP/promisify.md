```javascript
const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result))),
  );
```

```javascript
const delay = promisify((d, cb) => setTimeout(cb, d));

delay(2000).then(() => console.log('Hi!')); //  Promise resolves after 2s
```
