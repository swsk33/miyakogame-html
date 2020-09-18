//初始化
let bg = document.querySelector('.game .gameBg'); //获取游戏背景
let tb = document.querySelector('.game .topBar'); //获取游戏上栏
let succeedPage = document.querySelector('.succeed'); //获取胜利界面
let failedPage = document.querySelector('.failed'); //获取失败界面
let startPage = document.querySelector('.start'); //获取开始界面
getPuddings();
//puddingMove();

//游戏控制
let isPaused = false; //游戏是否暂停（指在失败界面或者成功界面或者开始界面的时候）
let isAutoFire = false; //是否自动开火
let loadingInterval = 500; //装填间隔
let isLoadingBullet = false; //是否正在装填子弹

//重新复活游戏处理
function reTry() {
	level = 1;
	currentScore = 0;
	health = 3;
	getPuddings();
	puddingMove();
}
