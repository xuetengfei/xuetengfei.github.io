const o = [
  {
    key: 'name',
    value: 'apple',
  },
  {
    key: 'age',
    value: 1,
  },
  {
    key: 'from',
    value: '数据平台',
  },
];

const fn = arr =>
  arr.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});

console.log(fn(o));
