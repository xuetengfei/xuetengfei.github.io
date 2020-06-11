#### 匹配所以空白行

```bash
^\n
```

#### 在开发时遇到了这样一个问题，vscode 是有模块跳转的功能的（一般为 ctrl+左击或 alt+左击），但是在设置了 webpack 的路径别名之后这个功能失效了。

- 1.在项目根位置创建一个 jsconfig.json
- 2.配置 jsconfig.json

```javascript
{
  "include": [
    "./src/**/*"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
        "components/*": ["src/components/*"],
        "utils": ["src/utils/utils.js"],
    },
  }
}
```

- 3.重启，搞定！

---

<!-- [vscode 路径别名问题 · Issue #12 · luke93h/git-blog](https://github.com/luke93h/git-blog/issues/12) -->

---

1. [Huachao/vscode-restclient: REST Client Extension for Visual Studio Code](https://github.com/Huachao/vscode-restclient)
2. [使用顶级 VSCode 扩展来加快开发 JavaScript – WEB 前端开发 - 专注前端开发，关注用户体验](http://www.css88.com/archives/9507)
