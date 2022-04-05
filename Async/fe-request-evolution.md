前端是一个快速发展的领域，而在前端的技术栈当中，前端请求又是最见的一个领域，通过
请求接口数据，才能将一个静态的页面动态化。

## XMLHttpRequest

XMLHttpRequest 是个比较粗燥的底层对象

```javascript
var xhr;
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) {
  // IE
  try {
    xhr = new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e) {
    try {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {}
  }
}
if (xhr) {
  xhr.onreadystatechange = onReadyStateChange;
  xhr.open('POST', '/api', true);
  // 设置 Content-Type 为 application/x-www-form-urlencoded
  // 以表单的形式传递数据
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('username=admin&password=root');
}

// onreadystatechange 方法
function onReadyStateChange() {
  // 该函数会被调用四次
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log('执行成功');
  } else {
    console.log('执行出错');
  }
}
```

## Jquery Ajax

Jquery 时代，几乎统治了前端 10 年有余.

```javascript
$.ajax({
  //标准写法
  type: 'POST',
  url: url,
  data: data,
  dataType: dataType,
  success: function () {},
  error: function () {},
});
$.get(url, function () {}); //get请求
$.post(url, body, function () {}); //post请求
$.getJSON(url, function () {}); //get请求从服务器加载Json编码
```

## Fetch

fetch 脱离的 XHR，完全是基于 Promise 的异步处理机制，使用起来会比起 ajax 更加简
单。  
更加底层，提供的 API 丰富（request, response），语法简单，脱离了 XHR，基于 ES 新
的 Promise 设计。使用 fetch 的代码会相比 xhr 来说更具有条理性

Fetch 存在一定的缺点:  
1、兼容性比较凄惨 2、不支持 jsonp，可以引入 fetch-jsonp 3、没有 abort，不支持
timeout 超时处理 4、无法获取 progress 状态 5、没有拦截器，需要额外再封装一层或者
fetch-interceptor 6、默认不带 cookie，需要添加配置

```javascript
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log('Oops, error', e));
```

## Axios

Axios 本身也是对原生 XHR 的封装。  
支持 node，创建 http 请求、支持 Promise API、客户端防止 CSRF：每个请求带一个
cookie 拿到的 key、拦截请求和响应、可取消请求

```javascript
axios({
    method: 'GET',
    url: url,
})
.then(res => {console.log(res)})
.catch(err => {console.log(err)})

// get请求
axios.get(url)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// post请求
axios.post（‘/user’, {
    name: 'Jerry',
    lastName: 'Liang'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
