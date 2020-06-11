```javascript
const user = {
  id: 5027,
  name: 'Yuki',
  education: {
    degree: 'Masters',
  },
};

const {
  education: { degree },
} = user;
console.log('degree: ', degree);
// degree:  Masters
```

```javascript
const user = {
  id: 5027,
  name: 'Yuki',
  education: {},
};

const {
  education: { degree },
} = user;
console.log('degree: ', degree);
// degree:  undefined
```

```javascript
const user = {
  id: 5027,
  name: 'Yuki',
};

const { education: { degree } = {} } = user;
console.log('degree: ', degree);
// degree:  undefined
```

```javascript
const processMap = {
  1: {
    value: 1,
    lable: 'Processing',
    color: 'green',
  },
  2: {
    value: 2,
    lable: 'Processed',
    color: 'blue',
  },
};

const config = [
  {
    title: 'Status',
    dataIndex: 'processStatus',
    key: 'processStatus',
    // color
    render: value => {
      const { color = '#fff', lable = value } = processMap[value] || {};
      return <Tag color={color}>{lable}</Tag>;
    },
  },
];
```

```javascript
function fn({ a = 1, b = 2 }) {
  console.log(a, b);
}

fn();
// TypeError: Cannot destructure property`a` of 'undefined' or 'null'.

fn({});
// 1 2
```
