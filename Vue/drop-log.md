?> 在打包的时候去掉vue里面脚本的`console.log`


```javascript
// webpack.config.js

new webpack.optimize.UglifyJsPlugin({
  compress:{
    warnings: false,
    drop_debugger: true,
    drop_console: true
  }
})

```
