```javascript
// RawData        [1, 0, 0, 4, 3, 2, 3, 4, 5, 6, 7, 3, 16, 17, 18, 19, 20];
// ExpectedData   [ 2, 3, 4, 5, 6, 7 ]
```

```javascript
const row = [1, 0, 0, 4, 3, 2, 3, 4, 5, 6, 7, 3, 16, 17, 18, 19, 20];

function fn(array) {
  let temp = [];
  const list = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const next = array[index + 1];
    const prev = array[index - 1];
    if (element + 1 === next || element - 1 === prev) {
      list.push(element);
    }
  }
  const res = list.reduce((acc, cur, index, arr) => {
    if (arr[index + 1] === undefined) {
      acc.push([...temp, cur]);
    } else if (cur + 1 !== arr[index + 1]) {
      acc.push([...temp, cur]);
      temp = [];
    } else {
      temp.push(cur);
    }
    return acc;
  }, []);
  const maxlen = Math.max(...res.map(v => v.length));
  const maxlist = res.filter(v => v.length === maxlen)[0];
  console.log('maxlen: ', maxlen);
  console.log('maxlist: ', maxlist);
}
fn(row);

// maxlen:  6
// maxlist:  [ 2, 3, 4, 5, 6, 7 ]
```
