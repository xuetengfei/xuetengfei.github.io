```css
.grid {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr 1fr;
  /* grid-template-columns: minmax(200px, 50%) 1fr 1fr; */
  /* grid-template-columns: minmax(200px, 1fr) 1fr 1fr; */
  /* grid-template-columns: minmax(max-content, max-content) 1fr 1fr; */
  /* grid-template-columns: minmax(min-content, min-content) 1fr 1fr; */
  /* grid-template-columns: minmax(auto, auto) 1fr 1fr; */
}
```

```javascript
minmax(min, max);
// Length 丨 Percentage丨 Flexible Length丨 max-content丨 min-content丨 auto
```

## 无媒体查询的响应式设计

```javascript
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/responsive-1554176638.gif'/>

---

1. [How the minmax() Function Works](https://bitsofco.de/how-the-minmax-function-works/)
