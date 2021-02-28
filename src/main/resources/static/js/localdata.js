//游戏数据的储存与读取
//游戏数据
let level; //关卡
let health; //生命值
let highScore; //最高分数
let currentScore = 0; //当前分数

/**
 * 加分函数
 * @param {*} score 待加分值
 */
function addScore(score) {
	currentScore = parseInt(currentScore) + score;
	//当当前分高于最高分时更新最高分
	if (currentScore > highScore) {
		highScore = currentScore;
	}
	refreshDom();
}

/**
 * 储存游戏数据
 */
function saveData() {
	window.localStorage.setItem('high', highScore); //最高分
	window.localStorage.setItem('current', currentScore); //当前分数
	window.localStorage.setItem('health', health); //生命值
	window.localStorage.setItem('level', level); //当前关卡
}

/**
 * 读取游戏数据，若读取数据为空说明是新游戏，返回true
 */
function readData() {
	let isNewGame = false;
	currentScore = window.localStorage.getItem('current'); //读取当前分数
	highScore = window.localStorage.getItem('high'); //读取最高分
	health = window.localStorage.getItem('health'); //读取生命值
	level = window.localStorage.getItem('level'); //读取关卡
	if ((currentScore == null || highScore == null || health == null || level == null) || highScore == 0) {
		currentScore = 0;
		highScore = 0;
		health = 3;
		level = 1;
		isNewGame = true;
	}
	//对应修改dom
	refreshDom();
	return isNewGame;
}

/**
 * 重置所有数据（不清除最高分）
 */
function resetData() {
	currentScore = 0;
	health = 3;
	level = 1;
	refreshDom();
}

/**
 * 刷新dom
 */
function refreshDom() {
	currentScoreDom.innerHTML = '当前分数：' + currentScore;
	highScoreDom.innerHTML = '最高分数：' + highScore;
	healthDom.innerHTML = 'x' + health;
	levelDom.innerHTML = '第' + level + '关';
}

/**
 * 生成十以内随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
function genRandom(min, max) {
	let number = Math.floor(Math.random() * 10 + min);
	if (number > max) {
		number = max;
	}
	return number;
}