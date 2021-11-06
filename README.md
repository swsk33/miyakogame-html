# 宫子恰布丁-HTML小游戏

## 介绍

该版本以不再维护！请访问：[宫子恰布丁-Vue重构版](https://gitee.com/swsk33/miyakogame-vue)

宫子恰布丁-网页小游戏，为太空入侵者的改版。<br>
前端为原生HTML/CSS/JavaScript，后端使用Spring Boot。<br>

## 游戏网址
[点击进入](https://swsk33-site.fun/miyakogame)<br>

## 关于服务器部署
1. 将该项目克隆下来
2. 若需要配置https，需要编辑主类文件```src/main/java/fun/swsk33site/miyakogame/MiyakoApplication.java```，按照里面注释内容的指引进行编辑。若你不需要配置https访问，请忽略这一步
3. 修改Spring Boot配置文件，位于`Resources/config`下。先把该目录下`config.properties.bak`文件重命名为`config.properties`（去掉.bak），然后使用文本编辑器打开并配置其中的MySQL，Redis为自己的数据库地址，以及邮箱smtp服务器和自己的邮箱，然后连接自己的MySQL数据库，并使用source命令运行`Resources/sql`目录下的sql文件初始化自己的数据库表，还可以修改其中端口配置，若需要配置https也需在此配置
4. 构建项目，确定自己电脑配置好了Maven以及jdk，然后在项目文件夹执行：
	```
	mvn clean package
	```
	生成jar包位于`target/miyakogame-x.x.x.jar`（x为版本号）
5. 把生成的`miyakogame-x.x.x.jar`和`Resources`文件夹上传至服务器，服务器需要安装java运行环境，须确保它们在同一目录下，并使用`cd`命令进入两者所在目录，运行`miyakogame-x.x.x.jar`文件：
	```
	java -jar miyakogame-x.x.x.jar
	```
	x为实际版本号。
6. `Resources`文件夹里面的文件并不是全部运行网站所必须的，在部署网站之前可以删除以下文件：
	- 文件夹：
		- `Resources/avatars/users`
		- `Resources/sql`
		- `Resources/webres/js/source`
	- 文件：
		- `Resources/config/说明.txt`
		- `Resources/ssl/说明.txt`（若不配置https可以直接删除文件夹Resources/ssl）
		- `Resources/webres/css/*.scss`（Resources/webres/css目录下全部扩展名为scss的文件）