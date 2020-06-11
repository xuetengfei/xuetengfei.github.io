<iframe
     src="https://codesandbox.io/embed/nameless-dawn-sm6e1?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="marquee"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

```javascript
import React from 'react';
import './style.css';

function ReminderBar({ text, bcgColor, color, display, animation }) {
  const Styles = {
    height: display ? '32px' : '0px',
    backgroundColor: bcgColor,
    color,
  };

  return (
    <div className={animation ? 'scrollBar' : 'bar'} style={Styles}>
      {animation ? (
        <>
          <div className="content">{text}</div>
          <div className="content">{text}</div>
        </>
      ) : (
        <div className="txt">{text}</div>
      )}
    </div>
  );
}

ReminderBar.defaultProps = {
  // 组件显示隐藏状态，默认显示
  display: true,
  // 是否开启跑马灯，默认开启
  animation: true,
  text: 'MISS TEXT',
  bcgColor: '#FFF2E5',
  color: '#E48F6E',
};

export default ReminderBar;
```

```scss
$H: 32px;
$T: 16s;
$DT: 8s;

.bar {
  width: 100vw;
  overflow: hidden;
  line-height: $H;
}
.scrollBar {
  @extend .bar;
  position: relative;
}

.txt {
  line-height: $H;
  text-overflow: ellipsis;
  padding-left: 12px;
}
.content {
  @extend .txt;
  position: absolute;
  left: 100%;
  top: 0px;
  padding-left: 0;
  white-space: nowrap;
  -webkit-animation: move $T linear infinite;
  animation: move $T linear infinite;
}

.content:last-child {
  -webkit-animation: move $T linear $DT infinite;
  animation: move $T linear $DT infinite;
}

.scrollBar:hover .content {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}

@-webkit-keyframes move {
  0% {
    -webkit-transform: translate(0%);
  }
  100% {
    -webkit-transform: translate(-250%);
  }
}

@keyframes move {
  0% {
    transform: translate(0%);
  }
  100% {
    transform: translate(-250%);
  }
}
```
