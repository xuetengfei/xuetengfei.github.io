Create React App 脚手架中添加`source-map-explorer`

```
yarn add source-map-explorer
```

```diff
 "scripts": {
+    "analyze": "source-map-explorer 'build/static/js/*.js'",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",

```

```
yarn build
yarn analyze

```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/analyze-souce-map-1555748365.jpg'/>

很明显,这个项目中我引入的 icon 库，全部加载进去了,占了一半的文件大小，那么，就需要进一步优化一下。
