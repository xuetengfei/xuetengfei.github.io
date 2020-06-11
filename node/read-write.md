Node.js 读/写文件 API

### 目的

想获取图片文件夹中的所有图片的文件名字，拼接 url，从而得到图片的 CDN 地址。

### 代码

```javascript
// getImgName.js

let fs = require('fs');
let join = require('path').join;

/**
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
  let result = [];
  function finder(path) {
    let files = fs.readdirSync(path);
    files.forEach((val, index) => {
      let fPath = join(path, val);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) result.push(fPath);
    });
  }
  finder(startPath);
  return result;
}

// fileNames
let ImgfileNames = findSync('./banner');

//删除mac的文件.DS_Store
let nameArray = ImgfileNames.splice(1, fileNames.length);

// 拼接一下
let HandledName = nameArray.map(v => {
  return (v = v.replace(/banner/, 'https://asset.shaozi.com/gw/vueimg') + '\r');
});

/**
 * 写一个 test.txt
 */
fs.writeFile(__dirname + '/test.txt', HandledName, { flag: 'a' }, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('写入成功');
  }
});
```

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/node-write-1.jpg"  style="margin:0 auto;" width="550px">

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/node-write-2.jpg"  style="margin:0 auto;" width="550px">

---

参考链接：

1. [javascript - nodejs 的 FS 或 path 如何获取某文件夹下的所有文件的文件名呢。 - SegmentFault 思否](https://segmentfault.com/q/1010000008827322)
2. [node.js fs.open 和 fs.write 读取文件和改写文件 - 邬凉城 - 博客园](https://www.cnblogs.com/wushanbao/p/7003308.html)
