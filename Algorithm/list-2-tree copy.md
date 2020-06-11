<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/list-2-tree-1559407892.jpg' width='500px'/>
备注:配图疏忽大意，'成都'的children为【 '锦里', '方所'】两个。懒得改图了。  
从 GitHub 上的一个 issue ：https://github.com/LeuisKen/leuisken.github.io/issues/2

#### 原始数据

```javascript
exports.data = [
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

#### 期望结果

```javascript
const ExpectedData = [
  {
    value: '浙江',
    children: [
      {
        value: '杭州',
        children: [
          {
            value: '西湖',
          },
        ],
      },
    ],
  },
  {
    value: '四川',
    children: [
      {
        value: '成都',
        children: [
          {
            value: '锦里',
          },
          {
            value: '方所',
          },
        ],
      },
      {
        value: '阿坝',
        children: [
          {
            value: '九寨沟',
          },
        ],
      },
    ],
  },
];
```

### O(n)算法(from:庄广团)

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

  console.log(JSON.stringify(result, null, 2));
  return result;
};

fn(data);
```
