desktop 一个元素 hover 样式到了在移动端会出现一点瑕疵，当点击完成后，悬停效果就会停留在这个元素上，hover 后样式会保留。  
解决方案，移动端，删除 hover 效果。利用`@media(hover:hover)`,它是一个新的“ CSS4”媒体查询，只允许在具有悬停功能的设备上应用样式。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/@media-hover-1591685248.jpg'/>

1. [desktop demonstrate](https://static-bookmarks.now.sh/)
2. touchscreen 效果可以手机扫描二维码

   <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/bookmark-qr-code-1591685443.png'/>
