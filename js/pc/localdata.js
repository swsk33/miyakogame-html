//游戏数据的储存与读取
let level = 1; //关卡
let currentScore = 0; //当前分数
let highScore = 0; //最高分数
let health = 3; //生命值

//加分函数
let currentScoreDom = document.querySelector('.game .topBar .currentScore');//当前分数dom
let highScoreDom = document.querySelector('.game .topBar .highScore');//最高分数dom
function addScore(score) {
	currentScore = currentScore + score;
	currentScoreDom.innerHTML = '当前分数：' + currentScore;
	//当当前分高于最高分时更新最高分
	if (currentScore > highScore) {
		highScore = currentScore;
		highScoreDom.innerHTML = '最高分数：' + highScore;
	}
}