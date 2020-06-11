1. [npm 模块管理器 -- JavaScript 标准参考教程（alpha）](https://javascript.ruanyifeng.com/nodejs/npm.html)
2. [npm Documentation](https://docs.npmjs.com/)
3. [npm-package.json | npm Documentation](https://docs.npmjs.com/files/package.json)
4. [[译]10 个 NPM 使用技巧 · Issue #40 · dwqs/blog](https://github.com/dwqs/blog/issues/40)
5. [parro-it/awesome-micro-npm-packages: A curated list of small, focused npm packages.](https://github.com/parro-it/awesome-micro-npm-packages)

#### nls:一键查看所有 script

在公司我同时维护着，好几个项目，技术栈也分为 vue 和 react 。切换项目的时候，总要回想一下 开发环境的脚本是哪一个？切换测试环境是那一个？eslint 脚本是那一个？ 用的是 npm 还是 yarn ？每次都要打开 package.json 去查看 script 吗？还是那一句话，偷懒是第一生产力。

```javascript
npm install -g nls
```

```bash
npm i -g ntl
```

去 [npm 官网](https://www.npmjs.com/)找工具，对比了好几个工具，挑了一个这个[nls](https://www.npmjs.com/package/nls)。全局安装，就可以使用，不需要每个项目文件都本地安装，小巧方便。

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2018-07-11_22-05-58.jpg"  data-action="zoom" style="margin:0 auto;" width="550px">

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/nls-screenshot.png"  data-action="zoom" style="margin:0 auto;" width="550px">

1. [mengdu/log.js: node.js 控制台日志打印工具](https://github.com/mengdu/log.js)
1. [anywhere - npm](https://www.npmjs.com/package/anywhere)
1. [qs - npm](https://www.npmjs.com/package/qs)A querystring parsing and stringifying library with some added security.
1. [assert - npm](https://www.npmjs.com/package/assert)This module is used for writing unit tests for your applications, you can access it with require('assert').
1. [once - npm](https://www.npmjs.com/package/once)once ：Only call a function once.
1. [required-pm - npm](https://www.npmjs.com/package/required-pm)ensures all required parameters are not null, or throws a useful error like "phone is required"
1. [sindresorhus/trash: Move files and folders to the trash](https://github.com/sindresorhus/trash)
1. [zsh oh-my-zsh 插件推荐](https://hufangyun.com/2017/zsh-plugin/)
1. [spy-debugger - npm](https://www.npmjs.com/package/spy-debugger) 真机调试
1. [clone - npm](https://www.npmjs.com/package/clone)
1. [blacklist - npm](https://www.npmjs.com/package/blacklist)
1. [ignore - npm](https://www.npmjs.com/package/ignore)
1. [micromatch - npm](https://www.npmjs.com/package/micromatch)
1. [hiper: A statistical analysis tool for performance testing](https://github.com/pod4g/hiper)

#### Tips and Tricks

```bash
npm help
npm help <command>
npm <command> -h
npm list
npm list --depth=0
npm home <package>
npm home <package>
npm docs <package>
npm bugs <package>
npm outdated
```

Fixing Global Module Permissions

Linux-like systems can throw permission errors when you attempt to install global packages. You can prepend sudo to any npm command but that’s a dangerous option. A better solution is to change npm’s default directory to one you own:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

Add the following line to`~/.bashrc or ~/.zshrc`as appropriate using your text editor of choice:

```bash
export PATH="$HOME/.npm-global/bin:$PATH"
```

Reload the shell configuration file (source ~/.bashrc) then reinstall npm itself to the new user-owned location:

```bash
npm install -g npm
```

Managing Your Packages

```bash
npm version (v)1.2.3 # 显示设置版本号为 1.2.3
npm version major # 大版本号加 1，其余版本号归 0
npm version minor # 小版本号加 1，修订号归 0
npm version patch # 修订号加 1
```

bin 字段工作原理,package.json 中的 bin 字段,package.json 中的字段 bin 表示的是一个可执行文件到指定文件源的映射。例如在@vue/cli 的 package.json 中：https://docs.npmjs.com/files/package.json.html#bin

```bash
"bin": {
"vue": "bin/vue.js"
}
```

preuild 和 postbuild 这样的脚本，它们允许你定义在构建脚本之前或之后运行的代码。但事实上，pre 和 post 可以在任何脚本之前添加，包括自定义脚本。这不仅使你的代码更干净，而且还允许你单独运行 pre 和 post 脚本

```json
{
  "predeploy": "npm version patch"
}
```

在不同的目录中运行脚本,第一种是手动 cd 并运行对应的命令：复制代码,但还有一个更优雅的解决方案，即使用--prefix 标志指定路径:

```bash
cd folder && npm start && cd ..
npm start --prefix path/to/your/folder
```

---

1. [10 Tips and Tricks That Will Make You an npm Ninja — SitePoint](https://www.sitepoint.com/10-npm-tips-and-tricks/)
