### 1.获取 URL 的查询参数

```javascript
const url = 'https://www.baidy.com?foo=bar&baz=bing';

function parseURL(url) {
  let q = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
  return q;
}

console.log(parseURL(url)); // { foo: 'bar', baz: 'bing' }
```

### 2.JavaScript 如何跳转页面？也许你不知道有这么多解法

```javascript
// 跳转
window.location.replace('https://www.awesomes.cn'); // 不将被跳转页面加入浏览器记录
window.location.assign('https://www.awesomes.cn');
window.location.href = 'https://www.awesomes.cn';
window.location = 'https://www.awesomes.cn';

// 返回上一页
window.history.back();
window.history.go(-1);

// 刷新当前页
window.location.reload();
```
