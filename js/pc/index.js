//初始化
let bg = document.querySelector('.game .gameBg'); //获取游戏背景
let tb = document.querySelector('.game .topBar'); //获取游戏上栏
//游戏控制
let isPaused = false; //游戏是否暂停
let isAutoFire = false; //是否自动开火
let isLoadingBullet = false; //是否正在装填子弹
