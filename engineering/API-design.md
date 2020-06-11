## Request、HTTP、URL

1. HTTP verb
2. HTTP header  
   • 将具体接口业务无关的数据放在 HTTP Headers 签名、加密 、Token 身份认证
3. HTTP 状态码  
   • URL 的 path 部分，使用 系统/模块/操作 的格式，如 app/account/login
4. API 参数：将参数传递给 API 的方法有很多：标头，查询参数，请求主体。

## Responses

1. 返回合适的状态码

```
HTTP/1.1 200 OK
```

HTTP 状态码(通信状态码)

- 200：业务已处理
- 400：请求错误
- 401：Unauthorized
- 403：Forbidden
- 500：Internal Server Error

业务状态码,业务相关的原因，要区分表示，自己定义 responseCode

2. Responses Body Format

```json
{
  "code": 1, // 1 success 0 failure
  "message": "操作成功",
  "data": {},
  "errors": {
    "title": "不能为空"
  }
}
```

3. 构造请求和响应体

   • lowerCamelCase
   • 空值处理,在数据传输时，不能省略空值字段，key=null。严格遵守文档协议
   • 分层对象的嵌套资源
   • 多个资源名称与单个资源名称

bad

```json
{
  "id": "123-123-123",
  "userId": "123",
  "userName": "xxx",
  "userAvatar": "https://xxx.xxx.xxx/avatar.png"
}
```

good

```json
{
  "id": "123-123-123",
  "user": {
    "id": "123",
    "name": "xxx",
    "avatar": "https://xxx.xxx.xxx/avatar.png"
  }
}
```

未完待续...

---

1. [aisuhua/restful-api-design-references: RESTful API 设计参考文献列表，可帮助你更加彻底的了解 REST 风格的接口设计。](https://github.com/aisuhua/restful-api-design-references)
2. [cocoajin/http-api-design-ZH_CN: HTTP API 设计指南(http-api-design-ZH_CN)，翻译自 https://github.com/interagent/http-api-design](https://github.com/cocoajin/http-api-design-ZH_CN)
3. [API 设计模式和最佳实践| API 指南](https://www.moesif.com/blog/api-guide/api-design-guidelines/)
