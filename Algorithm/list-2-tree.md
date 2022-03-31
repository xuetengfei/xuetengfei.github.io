[From GitHub issue](https://github.com/LeuisKen/leuisken.github.io/issues/2)

```javascript
const data = [
  {
    province: '浙江',
    city: '杭州',
    name: '西湖',
  },
  {
    province: '四川',
    city: '成都',
    name: '锦里',
  },
  {
    province: '四川',
    city: '成都',
    name: '方所',
  },
  {
    province: '四川',
    city: '阿坝',
    name: '九寨沟',
  },
];
```

#### 结果

```json
[
  {
    "value": "浙江",
    "title": "浙江",
    "children": [
      {
        "value": "杭州",
        "title": "杭州",
        "children": [
          {
            "value": "西湖",
            "title": "西湖"
          }
        ]
      }
    ]
  },
  {
    "value": "四川",
    "title": "四川",
    "children": [
      {
        "value": "成都",
        "title": "成都",
        "children": [
          {
            "value": "锦里",
            "title": "锦里"
          },
          {
            "value": "方所",
            "title": "方所"
          }
        ]
      },
      {
        "value": "阿坝",
        "title": "阿坝",
        "children": [
          {
            "value": "九寨沟",
            "title": "九寨沟"
          }
        ]
      }
    ]
  }
]
```

```javascript
const { data } = require('./data.js');

const fn = list => {
  const PRO_LOOK_UP = {};
  const CITY_LOOK_UP = {};
  const result = [];
  for (let { province, city, name } of list) {
    if (PRO_LOOK_UP[province]) {
      if (CITY_LOOK_UP[city]) {
        CITY_LOOK_UP[city].children.push({ value: name });
      } else {
        const cityObj = {
          value: city,
          children: [
            {
              value: name,
            },
          ],
        };
        PRO_LOOK_UP[province].children.push(cityObj);
      }
    } else {
      const provinceObj = { value: province, children: [] };
      const cityObj = {
        value: city,
        children: [
          {
            value: name,
          },
        ],
      };
      provinceObj.children.push(cityObj);
      PRO_LOOK_UP[province] = provinceObj;
      CITY_LOOK_UP[city] = cityObj;
      result.push(provinceObj);
    }
  }
  return result;
};
```

```javascript
function toTree(data) {
  const provinceSet = data.filter(v => v.province);
  function findByC(key, value) {
    const arr = [
      ...new Set(data.filter(a => a[key] == value).map(v => v.name)),
    ];
    return arr.map(v => ({
      name: v,
    }));
  }
  function findByP(key, value) {
    const arr = [
      ...new Set(data.filter(a => a[key] == value).map(v => v.city)),
    ];
    return arr.map(v => ({
      name: v,
      children: findByC('city', v),
    }));
  }
  return provinceSet.map(provinceName => {
    return {
      name: provinceName,
      children: findByP('province', provinceName),
    };
  });
}
```

```json
// console.log(JSON.stringify(toTree(data), null, 2));
[
  {
    "name": "浙江",
    "children": [
      {
        "name": "杭州",
        "children": [
          {
            "name": "西湖"
          }
        ]
      }
    ]
  },
  {
    "name": "四川",
    "children": [
      {
        "name": "成都",
        "children": [
          {
            "name": "锦里"
          },
          {
            "name": "方所"
          }
        ]
      },
      {
        "name": "阿坝",
        "children": [
          {
            "name": "九寨沟"
          }
        ]
      }
    ]
  }
]
```

## 第二题

```javascript
const arr = [
  { id: 1, pid: 0, name: '中国' },
  { id: 2, pid: 1, name: '广州' },
  { id: 3, pid: 1, name: '湖北' },
  { id: 4, pid: 3, name: '武汉' },
  { id: 5, pid: 2, name: '深圳' },
  { id: 6, pid: 2, name: '东莞' },
];

const nest = (items, id = 0, link = 'pid') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id) }));
```

```json
// console.log(JSON.stringify(nest(arr), null, 2));
[
  {
    "id": 1,
    "pid": 0,
    "name": "中国",
    "children": [
      {
        "id": 2,
        "pid": 1,
        "name": "广州",
        "children": [
          {
            "id": 5,
            "pid": 2,
            "name": "深圳",
            "children": []
          },
          {
            "id": 6,
            "pid": 2,
            "name": "东莞",
            "children": []
          }
        ]
      },
      {
        "id": 3,
        "pid": 1,
        "name": "湖北",
        "children": [
          {
            "id": 4,
            "pid": 3,
            "name": "武汉",
            "children": []
          }
        ]
      }
    ]
  }
]
```
