//节日控制
let mainDate = new Date();
//日期
let month = mainDate.getMonth(); //获取月份
let date = mainDate.getDate(); //获取日期
let time = mainDate.getHours(); //获取时间
//条件：1是月份值为9（10月）31号，19点以后；2是月份值为10（11月）1号，两者满足其一
let dateCriteria1 = month == 9 && date == 31 && time >= 19;
let dateCriteria2 = month == 10 && date == 1;
let dateCriteria = dateCriteria1 || dateCriteria2;
//如果是万圣节，那么替换主页背景、游戏背景、宫子贴图等等
if (dateCriteria) {
	startPage.style.background = 'url(./img/festival/halloween/bg-menu.png) no-repeat center/cover';
}
console.log(dateCriteria);