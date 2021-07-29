# 宫子恰布丁-HTML小游戏

## 介绍
宫子恰布丁-网页小游戏，为太空入侵者的改版。<br>
前端为原生HTML/CSS/JavaScript，后端使用Spring Boot。<br>
## 下载
[服务端部署，提取码：2333](https://swsk33.lanzoui.com/b0br8ycxg)<br>

## 游戏网址
[点击进入](https://swsk33-site.fun/miyakogame)<br>

## 关于服务器部署
可以通过上面下载地址下载服务器部署部署在自己服务器上，服务器需要安装java运行环境，解压后将Resource文件夹和jar文件放在一起，并使用cd命令进入两者所在目录，运行其中jar文件即可。运行前请先找到解压的Resources/config/config.properties中的配置文件并配置其中的MySQL，Redis为自己的数据库地址，以及邮箱smtp服务器和自己的邮箱，然后连接自己的MySQL数据库，并使用source命令运行Resources/sql目录下的sql文件初始化自己的数据库表，还可以修改其中端口配置，然后再运行服务端。