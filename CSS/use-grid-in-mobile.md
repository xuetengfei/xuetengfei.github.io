<div class='lightbox'>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/grid-3-1553248611.jpg' width='300px' />
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/grid-1-1553248611.jpg' width='300px' />
<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/grid-4-1553248611.jpg' width='300px' /> -->
</div>
<br/>
<div class='lightbox'>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/grid-layout-1554396770.jpg' width="400px"/>
</div>

```css
.myAccount {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 6vh 18vh 6vh auto;
}

/* ..other style. */
```

## 用着好爽

FlexBox:行布局 Grid:网格布局。我在 react 项目中抽取的公共组件`Header`，高度`6vh`,`flex`布局中，一直用`margin-top:6vh`来处理这个的布局。 Grid 在布局这种移动端，不要太爽，之前习惯用 flexbox，无休止的`flex:1`现在完全不需要这样写。好久没有研究 css 了。
