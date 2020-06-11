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

const transObject = (tableData, keys) => {
  const hashTable = {};
  const res = [];
  for (let i = 0; i < tableData.length; i += 1) {
    let arr = res;
    let cur = hashTable;
    for (let j = 0; j < keys.length; j += 1) {
      const key = keys[j];
      const filed = tableData[i][key];
      if (!cur[filed]) {
        const pusher = {
          value: filed,
          title: filed,
        };
        let tmp = null;
        if (j !== keys.length - 1) {
          tmp = [];
          pusher.children = tmp;
        }
        cur[filed] = { $$pos: arr.push(pusher) - 1 };
        cur = cur[filed];
        arr = tmp;
      } else {
        cur = cur[filed];
        arr = arr[cur.$$pos].children;
      }
    }
  }
  return res;
};

const keys = ['province', 'city', 'name'];

console.log(JSON.stringify(transObject(data, keys), null, 2));
