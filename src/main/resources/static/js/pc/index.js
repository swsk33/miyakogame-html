//初始化
let bg = document.querySelector('.game .gameBg'); //获取游戏背景
let tb = document.querySelector('.game .topBar'); //获取游戏上栏
let succeedPage = document.querySelector('.succeed'); //获取胜利界面
let failedPage = document.querySelector('.failed'); //获取失败界面
let startPage = document.querySelector('.start'); //获取开始界面
let helpPage = document.querySelector('.help'); //获取帮助界面
//游戏控制变量
let isPaused = true; //游戏是否暂停
let isAutoFire = false; //是否自动开火
let loadingInterval = 500; //装填间隔
let isLoadingBullet = false; //是否正在装填子弹
//先读取储存区
readData();