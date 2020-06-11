访问这个网站[https://ipecho.net/](https://ipecho.net/)可以返回自己网络的 IP 地址,自己也可以实现相同的功能。

配置 nginx 是的访问 `/ip` 返回访问者的 ip 地址,配置方式如下

```
location /ip {
    default_type text/plain;
    return 200 $remote_addr;
}
```

```
$ curl https://example.com/ip
2001:1b48:103::189
```

```
location /ip {
    default_type application/json;
    return 200 "{\"ip\":\"$remote_addr\"}";
}
```

```
$ curl -s https://example.com/ip
{"ip": "2001:1b48:103::189"}
```

## 其他

比如访问这个网站 [http://ip.tacquet.be/?pretty=1](http://ip.tacquet.be/?pretty=1) 就可以返回更多的电脑网络数据

```json
{
  "ip": "00.00.00.00",
  "city": "Tokoy",
  "region": "Tokoy District",
  "country": "JP",
  "country_full": "Japan",
  "continent": "JP",
  "continent_full": "Asia",
  "loc": "00.00,00.00",
  "postal": ""
}
```

```
curl https://httpbin.org/get
```

```json
{
  "args": {},
  "headers": {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Host": "httpbin.org",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:70.0) Gecko/20100101 Firefox/70.0"
  },
  "origin": "00.00.00.000, 00.00.00.000",
  "url": "https://httpbin.org/get"
}
```

<!--


1 .[Public IP Address API with two lines of Nginx config](https://www.ecalamia.com/blog/show-ip-api-nginx/)



-->
