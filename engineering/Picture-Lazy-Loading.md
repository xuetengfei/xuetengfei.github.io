对于图片过多的页面，为了加速页面加载速度，所以很多时候需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样子对于页面加载性能上会有很大的提升，也提高了用户体验。

## 方法一: addEventListener scroll

事件侦听浏览器中的 scroll、 resize、 orientationChange 事件。滚动事件非常明显，因为它会在滚动发生时监视用户在页面上的位置。resize 和 orientationChange 事件同等重要。当浏览器窗口大小更改时，将发生 resize 事件，而当设备从横向旋转到纵向（反之亦然）时，会触发 orientationChange。

```javascript
document.addEventListener('DOMContentLoaded', function () {
  var lazyloadImages = document.querySelectorAll('img.lazy');
  var lazyloadThrottleTimeout;

  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
      // 函数截流的方式，进行性能优化
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      var scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        if (img.offsetTop < window.innerHeight + scrollTop) {
          // 核心: 通过计算高度，判断 img 是否进入视口，如果「是的」加载。
          img.src = img.dataset.src;
          img.classList.remove('lazy');
        }
      });
      if (lazyloadImages.length == 0) {
        document.removeEventListener('scroll', lazyload);
        window.removeEventListener('resize', lazyload);
        window.removeEventListener('orientationChange', lazyload);
      }
    }, 20);
  }

  document.addEventListener('scroll', lazyload);
  window.addEventListener('resize', lazyload);
  window.addEventListener('orientationChange', lazyload);
});
```

[Lazy loading images using event handlers - example code](https://codepen.io/imagekit_io/pen/MBNwKB)

## 方法二:IntersectionObserver API 实现懒加载

可以使用**IntersectionObserver**判断图片是否进入适口，比之前计算高度的方式，更简单优雅。还有很多的浏览器不支持这个 API。没事，问题不大，官方垫片用起来。[w3c · IntersectionObserver · polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)。

```md
npm install intersection-observer --save-dev
```

```javascript
// 项目入口引入 intersection-observer
import 'intersection-observer';
```

```html
<!-- 简单样式一下 -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Lazy load - IntersectionObserver</title>
    <style>
      img {
        display: block;
        width: 300px;
        border: 4px solid #000;
        margin-bottom: 1000px;
      }
    </style>
  </head>
  <body>
    <img src="loading.gif" data-src="https://picsum.photos/100/100" alt="1" />
    <img src="loading.gif" data-src="https://picsum.photos/110/110" alt="2" />
    <img
      src="loading.gif"
      data-src="https://picsum.photos/200/300?random=1"
      alt="3"
    />
    <img
      src="loading.gif"
      data-src="https://picsum.photos/200/300?random=2"
      alt="3"
    />
    <img
      src="loading.gif"
      data-src="https://picsum.photos/200/300?random=3"
      alt="3"
    />
    <img
      src="loading.gif"
      data-src="https://picsum.photos/200/300?random=4"
      alt="4"
    />
    <img
      src="loading.gif"
      data-src="https://picsum.photos/200/300?random=5"
      alt="5"
    />
    <img
      src="loading.gif"
      data-src="https://picsum.photos/200/300?random=6"
      alt="6"
    />
    <img
      src="loading.gif"
      data-src="https://picsum.photos/200/300?random=7"
      alt="7"
    />
    <img
      src="loading.gif"
      data-src="https://picsum.photos/200/300?random=8"
      alt="8"
    />
    <img
      src="loading.gif"
      data-src="https://picsum.photos/200/300?random=9"
      alt="9"
    />
    <img
      src="loading.gif"
      data-src="https://picsum.photos/200/300?random=10"
      alt="10"
    />
  </body>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const imageObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            imgObserver.unobserve(entry.target); // 解除观察
          }
        });
      });
      document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
      });
    });
  </script>
</html>
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200603115630lazy-Images-using-the-Intersection-Observer-API.jpg' alt='20200603115630lazy-Images-using-the-Intersection-Observer-API'/>

1. [codepen demo: Intersection Observer - Lazy Load](https://codepen.io/rpsthecoder/pen/pByZjR?editors=1010)
2. [A Few Functional Uses for Intersection Observer to Know When an Element is in View | CSS-Tricks](https://css-tricks.com/a-few-functional-uses-for-intersection-observer-to-know-when-an-element-is-in-view/)
3. [Lazy Loading Images using the Intersection Observer API](https://blog.bitsrc.io/lazy-loading-images-using-the-intersection-observer-api-5a913ee226d#:~:text=Lazy%20Loading%20Images%20using%20Intersection,and%20placed%20in%20the%20view.)

## 方法三：第三方库 lazysizes

这个 demo 中，使用[lazysizes](https://github.com/aFarkas/lazysizes)。我总共要请求 300 张图片。首先，先加载前面可视区域内的图片，网络请求如下图所示。

```
yarn add lazysizes
```

```javascript
// 项目入口引入 lazysizes
import 'lazysizes';
```

#### ImageWaterfall.js

```javascript
import React, { useState, useEffect } from 'react';

export default function ImageWaterfall() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:6351/ImageItems')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="c">
      {data &&
        data.map(v => (
          <React.Fragment key={v.id}>
            <div>
              <p>{v.id}</p>
              <img
                data-src={v.url}
                loading="lazy"
                alt=""
                className="lazyload  blur-up"
              />
            </div>
          </React.Fragment>
        ))}
    </div>
  );
}
```

`效果以及request Waterfall`

<img
  src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/img-lazyload-1555747466.jpg"
/>

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/lazy-load-1557220030.jpg'/>

#### 提升用户体验

添加额外的模糊过度样式，可以提升用户体验，下面的 css 效果是这样的。
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/blur-css-img-1555747251.jpg' width="700px"/>

```
<style>
	.blur-up {
		-webkit-filter: blur(5px);
		filter: blur(5px);
		transition: filter 400ms, -webkit-filter 400ms;
	}

	.blur-up.lazyloaded {
		-webkit-filter: blur(0);
		filter: blur(0);
	}
</style>

<img src="lqip-src.jpg" data-src="image.jpg" class="lazyload blur-up" />

```

## 后话

谷歌浏览器（75+）未来会支持元素的图片懒加载。Chrome 的延迟加载实现不仅基于当前滚动位置的接近程度，还基于连接速度。

```html
<img src="celebration.jpg" loading="lazy" alt="..." />
<iframe src="video-player.html" loading="lazy"></iframe>
```

后续更新: 谷歌浏览器已经原生支持元素的图片懒加载

[Native image lazy-loading for the web!](https://addyosmani.com/blog/lazy-loading/)

```html
<!-- Let's load this in-viewport image normally -->
<img src="hero.jpg" alt=".." />

<!-- Let's lazy-load the rest of these images -->
<img data-src="unicorn.jpg" loading="lazy" alt=".." class="lazyload" />
<img data-src="cats.jpg" loading="lazy" alt=".." class="lazyload" />
<img data-src="dogs.jpg" loading="lazy" alt=".." class="lazyload" />

<script>
  /*  Feature detection */
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img.lazyload');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Dynamically import the LazySizes library
    let script = document.createElement('script');
    script.async = true;
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js';
    document.body.appendChild(script);
  }
</script>
```

```javascript
(async () => {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img.lazyload');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    const lazySizesLib = await import('/lazysizes.min.js');
    lazySizes.init(); // lazySizes works off a global.
  }
})();
```

---

1. [The Complete Guide to Lazy Loading Images | CSS-Tricks](https://css-tricks.com/the-complete-guide-to-lazy-loading-images/)
