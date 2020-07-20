<!-- ```javascript
const treeData = [
  {
    title: '0-0',
    key: 'j58azgz6',
    children: [
      {
        title: '0-0-0',
        key: 'sQr8r',
        children: [{ title: '0-0-0-0', key: 'kWg' }, { title: '0-0-0-1', key: 'Htvt' }],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: 'q78w' },
          { title: '0-0-1-1', key: 'HK6Bwb' },
        ],
      },
      {
        title: '0-0-2',
        key: '55NWsg',
      },
    ],
  },
];

let Arr = [];

const fn = arr => {
  arr.forEach(v => {
    const obj = {
      id: i++,
      title: v.title,
      key: v.key,
      hasChildren: v.children && v.children.length > 0 ? true : false,
    };
    Arr.push(obj);
    if (v.children) {
      fn(v.children);
    }
  });
};

fn(treeData);
```

```javascript

[
  { id: 0, title: '0-0', key: 'j58azgz6', hasChildren: true },
  { id: 1, title: '0-0-0', key: 'sQr8r', hasChildren: true },
  { id: 2, title: '0-0-0-0', key: 'kWg', hasChildren: false },
  { id: 3, title: '0-0-0-1', key: 'Htvt', hasChildren: false },
  { id: 4, title: '0-0-1', key: '0-0-1', hasChildren: true },
  { id: 5, title: '0-0-1-0', key: 'q78w', hasChildren: false },
  { id: 6, title: '0-0-1-1', key: 'HK6Bwb', hasChildren: false },
  { id: 7, title: '0-0-2', key: '55NWsg', hasChildren: false },
];
```

```javascript
let Arr = [];
const fn = arr => {
  arr.forEach((v, i) => {
    Arr.push(v.key);
    if (v.children) {
      fn(v.children);
    }
  });
};
fn(treeData);

console.log(Arr);
//  ["j58azgz6", "sQr8r", "kWg", "Htvt", "0-0-1", "q78w", "HK6Bwb", "55NWsg"]
``` -->

```javascript
const tree = [
  { code: 'platform', id: 1, name: '首页', children: [] },
  {
    code: 'goods_management',
    id: 43,
    name: '商品管理',
    children: [
      {
        code: 'publish_goods',
        id: 44,
        name: '发布商品',
        children: [{ code: 'put_away', id: 135, name: '上架', children: [] }],
      },
      { code: 'sold_out', id: 136, name: '下架', children: [] },
    ],
  },
  {
    code: 'profit_distribution',
    id: 46,
    name: '分润列表',
    children: [
      {
        code: 'pos_distribution',
        id: 141,
        name: '设备分润',
        children: [
          {
            code: 'org_profit_distribution',
            id: 47,
            name: '机构分润',
            children: [
              {
                code: 'org_repay_distribution_month',
                id: 48,
                name: '月结分润',
                children: [
                  {
                    code: 'org_repay_distribution_month_detail',
                    id: 55,
                    name: '分润详情',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
exports.tree = tree;
```

```javascript
const log = require('log-mini');
log.addLog('debug', 'magenta');

const tree = require('./d.js').tree;

/* 1 */
const branch = arr =>
  [].concat(
    ...arr.map(v => (v.children.length ? [v.id, ...branch(v.children)] : v.id)),
  );

log.debug('branch: ', branch(tree));
log.debug('branch: ', branch(tree).length);
// branch: [1, 43, 44, 135, 136, 46, 141, 47, 48, 55];
// branch: 10;

/* 2 */
const branch2 = arr =>
  arr.reduce(
    (init, v) =>
      init.concat(v.children.length ? [v.id, ...branch2(v.children)] : v.id),
    [],
  );

log.debug('branch2: ', branch2(tree));
log.debug('branch2: ', branch2(tree).length);
// branch2: [1, 43, 44, 135, 136, 46, 141, 47, 48, 55];
// branch2: 10;
```
