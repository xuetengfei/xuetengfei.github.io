const cache = new WeakMap();

function countOwnKeys(obj) {
  if (cache.has(obj)) {
    console.log('Cached');
    return cache.get(obj);
  } else {
    console.log('Computed');
    const count = Object.keys(obj).length;
    cache.set(obj, count);
    return count;
  }
}

console.log('countOwnKeys({ a: 1 });: ', countOwnKeys({ a: 1 }));

// [ES6 系列之 WeakMap · Issue #92 · mqyqingfeng/Blog](https://github.com/mqyqingfeng/Blog/issues/92)

// Symbol;
// [ES6 完全使用手册 · Issue #111 · mqyqingfeng / Blog](https://github.com/mqyqingfeng/Blog/issues/111)
