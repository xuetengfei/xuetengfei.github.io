Eslint 解决了代码格式检查的问题，同时，一些有用的提示能让我们发现 bug 和无用代码（如 no-unused-vars, no-extra-bind, no-implicit-globals）。但是，eslint 并不能自动帮我们美化代码，自动让代码风格统一，格式优美。EditorConfig 部分解决了这个问题，它解决了代码缩紧，行末不出现空格符等问题，但是对于统一整个代码的风格，这些做得还是太少了。Prettier 很好地解决了剩下的问题，通过配置，我们可以制定想要的代码风格，然后通过脚本或编辑器插件来一键格式化／美化代码。

#### 安装

```
npm install --save-dev prettier # 本地
npm install --g prettier # 全局
```

#### 编辑器插件

一般我配合编辑器使用 Prettier，安装相应插件，[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 这样我们在写代码时即可美化代码，及时看到效果.

#### 配置文件

如果不编写自己的配置文件，一般会使用 Prettier 插件自带的配置文件。我们希望使用项目自己的配置文件，可以在项目根目录下编写 `.prettierrc` 文件。
prettier 查找配置的方式首先会找当前目录下的 `.prettierrc` 文件，找不到会一直向上级目录查找。
[Configuration File · Prettier](https://prettier.io/docs/en/configuration.html)

```javascript
// .prettierrc

{
  "printWidth": 100,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "requirePragma": false,
  "proseWrap": "preserve"
}
```

#### 完整的配置

[完整的配置参考](http://json.schemastore.org/prettierrc)
