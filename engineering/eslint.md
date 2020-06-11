### 全局安装和初始化配置文件

```
npm install -g eslint

eslint --init
```

### 项目本地安装和初始化配置文件

```
npm install eslint --save-dev

./node_modules/.bin/eslint --init
```

```bash
yarn add eslint-config-airbnb-base@latest eslint-plugin-import@latest
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/eslint-1573022668.png'/>

```json
// eslint脚本自动生产初始化配置文件
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": ["airbnb-base"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {}
}
```

---

- [eslint 中文](http://eslint.cn/)
- [eslint config](http://eslint.cn/docs/user-guide/configuring)
