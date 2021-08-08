## nohup 命令

Linux 的 nohup 命令可以将程序以忽略挂起信号的方式运行起来，被运行的程序的输出信
息将不会显示到终端。

## start.sh

```bash
#!/bin/bash
nohup java -jar demoApp.jar --server.port=8888 &
```

### stop.sh

```sh
#!/bin/bash
PID=$(ps -ef | grep demoApp.jar | grep -v grep | awk '{ print $2 }')
if [ -z "$PID" ]
then
    echo Application is already stopped
else
    echo kill $PID
    kill $PID
fi
```

### run.sh

整合了关闭和启动的脚本：run.sh，由于会先执行关闭应用，然后再启动应用，这样不会引
起端口冲突等问题，适合在持续集成系统中进行反复调用。

```bash
#!/bin/bash
echo stop application
source stop.sh
echo start application
source start.sh
```

### 之前 Jenkins 上部署的一个脚本

```sh
#!/bin/bash

proj=xxx-portal
app=$proj-0.0.1-SNAPSHOT.jar

# get the running process id
pid= `jps | grep "$app" | gawk '{print $1}'`

# kill the old process
if [!-Z $pid ] then
    echo killing '$pid'
    kill-9 $pid
fi

sleep 2

dir="/home/ubuntu/data/apps"

# if directory not exists then make one
if [!-d '$dir']; then
    mkdir-p $dir
fi

chmod u+x Sdir/sapp
nohup $dir/$app >/dev/null 2>&1 &
```

### 在 Docker Container 中部署

```sh

# latest oracle openjdk is the basis
FROM openjdk:oracle
# copy jar file into container image under app directory
COPY target/demoApp.jar app/demoApp.jar
# expose server port accept connections
EXPOSE 8080
# start application
CMD ["java", "-jar", "app/demoApp.jar"]
```

```sh
docker image build -t demo-app:latest .
```

```sh
docker container run -p 8080:8080 -d --name app-container demo-app
```

## Deploying as system service

实际上，实现的方法有很多种.可以注册称为 system service

```sh
sudo nano /etc/systemd/system/app1.service


[Unit]
Description=Spring init sample
After=syslog.target
[Service]
User=ubuntu
Restart=always
RestartSec=30s
ExecStart=/usr/bin/java -jar java -jar /home/user/apps/app1/spring-init-1.0.0.jar SuccessExitStatus=143
[Install]
WantedBy=multi-user.target

#
sudo systemctl start app1.service
sudo systemctl stop app1.service
sudo systemctl restart app1.service

# machine gets restarted the app will start automatically.
sudo systemctl enable app1.service
```

<!--

nohup 命令
在 Java Archive（JAR）中作为独立应用程序进行部署，

1. [Spring Boot 应用的后台运行配置 | 程序猿 DD](https://blog.didispace.com/spring-boot-run-backend
2. [Linux 下部署 Spring Boot jar | MrBird](https://mrbird.cc/Linux%20Spring-Boot-jar.html)
3. https://www.jb51.net/article/166098.htm
1. [Install and Run Spring Boot Linux Service Guide | SpringHow](https://springhow.com/installing-spring-boot-applications-as-linux-service/)
1. [java - How do I run a spring boot executable jar in a Production environment? - Stack Overflow](https://stackoverflow.com/questions/22886083/how-do-i-run-a-spring-boot-executable-jar-in-a-production-environment)
1. [Chapter 4. Developing and deploying a Spring Boot runtime application Red Hat support for Spring Boot 2.1 | Red Hat Customer Portal](https://access.redhat.com/documentation/en-us/red_hat_support_for_spring_boot/2.1/html/spring_boot_2.1.x_runtime_guide/creating-a-basic-springboot-application_spring-boot)
[Deploying a spring boot application in Linux as system service | by Karikevinod | Medium](https://karikevinod.medium.com/deploying-a-spring-boot-application-in-linux-as-system-service-6e08e9dc1803)

 -->
