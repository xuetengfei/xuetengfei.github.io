# Order By Condition

### keyBy

```javascript
const keyBy = (array, key) =>
  (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

console.log(keyBy(['a', 'b', 'c'])); // { a: 'a', b: 'b', c: 'c' }

const arr = [{ id: 'a1', title: 'abc' }, { id: 'b2', title: 'def' }];
const R = keyBy(arr, 'id');

console.log('R: ', JSON.stringify(R, null, 2));

/* 

 {
  "a1": {
    "id": "a1",
    "title": "abc"
  },
  "b2": {
    "id": "b2",
    "title": "def"
  }
}
*/
```

### sortBy

```javascript
const fruits = [
  { name: 'banana', amount: 2 },
  { name: 'apple', amount: 4 },
  { name: 'pineapple', amount: 2 },
  { name: 'mango', amount: 1 },
];

const sortBy = key => (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);

//  copy the array, then sort.
const R = fruits.concat().sort(sortBy('amount'));
console.log(' R: ', JSON.stringify(R, null, 2));

/* 
 [
  {
    "name": "mango",
    "amount": 1
  },
  {
    "name": "banana",
    "amount": 2
  },
  {
    "name": "pineapple",
    "amount": 2
  },
  {
    "name": "apple",
    "amount": 4
  }
]
*/
```

### groupBy

```javascript
var array = ['one', 'two', 'three'];

var groupByLength = array.reduce(
  (r, v, i, a, k = v.length) => ((r[k] || (r[k] = [])).push(v), r),
  {},
);
console.log('groupByLength: ', groupByLength);
// groupByLength:  { '3': [ 'one', 'two' ], '5': [ 'three' ] }
```

```javascript
var grouped = [1.3, 2.1, 2.4].reduce(
  (r, v, i, a, k = Math.floor(v)) => ((r[k] || (r[k] = [])).push(v), r),
  {},
);
console.log(grouped);
// output: {1: [1.3], 2: [2.1, 2.4]}
```
