<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-12-14_11-12-57-1576293291.jpg'/>

## 介绍


**SSH** 是一种安全协议，用作远程连接 **Linux 服务器**的主要方式。它通过生成远程 shell 提供基于文本的界面。连接后，在本地终端中键入的所有命令都将发送到远程服务器并在那里执行。

介绍一些与 SSH 连接以实现目标的常用方法。当需要知道如何以不同方式连接或配置服务器时，可以参考。

## SSH 概述

连接到远程 Linux 服务器的最常用方法是通过 SSH。SSH 代表 **Secure Shell**，它提供了一种安全可靠的方法来执行命令，进行更改以及远程配置服务。通过 SSH 连接时，使用远程服务器上存在的帐户登录。

## SSH 如何工作

当通过 SSH 连接时，将被放入一个 shell 会话，这是一个基于文本的界面，可以在其中与服务器进行交互。在 SSH 会话期间，在本地终端中键入的所有命令都将通过**加密的 SSH 隧道**发送，并在服务器上执行。

SSH 连接使用客户端 - 服务器模型实现。这意味着要建立 SSH 连接，远程计算机必须运行称为 SSH 守护程序的软件。此软件侦听特定网络端口上的连接，验证连接请求，并在用户提供正确的凭据时生成相应的环境。

用户的计算机必须具有 SSH 客户端。这是一个知道如何使用 SSH 协议进行通信的软件，可以提供有关要连接的远程主机的信息，要使用的用户名以及应该传递给身份验证的凭据。客户端还可以指定有关他们要建立的连接类型的某些详细信息。

## SSH 如何验证用户

客户端通常使用密码（安全性较低且不推荐）或 SSH 密钥进行身份验证，这些密钥非常安全。

密码登录是加密的，并且易于为新用户理解。但是，自动机器人和恶意用户通常会反复尝试对允许基于密码的登录的帐户进行身份验证，这可能会导致安全性受损。因此，建议始终为大多数配置设置基于 SSH 密钥的身份验证。

SSH 密钥是一组匹配的加密密钥，可用于身份验证。每个集合包含公钥和私钥。公钥可以自由共享，而私钥必须保持警惕，不得暴露给任何人。

要使用 SSH 密钥进行身份验证，用户必须在其本地计算机上拥有 **SSH 密钥对**。在远程服务器上，必须将**公钥**复制到用户主目录中的文件中**~/.ssh/authorized_keys**。此文件包含有权登录此帐户的公共密钥列表（每行一个）。

当客户端连接到主机时，希望使用 SSH 密钥身份验证，它将通知服务器此意图并将告知服务器使用哪个公钥。然后，服务器检查其 authorized_keys 文件中的公钥，生成随机字符串并使用公钥对其进行加密。此加密消息只能使用关联的私钥解密。服务器将此加密消息发送到客户端以测试它们是否实际具有关联的私钥。

收到此消息后，客户端将使用私钥对其进行解密，并将显示的随机字符串与先前协商的会话 ID 相结合。然后它生成此值的 MD5 哈希并将其传回服务器。服务器已经拥有原始消息和会话 ID，因此它可以比较这些值生成的 MD5 哈希并确定客户端必须具有私钥。

已经了解了 SSH 的工作原理，可以开始讨论一些示例来演示使用 SSH 的不同方法

## 生成和使用 SSH 密钥

在本地计算机上生成新的 SSH 公钥和私钥对是使用没有密码的远程服务器进行身份验证的第一步。除非有充分理由不这样做，否则应始终使用 SSH 密钥进行身份验证。

许多加密算法可用于生成 SSH 密钥，包括 RSA，DSA 和 ECDSA。RSA 密钥通常是首选，并且是默认密钥类型。

要在本地计算机上生成 RSA 密钥对，请键入：

```bash
ssh-keygen
```

SSH 密钥默认为 2048 位。通常认为这对于安全性来说已经足够好了，但是可以为更加强化的密钥指定更多的位。

```bash
ssh-keygen -b 4096
```

此过程生成了一个 RSA SSH 密钥对，位于.ssh 用户主目录的隐藏目录中。这些文件是：

**~/.ssh/id_rsa**私钥。不要分享这个文件

**~/.ssh/id_rsa.pub**关联的公钥。这可以自由分享

## 删除或更改私钥上的密码短语

```bash
ssh-keygen -p
```

## 显示 SSH 密钥指纹

```bash
ssh-keygen -l
```

## 使用 SSH-Copy-ID 将公共 SSH 密钥复制到服务器

要将公钥复制到服务器，允许您在没有密码的情况下进行身份验证，可以采取多种方法。

如果您当前已为服务器配置了基于密码的 SSH 访问，并且已 ssh-copy-id 安装该实用程序，则这是一个简单的过程。该 ssh-copy-id 工具包含在许多 Linux 发行版的 OpenSSH 包中，因此很可能默认安装它。

如果您有此选项，则可以通过键入以下内容轻松转移公钥：

```bash
ssh-copy-id username@remote_host
```

提示在远程系统上输入用户帐户的密码,输入密码后，**~/.ssh/id_rsa.pub**密钥的内容将附加到用户帐户**~/.ssh/authorized_keys**文件的末尾.

现在可以在没有密码的情况下登录该帐户：

```bash
ssh username@remote_host
```

## 将公共 SSH 密钥复制到没有 SSH-Copy-ID 的服务器

如果没有 ssh-copy-id 可用的实用程序，但仍具有对远程服务器的基于密码的 SSH 访问权限，则可以以不同的方式复制公钥的内容。

您可以输出密钥的内容并将其传递给 ssh 命令。在远程端，您可以确保该~/.ssh 目录存在，然后将管道内容附加到~/.ssh/authorized_keys 文件中：

```bash
cat ~/.ssh/id_rsa.pub | ssh username@remote_host "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

## 手动将公共 SSH 密钥复制到服务器

```bash
# 复制到剪贴板里面了
pbcopy < ~/.ssh/id_rsa.pub
```

在远程服务器上，创建~/.ssh 目录（如果该目录尚不存在）：

```bash
mkdir -p ~/.ssh
```

之后，可以~/.ssh/authorized_keys 通过键入以下内容来创建或附加文件：

```bash
echo your-public-key-string >> ~/.ssh/authorized_keys
```

---

使用 ssh 命令，用户可以快速连接到远程主机并登录到其 Unix shell 。这使得可以从本地机器的终端直接在服务器上方便地发出命令。

要建立连接，只需要指定正确的 IP 地址或 URL 。第一次连接到新服务器时，会有某种形式的身份验证。

```javascript
ssh username@remote_host

```

如果要在服务器上快速执行命令而不登录，则可以在 URL 之后添加一个命令。该命令将在服务器上运行，并返回该结果。

```javascript
ssh username@remote_host ls /var/www
some-website.com
some-other-website.com
```

可以使用 SSH 来创建代理和隧道，保护与私钥的连接，传输文件等功能。



---

1. [SSH原理与运用（一）：远程登录 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)
2. [SSH原理与运用（二）：远程操作与端口转发 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2011/12/ssh_port_forwarding.html)
3. [数字签名是什么？ - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html)
4. [UNIX / Linux Tutorial for Beginners](http://www.ee.surrey.ac.uk/Teaching/Unix/)
5. [Beginners Guide To SSH - YouTube](https://www.youtube.com/watch?v=qWKK_PNHnnA)