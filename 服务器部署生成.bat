@echo off
set output="%systemdrive%\Users\%username%\Downloads\miyako.7z"
mvn clean package && "%systemdrive%\Program Files\7-Zip\7z.exe" a -t7z -mx=9 -xr"!Resources\avatars\users" -xr"!Resources\webres\js\source" -x"!Resources\webres\css\*.scss" %output% ".\target\*.jar" "Resources" && echo 已经压缩部署文件至%output%，解压至服务器，配置好Resource\config\config.properties文件，然后运行jar即可。 && pause