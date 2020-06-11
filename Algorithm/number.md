```javascript
const raw = [1, 2, 3, 4, 5, 6, 7];
const condition = arr => arr.every(v => raw.includes(v));
const calc2 = (arr, sum) => arr.map(v => [v, sum - v]).filter(condition);
console.log(calc2(raw, 10));

// [ [ 3, 7 ], [ 4, 6 ], [ 5, 5 ], [ 6, 4 ], [ 7, 3 ] ]
```
