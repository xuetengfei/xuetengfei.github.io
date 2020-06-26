callback

```javascript
getData(a => {
  getMoreData(a, b => {
    getMoreData(b, c => {
      getMoreData(c, d => {
        getMoreData(d, e => {
          console.log(e);
        });
      });
    });
  });
});
```

promise

```javascript
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => getMoreData(c))
  .then(d => getMoreData(d))
  .then(e => console.log(e));
```

async

```javascript
(async () => {
  try {
    const a = await getData();
    const b = await getData(a);
    const c = await getData(b);
    const d = await getData(c);
    const e = await getData(d);
    console.log(e);
  } catch (err) {
    console.log(err);
  }
})();
```
