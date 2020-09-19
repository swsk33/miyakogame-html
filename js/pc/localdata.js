//游戏数据的储存与读取
let level; //关卡
let health; //生命值
let highScore; //最高分数
let currentScore = 0; //当前分数
let currentScoreDom = document.querySelector('.game .topBar .currentScore'); //当前分数dom
let highScoreDom = document.querySelector('.game .topBar .highScore'); //最高分数dom
let levelDom = document.querySelector('.game .topBar .level'); //关卡dom
let healthDom = document.querySelector('.game .topBar .health .t'); //获取生命值文字部分dom
//加分函数
function addScore(score) {
	currentScore = parseInt(currentScore) + score;
	//当当前分高于最高分时更新最高分
	if (currentScore > highScore) {
		highScore = currentScore;
	}
	refreshDom();
}

//储存所有数据
function saveData() {
	window.localStorage.setItem('high', highScore); //最高分
	window.localStorage.setItem('current', currentScore); //当前分数
	window.localStorage.setItem('health', health); //生命值
	window.localStorage.setItem('level', level); //当前关卡
}

//读取所有数据
function readData() {
	currentScore = window.localStorage.getItem('current'); //读取当前分数
	highScore = window.localStorage.getItem('high'); //读取最高分
	health = window.localStorage.getItem('health'); //读取生命值
	level = window.localStorage.getItem('level'); //读取关卡
	if (currentScore == null || highScore == null || health == null || level == null) {
		currentScore = 0;
		highScore = 0;
		health = 3;
		level = 1;
		document.querySelector('.start ul').children[0].style.color = 'gray';
	}
	//对应修改dom
	refreshDom();
}

//清除所有数据（不清除最高分）
function clearData() {
	currentScore = 0;
	health = 3;
	level = 1;
	refreshDom();
}

//重新复活游戏处理
function reTry() {
	clearData();
	getPuddings();
	puddingMoveControl(isPaused, puddingMove);
}

//刷新dom
function refreshDom() {
	currentScoreDom.innerHTML = '当前分数：' + currentScore;
	highScoreDom.innerHTML = '最高分数：' + highScore;
	healthDom.innerHTML = 'x' + health;
	levelDom.innerHTML = '第' + level + '关';
}
