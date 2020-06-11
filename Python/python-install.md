## mac 环境安装

```bash
brew install python3
```

#### 安装出现的问题

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2018-07-10_14-47-05.jpg"  data-action="zoom" style="margin:0 auto;" width="550px">
<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2018-07-10_14-47-30.jpg"  data-action="zoom" style="margin:0 auto;" width="550px">
<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2018-07-10_14-55-13.jpg"  data-action="zoom" style="margin:0 auto;" width="550px">

[Permissions issue when linking python3 · Issue #19286 · Homebrew/homebrew-core](https://github.com/Homebrew/homebrew-core/issues/19286)

```
>sudo mkdir /usr/local/Frameworks
>sudo chown $(whoami):admin /usr/local/Frameworks
```

```
~ » python -V
Python 2.7.10
------
~ » python3 -V
Python 3.7.0
```
