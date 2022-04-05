Fetch API 已经快要五岁了。再加上 ES6+ 的普及，我们早已习惯了基于 Promise 和
async/await 的异步编程，不少同学也转而使用 Fetch API 作异步请求。XMLHttpRequest
也被不少同学束之高阁。

先说一下 ajax 。ajax 创建一个 XMLHttpRequest 对象用于为客户端提供了在客户端和服
务器之间传输数据的功能，这个 XMLHttpRequest API 设计的其实很粗糙，在一些使用场景
下需要额外的请求配置（Put、Post、Delete），而且使用回掉函数来处理异步请求而不是
使用 Promise 对象。

相比较于 XMLHttpRequest 来说,Fetch API 规范明确了用户代理获取资源的语义。原生支
持 Promise，调用方便，符合语义化。可配合使用 ES2016 中的 async / await 语法，更
加优雅。 fetch() 的写法简单又直观，只要在发起请求时将整个配置项传入就可以了。而
且相较于 XHR 还提供了更多的控制参数，例如是否携带 Cookie、是否需要手动跳转等。

```javascript
const api = 'https://api.some.com';

fetch(api,{
    method: 'POST',
    mode: 'cors',
    headers: {
        'content-type': 'application/json'
    },
    credentials: 'include',
    redirect: 'follow',
    body: JSON.stringify({ foo: 'bar' })
})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log('data', data);
  })
  .catch(function(error) {
    console.log('Fetch Error: ', error);
  });

//  async/await 语法
async function() {
  try {
    const response = await fetch(api);
    const data = response.json();
    console.log('data', data);
  } catch (error) {
    console.log('Fetch Error: ', error)
  }
}
```

---

1. [fetch documentation](https://github.github.io/fetch/)
2. [Fetch Standard](https://fetch.spec.whatwg.org/)
3. [了解 Fetch](https://aotu.io/notes/2017/04/10/fetch-API/index.html)
4. [【翻译】这个 API 很“迷人”——(新的 Fetch API)](https://www.w3ctech.com/topic/854)
