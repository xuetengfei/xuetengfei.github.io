```html
<body>
  <div class="container">
    <div class="header">HEADER</div>
    <div class="menu">MENU</div>
    <div class="content">CONTENT</div>
    <div class="footer">FOOTER</div>
  </div>
</body>
```

```css
html,
body {
  height: 100%;
}
.container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 50px auto 50px;
  grid-gap: 5px;
  grid-template-areas:
    'h h h h h h h h h h h h'
    'm m c c c c c c c c c c'
    'f f f f f f f f f f f f';
  .header {
    grid-area: h;
    background-color: #bcf0bd;
  }
  .menu {
    grid-area: m;
    background-color: #fce78c;
  }
  .content {
    grid-area: c;
    background-color: #8ffcf8;
  }
  .footer {
    grid-area: f;
    background-color: #debaf6;
  }
}

@media screen and (max-width: 640px) {
  .container {
    grid-template-areas:
      'h h h h h h m m m m m m '
      'c c c c c c c c c c c c'
      'f f f f f f f f f f f f';
  }
}
```

<a href="../html/use-grid-2-layout.html"  target="_blank">查看效果</a>

---

1. [How to prototype websites quickly with CSS Grid – freeCodeCamp.org](https://medium.freecodecamp.org/how-to-prototype-websites-quickly-with-css-grid-ffc9cba08583)
2. [如何使用 CSS Grid 快速而又灵活的布局-WEB 前端开发](https://www.css88.com/archives/8512)
