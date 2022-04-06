![20220304-s0GTDZ-439_22631014519_](https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20220304-s0GTDZ-439_22631014519_.jpg)

| 属性名    | 描述             |
| --------- | ---------------- |
| navigator | 浏览器信息       |
| location  | 浏览器定位和导航 |
| history   | 窗口浏览器历史   |
| screen    | 屏幕信息         |

### navigator

1. `window.navigator.userAgent` 可以判断浏览器。

```javascript
window.navigator.userAgent;

/*
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36"
*/
```

### location

```javascript
window.location.assign(url) 载入新的 url，记录浏览记录
window.location.replace(url) 载入新的 url 不记录浏览记录
window.location.reload() 重新载入当前页
```

```
http://www.github.com:8080/index.html?user=li-xinyang&lang=zh-CN#home
  |          |          |       |                  |              |
protocol     |          |       |                  |              |
          hostname     port     |                  |              |
              \        /    pathname             search          hash
                 host
```

### Window 事件

| 事件名       | 描述                                                 |
| ------------ | ---------------------------------------------------- |
| load         | 文档和所有图片完成加载时                             |
| unload       | 离开当前文档时                                       |
| beforeunload | 和 unload 类似，但是它提供询问用户是否确认离开的机会 |
| resize       | 拖动改变浏览器窗口大小时                             |
| scroll       | 拖动浏览器时                                         |

### Window 方法

| 方法                                                 | 描述               |
| ---------------------------------------------------- | ------------------ |
| alert(), confirm() 返回真假, prompt() 返回用户输入值 | 三种对话框         |
| setTimeout(), setInterval()                          | 计时器             |
| open(), close()                                      | 开启窗口，关闭窗口 |
