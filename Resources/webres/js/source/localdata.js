//游戏数据的储存与读取
//游戏数据
let level; //关卡
let health; //生命值
let highScore; //最高分数
let currentScore = 0; //当前分数
let weaponCount = []; //各个武器的弹药数量

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
	let data = {
		level: level,
		health: health,
		highScore: highScore,
		currentScore: currentScore,
		weaponCount: weaponCount
	}
	let dataStr = JSON.stringify(data);
	window.localStorage.setItem('data', dataStr);
}

/**
 * 读取游戏数据，若读取数据为空说明是新游戏，返回true
 */
function readData() {
	let isNewGame = false;
	let data = JSON.parse(window.localStorage.getItem('data'));
	if (data == null || data.highScore == 0) {
		currentScore = 0;
		highScore = 0;
		health = 3;
		level = 1;
		weaponCount = [];
		for (let i = 0; i < weaponList.length; i++) {
			if (i == 0) {
				weaponCount.push(-1);
			} else {
				weaponCount.push(0);
			}
		}
		isNewGame = true;
	} else {
		level = data.level;
		health = data.health;
		highScore = data.highScore;
		currentScore = data.currentScore;
		weaponCount = data.weaponCount;
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
	weaponCount = [];
	for (let i = 0; i < weaponList.length; i++) {
		if (i == 0) {
			weaponCount.push(-1);
		} else {
			weaponCount.push(0);
		}
	}
	refreshDom();
}

/**
 * 刷新dom
 */
function refreshDom() {
	currentScoreDom.innerHTML = '积分：' + currentScore;
	highScoreDom.innerHTML = '最高分数：' + highScore;
	healthDom.innerHTML = 'x' + health;
	levelDom.innerHTML = '第' + level + '关';
	weaponDom.children[0].innerHTML = weaponList[currentWeaponIndex].name;
	weaponDom.children[1].src = weaponList[currentWeaponIndex].texture;
	if (currentWeaponIndex == 0) {
		weaponDom.children[2].innerHTML = 'x无限';
	} else {
		weaponDom.children[2].innerHTML = 'x' + weaponCount[currentWeaponIndex];
	}
}

/**
 * 生成范围是[min,max]的随机整数
 * @param {*} min 期望最小值
 * @param {*} max 期望最大值
 */
function genRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}