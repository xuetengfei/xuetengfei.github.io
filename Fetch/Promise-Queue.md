```javascript
const prom1 = a => {
  return new Promise(resolve => {
    resolve(a);
  });
};
const prom2 = a => {
  return new Promise(resolve => {
    resolve(a * 2);
  });
};
const prom3 = a => {
  return new Promise(resolve => {
    resolve(a * 3);
  });
};

const arr = [prom1, prom2, prom3];

const result = arr.reduce((all, current) => {
  return all.then(current);
}, Promise.resolve(1));

result.then(res => {
  console.log(res);
});
```
