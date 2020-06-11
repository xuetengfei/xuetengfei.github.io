由于工作的需要，需要把某个页面下的所有 a 标签都设置为新开新窗口，即：

```javascript
<a href="XXX">
```

增加 target：

```html
<a href="XXX" target="_blank">
```

但是由于这个页面有 500 多个 a 标签，并且有的 a 标签已经有 target 属性，有的没有，手动一个一个加显然是不可能的.
可以在 head 标签中加入：`<base target="_blank" />`

```html
<head>
 <meta charset="utf-8">
 <meta content="IE=edge, chrome=1" http-equiv="X-UA-Compatible">
 <base target="_blank" />
</head>
```

成功。

---

还找到一个自动刷新的 `meta`

```
 <meta http-equiv="refresh" content="60">
```
