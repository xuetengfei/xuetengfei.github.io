# Nginx CLI Cheatsheet

?> 检查 Nginx Web 服务器

```bash
systemctl status nginx
```

```bash
nginx -t
```

?> 停止

```bash
sudo systemctl stop nginx
```

```bash
nginx -s quit
```

?> 加载

```bash
sudo systemctl start nginx
```

?> 重新加载

```bash
sudo systemctl restart nginx
```

```bash
nginx -s reload
```

?> Fast Shutdown

```bash
nginx -s stop
```

```bash
nginx -s quit
```

?> 得到正在运行的 ngixn 进程列表

```bash
ps -ax | grep nginx
ps -ef|grep nginx|grep -v grep
```

?> 在 Mac 中方便的安装软件或者卸载软件

```
brew search nginx 			# brew 查询Nginx
brew install nginx			# brew 安装Nginx
brew list nginx         # 来显示nginx安装路径：
```

---

<!-- ```
# Default server configuration
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        gzip on;
			  root /home/ubuntu/data/www/xxx/dist;
        location / {
		    try_files $uri $uri/ /index.html;
        }
        location /service {
		    proxy_pass http://00.00.00.00:00;
            proxy_set_header   X-Forwarded-Proto $scheme;
            proxy_set_header   Host              $http_host;
            proxy_set_header   X-Real-IP         $remote_addr;
        }
}
``` -->

```
server {
  # 配置网络监听
  # 监听所有的 80
  listen 80;

  # 基于名称的虚拟主机配置
  server_name design.luweitech.cn;

  # 配置请求的根目录
  # Web 服务器收到请求后，首先要在服务端指定的目录中寻找请求资源
  root /xxx/abc;

  # 设置网站的默认首页
  index index.html;

  location / {
    proxy_pass http://localhost:端口号;
  }

  location /favicon.ico {
    # 过期时间设置 12 小时
    expires 12h;
  }

  location ~ .*\.(js|css)?$ {
     # proxy_pass http://localhost:端口号;
     expires 12h;
  }
}

```

### 配置文件结构

nginx 由模块组成，这些模块由配置文件中指定的指令控制。指令分为「 简单指令 」和「 块指令 」。一个简单的指令由「 名称 」和 「 参数 」组成，这些名称和参数由空格分隔，并以分号「 ; 」结尾。 块指令具有与简单指令相同的结构，但它的结尾不是分号，而是一组由大括号「 ({、}) 」包围的附加指令。如果一个块指令在大括号中包含其他指令，则这个块指令又叫做上下文 (例如: events, http, server, 和 location).

### 提供静态资源内容

```bash
server {
    location / {
        root /data/www;
    }

    location /images/ {
        root /data;
    }
}
```

一个正常的服务器配置文件监听在 80 端口上，并且可以在本机上成功访问「 http://localhost/ 」。
以 `/images/` 开头请求的 URI 地址，服务器会从 `/data/images` 文件夹下面返回对应的文件。例如，请求 `/data/images/example.png` 这个文件，nginx 服务器会返回 `http://localhost/images/example.png` 如果服务器没有这个文件会返回 404 错误。 不是以 `/images/` 头的请求,就会被映射到 `/data/www` 文件夹。 例如, 请求 `nginx/data/www/some/example.html` 服务器会响应 `http://localhost/some/example.html`这个文件。

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/nginx-1564536995.svg'/>

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/blog-img-5-1564537543.jpg'/>

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/blog-img-4-1564537543.jpg'/>

<!-- code2flow -->
<!--


function 监听 80 端口 {
  请求 /Pets/images/dog.png 文件
};

try {
  Nginx;
  server;
  root;
  location;
} catch(/) {
  root /data/www;
} catch(/images/) {
  root /data;
}
return;

Nginx;
call 监听 80 端口;
if(/images/ 开头吗？) {
  /data/images;
  if(dog.png文件存在吗？){
    nginx 服务器会返回
    http://localhost/image/dog.png;
    return;
  }
  404 错误;
  return;
}
/data/www;



[Nginx 入门指南 - 众成翻译](https://www.zcfy.cc/article/nginx-beginner-s-guide)

1. [Nginx 状态码配置和错误文件 | Nginx 入门教程](https://xuexb.github.io/learn-nginx/example/error-page.html)

1. [Nginx配置详解 - 张龙豪 - 博客园](https://www.cnblogs.com/knowledgesea/p/5175711.html)

2. [如何在Ubuntu 18.04上安装Nginx](https://www.howtoing.com/how-to-install-nginx-on-ubuntu-18-04/)

 -->

1. [nginxconfig.io](https://nginxconfig.io/)
2. [nginx-beginner-s-guide](https://www.zcfy.cc/article/nginx-beginner-s-guide)
