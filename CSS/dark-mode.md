1.prefers-color-scheme

```js
if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
  console.log('🎉 Dark mode is supported');
}
```

```css
/* light mode by default */
body {
  background-color: white;
  color: black;
}
@media screen and (prefers-color-scheme: dark) {
  body {
    background-color: #444;
    color: #e4e4e4;
  }
  a {
    color: #e39777;
  }
  img {
    filter: grayscale(30%);
  }
}
```

2.toggle dark mode

```css
.dark-mode:not(img) {
  background-color: black;
  filter: invert(100%) hue-rotate(180deg);
}
```

```javascript
document.getElementById('btn').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
```

[xuetengfei's browser bookmark](https://xtf-bookmarks.vercel.app/)

---

1. [web-dev: Hello darkness](https://web.dev/prefers-color-scheme/)
2. [Dark Mode in CSS | CSS-Tricks](https://css-tricks.com/dark-modes-with-css/)
