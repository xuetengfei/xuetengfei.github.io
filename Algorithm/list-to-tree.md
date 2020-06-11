# list 转化为 tree

### RawData

```javascript
// RawData.length  = 6
const RawData = [
  {
    id: '12',
    parentId: '0',
    text: 'Man',
    level: '1',
    children: null,
  },
  {
    id: '6',
    parentId: '12',
    text: 'Boy',
    level: '2',
    children: null,
  },
  {
    id: '601',
    parentId: '6',
    text: 'Boys',
    level: '3',
    children: null,
  },
  {
    id: '7',
    parentId: '12',
    text: 'Other',
    level: '2',
    children: null,
  },
  {
    id: '9',
    parentId: '0',
    text: 'Woman',
    level: '1',
    children: null,
  },
  {
    id: '11',
    parentId: '9',
    text: 'Girl',
    level: '2',
    children: null,
  },
];
```

### ExpectData

<!-- [nodemon] starting `node 2.js` -->

```javascript
// ExpectData.length = 2
const ExpectData = [
  {
    id: '12',
    parentId: '0',
    text: 'Man',
    level: '1',
    children: [
      {
        id: '6',
        parentId: '12',
        text: 'Boy',
        level: '2',
        children: [
          {
            id: '601',
            parentId: '6',
            text: 'Boys',
            level: '3',
            children: null,
          },
        ],
      },
      {
        id: '7',
        parentId: '12',
        text: 'Other',
        level: '2',
        children: null,
      },
    ],
  },
  {
    id: '9',
    parentId: '0',
    text: 'Woman',
    level: '1',
    children: [
      {
        id: '11',
        parentId: '9',
        text: 'Girl',
        level: '2',
        children: null,
      },
    ],
  },
];
```

```javascript
const list2tree = list => {
  let RawData = list;
  let reducer = (init, v, i) => Object.assign(init, { [v.id]: i });
  let map = list.reduce(reducer, {});
  //map:  { '6': 1, '7': 3, '9': 4, '11': 5, '12': 0, '601': 2 }
  RawData.forEach(x => {
    let PID = x.parentId;
    if (PID !== '0') {
      var index = map[PID];
      if (!RawData[index].children) {
        RawData[index].children = [];
        RawData[index].children.push(x);
      } else {
        RawData[index].children.push(x);
      }
    }
  });
  return RawData.filter(v => v.parentId === '0');
};
const B = list2tree(RawData);
```

<!--

[Build tree array from flat array in javascript - Stack Overflow](https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript)
 -->
