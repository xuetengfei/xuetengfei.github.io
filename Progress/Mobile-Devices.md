[AlloyTeam/Mars: 腾讯移动 Web 前端知识库](https://github.com/AlloyTeam/Mars)

---

## iOS 300ms 延迟

不要太纠结于此。

click 事件普遍 300ms 的延迟 在手机上绑定 click 事件，会使得操作有 300ms 的延迟，
体验并不是很好。

您只需要在`<head>`页面中进行以下操作：

```html
<meta name="viewport" content="width=device-width" />
```

这会将视口宽度设置为与设备相同，并且通常是针对移动设备优化的网站的最佳做法。使用
此标记，浏览器假设您已在移动设备上显示文本，并且删除了双击缩放功能以支持更快的点
击次数。

如果由于某种原因您无法进行此更改，您可以使用`touch-action: manipulation`在整个页
面或特定元素上实现相同的效果

```css
.el {
  touch-action: none;
}
```

[300ms tap delay, gone away  |  Google Developers](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away)

[使用 RAIL 模型评估性能 |  Google Developers](https://developers.google.com/web/fundamentals/performance/rail)

[More Responsive Tapping on iOS | WebKit](https://webkit.org/blog/5610/more-responsive-tapping-on-ios/)

## 禁止 iOS 识别长串数字为电话

```

<meta content="telephone=no" name="format-detection" />
```
