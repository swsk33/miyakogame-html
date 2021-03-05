//计时器
let puddingControlInterval; //布丁移动计时器
let fireControlInterval; //子弹飞行计时器
//游戏控制变量
let currentWeaponIndex = 0; //当前武器的索引号
let isLoadingBullet = false; //是否正在装填子弹
let isPaused = false; //游戏是否是暂停状态

/**
 * 主菜单继续游戏进度
 */
function continueGame() {
	readData();
	clearBullets();
	document.querySelector('.startAudio').play();
	operateStartPage(false);
	initializePuddings();
	startGameProcess();
}

/**
 * 开始/继续游戏主进程
 */
function startGameProcess() {
	isPaused = false;
	puddingControlInterval = setInterval(puddingMove, 100);
	fireControlInterval = setInterval(function () {
		bulletFlyMainControl(bulletArray, puddingArray);
	}, 16);
}

/**
 * 暂停/停止游戏主进程
 */
function stopGameProcess() {
	isPaused = true;
	clearInterval(puddingControlInterval);
	clearInterval(fireControlInterval);
}