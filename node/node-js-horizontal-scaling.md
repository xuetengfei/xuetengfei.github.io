暂时不讨论 K8S

## 水平扩展 VS 垂直扩展

使用移动硬盘储存文件，如果只有一个 1T 移动硬盘，容量不够用了怎么办？有两种解决方
案。第一种方案：升级设备，既再买一个更大容量的移动硬盘。 1T 移动硬盘升级到 2T 移
动硬盘,相当于更新了设备。这个就是叫垂直缩放。第二种方案：使用 NAS 这类的东西。把
多个移动硬盘，组成一个 NAS 系统，容量不够用的话，再买一个小的移动硬盘，插入 NAS
系统。这就是水平扩展。

> 水平扩展是指通过向资源池中添加的更多的机器，  
> 垂直扩展指的是向已存在的机器中添加更大的功率（CPU，RAM）。

比如下面这张图，服务器机架上的机器,在水平方向的添加更多的机器，在垂直的方向上添
加更多的资源。

![scaling-horizontally-and-vertically.png](https://blog-1252349778.cos.ap-beijing.myqcloud.com/2018/scaling-horizontally-and-vertically.png)

## 传统的方式:Nginx

如果想按传统的方式来做，可以部署一台机器并用 NGINX 设置一个均衡器。指向上游的反
向代理的配置。

```nginx
http {
 upstream myapp1 {
	 server srv1.example.com;
	 server srv2.example.com;
	 server srv3.example.com;
 }
 server {
	 listen 80;
	 location / {
		 proxy_pass http://myapp1;
	 }
 }
}
```

通过这种方式，负载均衡器将是应用程序暴露给外部世界的唯一入口点。如果担心它成为基
础架构的单点故障，可以部署多个指向相同服务器的负载均衡器。
