//节日控制
let mainDate = new Date();
//日期
let month = mainDate.getMonth(); //获取月份
let date = mainDate.getDate(); //获取日期
//条件：1是月份值为9（10月）26号以后；2是月份值为10（11月）3号及其之前，两者满足其一
let dateCriteria1 = month == 9 && date >= 26;
let dateCriteria2 = month == 10 && date <= 3;
let dateCriteria = dateCriteria1 || dateCriteria2;

//如果是万圣节前后，那么替换主页背景、游戏背景、宫子贴图等等
if (dateCriteria) {
	let style = document.createElement('style');
	let text = document.createTextNode(
		'.start {background: url(./img/festival/halloween/bg-menu.png) no-repeat center/cover}' +
		'.start .title .main {background: url(./img/festival/halloween/title.png) no-repeat center/cover}' +
		'.start ul li {color: #ffb739}' +
		'.game {background: url(./img/festival/halloween/bg-game.png) no-repeat center/cover}' +
		'.game .topBar {background-color: rgba(0, 255, 226, 0.78)}' +
		'.game .topBar .example .pd1::after, .game .topBar .example .pd2::after, .game .topBar .example .pd3::after, .game .topBar .level, .game .health .t, .game .topBar .autoFire .t {color: rgb(255, 32, 99)}' +
		'.game .gameBg {background-color: rgba(0, 0, 0, 0)}' +
		'.game .gameBg .miyako {width: 120px; height: 142px; background: url(./img/festival/halloween/miyako-halloween.png) no-repeat center/cover;}'
	);
	style.appendChild(text);
	document.head.appendChild(style);
}