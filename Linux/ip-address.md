IP 地址分为两类：私有和公共。

私有 IP 地址是你的无线路由（和公司内网）提供的私有IP 地址。它们的范围是 10.xxx、172.16.xx-172.31.xx 和 192.168.xx，其中 x是从0到255。

公有 IP 地址，顾名思义，是“公共”的，你可以在世界上任何地方访问它。每个网站都有一个唯一的 IP 地址，任何人可在任何地点访问，这可被视为公共 IP 地址。

此外，还有两种类型的 IP 地址：IPv4 和 IPv6。

IPv4 地址格式为 x.x.x.x，其中 x=0 到 255。有 2^32（大约 40 亿个）可能的 IPv4 地
址。

IPv6 地址使用更复杂的十六进制。总的比特数是 128，这意味着有 2^128 （340 后面有
36 个零！）个可能的 IPv6 地址。IPv6 已经被引入解决了可预见的 IPv4 地址耗尽问题。

建议不要与任何人共享你机器的公有 IP 地址。 WiFi 路由器有公共 IP，即 WAN（广域网）IP 地址，并且连接到该 WiFi 的任何设备都是相同的。连接到相
同 WiFi 的所有设备都有上面所说的私有 IP 地址。例如，两台笔记本电脑的 IP 地址分别是 192.168.0.5、192.168.0.8，这些是私有 IP 地址，但两者都有相同的公有IP 地址。

## 查看公有 IP 地址

```sh
curl ifconfig.me
curl ident.me
curl api.ipify.org
curl ip-api.com
```

## 查看当前 IP 地址对应的地理位置

```sh
curl ip-api.com
```

## 私有 IP 地址

```shell
ifconfig -a
```

## Weather

```sh
curl wttr.in or curl wttr.in/Berlin — the right way to check the weather
```

## JSON only

```sh
curl httpbin.org/ip
curl wtfismyip.com/json
curl -L iphorse.com/json
curl geoplugin.net/json.gp
curl https://ipapi.co/json
curl -L jsonip.com
curl gd.geobytes.com/GetCityDetails
curl ip.jsontest.com
```



---

1. [chubin/awesome-console-services: A curated list of awesome console services (reachable via HTTP, HTTPS and other network protocols)](https://github.com/chubin/awesome-console-services)