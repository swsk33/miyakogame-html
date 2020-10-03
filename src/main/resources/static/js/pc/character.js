//宫子的行为模块
let miyako = document.querySelector('.game .gameBg .miyako'); //获取宫子dom
let y = 0;
miyako.style.top = y + 'px';

//宫子向上移动
function up(i) {
	if (y > i) {
		y = y - i;
		miyako.style.top = y + 'px';
	} else {
		miyako.style.top = '0px';
	}
}

//宫子向下移动
function down(i) {
	if ((y + miyako.offsetHeight) < bg.offsetHeight - i) {
		y = y + i;
		miyako.style.top = y + 'px';
	} else {
		miyako.style.top = (bg.offsetHeight - miyako.offsetHeight) + 'px';
	}
}

//宫子扣生命值
function healthDown() {
	//如果生命值高于0，扣血并实现闪烁效果，然后继续游戏
	if (health > 0) {
		health--;
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
		}, 300);
		getPuddings();
		puddingMove();
		saveData();
		refreshDom();
	} else {
		failedPage.style.display = 'flex';
		clearData();
		document.querySelector('.failedAudio-' + genRandom(1, 3)).play();
		isPaused = true;
	}
}