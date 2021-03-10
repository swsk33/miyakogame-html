//宫子的行为模块
let miyako = document.querySelector('.game .gameBg .miyako'); //获取宫子dom
let miyakoAtY = 0; //宫子所在竖直方向位置
miyako.style.top = miyakoAtY + 'px';

/**
 * 宫子向上移动
 * @param {*} i 每次移动的像素
 */
function up(i) {
	if (miyakoAtY > i) {
		miyakoAtY = miyakoAtY - i;
		miyako.style.top = miyakoAtY + 'px';
	} else {
		miyako.style.top = '0px';
	}
}

/**
 * 宫子向下移动
 * @param {*} i 每次移动的像素
 */
function down(i) {
	if ((miyakoAtY + miyako.offsetHeight) < gameBackground.offsetHeight - i) {
		miyakoAtY = miyakoAtY + i;
		miyako.style.top = miyakoAtY + 'px';
	} else {
		miyako.style.top = (gameBackground.offsetHeight - miyako.offsetHeight) + 'px';
	}
}

/**
 * 宫子扣生命值
 */
function healthDown() {
	health--;
	//如果生命值高于0，扣血并实现闪烁效果，然后继续游戏
	if (health >= 0) {
		let i = 6;
		let isCharShow = true;
		let flashing = setInterval(function () {
			isCharShow = !isCharShow;
			i--;
			if (isCharShow) {
				miyako.style.display = 'block';
			} else {
				miyako.style.display = 'none';
			}
			if (i <= 0) {
				clearInterval(flashing);
			}
		}, 150);
		initializePuddings();
		saveData();
	} else {
		opreateFailedPage(true);
		stopGameProcess();
		resetData();
	}
}