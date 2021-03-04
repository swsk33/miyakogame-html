@echo off
set out=%systemdrive%\Users\%username%\Downloads\miyako.7z
7z a -t7z -mx=9 -x"!Resources\webres\css\*.scss" -xr"!Resources\webres\js\source" "%out%" ".\target\*.jar" "Resources"
echo 已经生成部署文件并打包至%out%，在服务器解压并运行其中jar文件即可。
echo 按任意键退出...
pause > nul