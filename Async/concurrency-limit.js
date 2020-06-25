async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of array) {
    console.log('item: ', item);
    const p = iteratorFn(item);
    ret.push(p);
    const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    executing.push(e);
    if (executing.length >= poolLimit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(ret);
}

// 同步循环中的异步等待
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));

const jobs = [2000, 2500, 3000];
async function fn() {
  const ret = [];
  const pool = [];

  for (const item of jobs) {
    console.group(`-------now item: ${item}-------`);
    console.log('ret1: ', ret);
    console.time('耗时');
    const p = timeout(item);
    ret.push(p);
    const e = p.then(() => {
      console.log('pool1: ', pool);
      // 完成后，在pool数组里面，删除自己
      pool.splice(pool.indexOf(e), 1);
      console.log('pool2: ', pool);
    });
    pool.push(e);
    await p;
    console.timeEnd('耗时');
    console.log('Time:', new Date().toLocaleTimeString());
    console.log('ret2: ', ret);
    console.groupEnd();
  }
  return Promise.all(ret);
}

fn().then(res => console.log('end', res));
