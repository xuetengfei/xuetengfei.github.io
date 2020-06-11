最近，闲来无事。把自己日常的浏览器书签整理成了一个在线的书签。  
地址是:[xuetengfei's Browser bookmark](https://static-bookmarks.now.sh/)

技术整理

```
css: [Spectre](https://picturepan2.github.io/spectre/index.html)
打包工具: [Parcel 中文网](https://parceljs.org/)
```

代码推送到 Github 上面后，触发 Github Action

```yml
name: CI
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run a one-line script
        run: curl -X POST https://api.vercel.com/xxxxxxxx
```

第三方免费托管平台: [Vercel](https://vercel.com)
这个平台之前叫「ZEIT」现在改名叫「Vercel」

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200602-RlKH2g-book-mark-1.jpg' alt='20200602-RlKH2g-book-mark-1'/>

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200602-x8gKgQ-book-mark-2.jpg' alt='20200602-x8gKgQ-book-mark-2'/>

未完待续
