## token (令牌)

对于初学者来说，对 Token 和 Session 的使用难免会限于困境，开发过程中知道有这个东西，但却不知道为什么要用他？更不知道其原理，今天我就带大家一起分析分析这东西。

## 前言

由于 HTTP 是一种`没有状态`的协议，每次数据请求完成之后就断开链接，而且不存储链接状态。就像是一个失忆的病人，每次看见他老婆都要问“你是谁啊？”。

想象一下，在使用用户名还有密码通过了身份验证后登陆淘宝，查看`我的购物车`就是向服务端发送了一次请求。然后，我想要查看`已买到东西`就需要再次使用账号和密码去核实身份，这样就会非常的麻烦。

## 基于 Session 身份认证验证

对于上述的问题，涉及到身份认证。通用的解决方法就是，当用户请求登录的时候，如果没有问题，在服务端生成一条记录，在这个记录里可以说明登录的用户是谁，然后把这条记录的 id 发送给客户端，客户端收到以后把这个 id 存储在 cookie 里，下次该用户再次向服务端发送请求的时候，可以带上这个 cookie，这样服务端会验证一下 cookie 里的信息，看能不能在服务端这里找到对应的记录，如果可以，说明用户已经通过了身份验证，就把用户请求的数据返回给客户端。

以上所描述的过程就是利用[Session](https://blog.csdn.net/hsf15768615284/article/details/73251205) 那个 id 值就是 sessionid。我们需要在服务端存储为用户生成的 session，这些 session 会存储在内存，磁盘，或者数据库。

## 进阶版，基于 token 身份认证验证

token 的意思是`令牌`，是服务端生成的一串`字符串`，作为客户端进行请求的一个`标识`。

当用户第一次登录后，服务器生成一个 token 并将此 token 返回给客户端，以后客户端只需带上这个 token 前来请求数据即可，无需再次带上用户名和密码。

就像我用`身份证`办理了一张健身房的`会员卡`，每次进入健身房出示会员卡就可以证明我自己会员的身份，而不需要每次去健身房都要出示我的身份证。

和上面的比喻有所出入的就是，token 是有`有效期`。

## token 的本质和使用

简单 token 的组成:uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串。为防止 token 泄露）计算出来的一个`字符串`，一般是 32 位。

> 使用 token 机制的身份验证方法，在服务器端不需要存储用户的登录记录。大概的流程：

(1). 客户端使用用户名和密码请求登录。

(2). 服务端收到请求，验证用户名和密码。验证成功后，服务端加密计算生成处一个 token ，然后把这个 token 发送给客户端。

(3). 客户端收到 token 后把它`存储起来`，可以放在 cookie 或者 Local Storage 里。

(4). 客户端每次向服务端发送请求的时候都需要带上服务端发给的 token。

(5). 服务端收到请求，然后去验证客户端请求里面带着 token，如果验证成功，就向客户端返回请求的数据。

## 服务端 token 使用

服务端生成 user_token 后，返回给客户端（自己存储），客户端每次接口请求时，如果接口需要用户登录才能访问，则需要把 user_id 与 user_token 传回给服务端，服务端接受到这 2 个参数后，需要做以下几步：

1、 检测 api_token 的有效性；

2、 删除过期的 user_token 表记录；

3、 根据 user_id，user_token 获取表记录，如果表记录不存在，直接返回错误，如果记录存在，则进行下一步；

4、 更新 user_token 的过期时间（延期，保证其有效期内连续操作不掉线）；

5、 返回接口数据；

---

参考链接：

1. [简单理解 token 机制 | 人人都是产品经理](http://www.woshipm.com/pd/877760.html)

---

## 实操

### 在`account.js`中定义 token

```javascript
'use strict';
import cookie from '@/lib/cookie';

export const KEY_TOKEN = 'user_token_weixin';
export const saveToken = token => {
  if (window.navigator.cookieEnabled) {
    cookie.setItem(KEY_TOKEN, token, 60 * 60 * 60 * 30);
  } else {
    localStorage.setItem(KEY_TOKEN, token);
  }
};

export const clearToken = () => {
  cookie.removeItem(KEY_TOKEN);
  localStorage.removeItem(KEY_TOKEN);
  window.location.hash = '/login';
};

export const getToken = () => {
  return cookie.getItem(KEY_TOKEN) || localStorage.getItem(KEY_TOKEN);
};
```

### 使用 token

在 token 有效期内,免登陆获取数据等,注意:下面是伪代码

```javascript
import { saveToken, getToken } from '@/lib/account';

if (getToken()) {
  this.haslogined = true;
  this.comfirmRequire = true;
  this.FetchData();
}
const login = () => {
  if (!/^1[2345789]\d{9}$/.test(this.telNum)) {
    return Toast({
      message: '电话格式错误',
      duration: 2000,
    });
  }
  let messageCode = this.messageCode.trim();
  if (messageCode == '') {
    return Toast({
      message: '请填写短信验证码',
      duration: 2000,
    });
  }
  this.$postLoading(verifySmsCodeAPI, {
    // 登录
    orderApplyNum: this.orderApplyNum,
    phone: this.telNum,
    smsCode: messageCode,
  })
    .then(res => {
      if (Number(res.data.code) != 1) return;
      // 已经登陆
      this.haslogined = true;
      saveToken(res.data.data.token); // 保存token
      this.FetchData();
      return;
    })
    .catch(err => {
      // this.flag = true;
      return err;
    });
};
```
