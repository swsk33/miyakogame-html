//控制布丁的移动
let puddingArray = []; //存放布丁对象的数组
let moveUp; //布丁移动方向，false为下true为上
const puddingRol = 8; //布丁总行数
const puddingCol = 4; //布丁总列数
//每个布丁单位的尺寸
const puddingSize = {
	puddingWidth: 60,
	puddingHeight: 60
};
//布丁矩阵的尺寸
const puddingMatrixSize = {
	matrixWidth: puddingCol * (puddingSize.puddingWidth + 10) - 10,
	matrixHeight: puddingRol * (puddingSize.puddingHeight + 5) - 5
};

/**
 * 布丁对象构造函数
 * @param {*} dom 布丁dom节点
 * @param {*} isEaten 布丁是否被吃了
 * @param {*} score 该布丁的分值
 */
function Pudding(dom, isEaten, score) {
	this.dom = dom;
	this.isEaten = isEaten;
	this.score = score;
}

//初始化所有布丁对象，获取顺序为：第1列第1个，第1列第2个...第2列第1个...
for (let i = 0; i < puddingCol; i++) {
	for (let j = 0; j < puddingRol; j++) {
		let eachPuddingDom = document.querySelector('.game .gameBg .pudding-' + i + '-' + j);
		eachPuddingDom.style.display = 'block';
		eachPuddingDom.style.left = (gameBackground.offsetWidth - puddingMatrixSize.matrixWidth + i * (puddingSize.puddingWidth + 10)) + 'px';
		eachPuddingDom.style.top = (j * (puddingSize.puddingHeight + 5)) + 'px';
		eachPuddingDom.style.transform = 'scale(1) rotate(0deg)';
		let eachPuddingScore;
		if (i < 2) {
			eachPuddingScore = 1;
		} else if (i == 2) {
			eachPuddingScore = 2;
		} else {
			eachPuddingScore = 3;
		}
		let eachPudding = new Pudding(eachPuddingDom, false, eachPuddingScore);
		puddingArray.push(eachPudding);
	}
}

/**
 * 重置布丁状态
 */
function initializePuddings() {
	//i为列j为行
	for (let i = 0; i < puddingCol; i++) {
		for (let j = 0; j < puddingRol; j++) {
			puddingArray[i * 8 + j].dom.style.display = 'block';
			puddingArray[i * 8 + j].dom.style.left = (gameBackground.offsetWidth - puddingMatrixSize.matrixWidth + i * (puddingSize.puddingWidth + 10)) + 'px';
			puddingArray[i * 8 + j].dom.style.top = (j * (puddingSize.puddingHeight + 5)) + 'px';
			puddingArray[i * 8 + j].dom.style.transform = 'scale(1) rotate(0deg)';
			puddingArray[i * 8 + j].isEaten = false;
		}
	}
	moveUp = false;
}

/**
 * 获取在上下边界的布丁作为边界判定依据
 */
function getPuddingAtBorder() {
	let puddingAtBorder = {
		borderTop: puddingArray[0].dom,
		borderBottom: puddingArray[puddingRol - 1].dom
	} //上下边缘的两个布丁dom
	let rolIsExists; //表示该行是否存在
	//上判定
	rolIsExists = false;
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 4; j++) {
			let isVisible = window.getComputedStyle(puddingArray[(j * 8) + i].dom, null).getPropertyValue('display') != 'none';
			if (!puddingArray[(j * 8) + i].isEaten || isVisible) {
				rolIsExists = true;
				puddingAtBorder.borderTop = puddingArray[(j * 8) + i].dom;
				break;
			}
		}
		if (rolIsExists) {
			break;
		}
	}
	//下判定
	rolIsExists = false;
	for (let i = 7; i >= 0; i--) {
		for (let j = 0; j < 4; j++) {
			let isVisible = window.getComputedStyle(puddingArray[(j * 8) + i].dom, null).getPropertyValue('display') != 'none';
			if (!puddingArray[(j * 8) + i].isEaten || isVisible) {
				rolIsExists = true;
				puddingAtBorder.borderBottom = puddingArray[(j * 8) + i].dom;
				break;
			}
		}
		if (rolIsExists) {
			break;
		}
	}
	return puddingAtBorder;
}

getPuddingAtBorder();

/**
 * 判定是否有布丁碰到宫子或者跑出左边界
 */
function isPuddingOutOfBound() {
	let isOut = false;
	for (let i = 0; i < puddingArray.length; i++) {
		//如果这个布丁是存活状态，则开始执行判断。
		if (!puddingArray[i].isEaten) {
			//条件1：宫子的右下方在该布丁范围内
			let criteria1 = (miyako.offsetTop + miyako.offsetHeight) >= puddingArray[i].dom.offsetTop && (miyako.offsetLeft + miyako.offsetWidth) >= puddingArray[i].dom.offsetLeft;
			//条件2：宫子的左上方在该布丁范围内
			let criteria2 = miyako.offsetTop <= puddingArray[i].dom.offsetTop + puddingArray[i].dom.offsetHeight && miyako.offsetLeft <= puddingArray[i].dom.offsetLeft + puddingArray[i].dom.offsetWidth;
			//条件3：布丁越界
			let criteria3 = puddingArray[i].dom.offsetLeft <= 0;
			//总条件：上述1和2同时满足或者3满足时
			isOut = (criteria1 && criteria2) || criteria3;
			if (isOut) {
				break;
			}
		}
	}
	return isOut;
}

/**
 * 判断布丁是否被吃完
 */
function isEatUp() {
	let isDone = true;
	for (let i = 0; i < puddingArray.length; i++) {
		if (!puddingArray[i].isEaten) {
			isDone = false;
			break;
		}
	}
	return isDone;
}

/**
 * 移动布丁
 * 该方法需要另用循环计时器调用
 */
function puddingMove() {
	let velocity = 1 + level * 2; //布丁移动的速度，和关卡数成正比
	//如果移动过程中出界或者碰到宫子
	if (isPuddingOutOfBound()) {
		healthDown();
	}
	//布丁被吃完了，停止游戏进程并显示胜利界面，进入下一关（先判断布丁是否被吃完了，否则在最后判断边界的时候会出错）
	if (isEatUp()) {
		level++;
		addScore(level * 10);
		operateSuccessPage(true);
		stopGameProcess();
		saveData();
		refreshDom();
	}
	let topDistance = getPuddingAtBorder().borderTop.offsetTop; //上部离顶端距离
	let bottomDistance = gameBackground.offsetHeight - getPuddingAtBorder().borderBottom.offsetTop - puddingSize.puddingHeight; //下部离底端距离
	if (!moveUp) { //向下移动时
		if (bottomDistance <= velocity) { //布丁即将移动到底部时，把每个存活的布丁向下移动，移动距离为最底部的布丁到底部的距离，然后再左移50px
			for (let i = 0; i < puddingArray.length; i++) {
				if (!puddingArray[i].isEaten) {
					puddingArray[i].dom.style.top = (puddingArray[i].dom.offsetTop + bottomDistance) + 'px';
				}
			}
			moveUp = true;
			setTimeout(function () {
				for (let i = 0; i < puddingArray.length; i++) {
					if (!puddingArray[i].isEaten) {
						puddingArray[i].dom.style.left = (puddingArray[i].dom.offsetLeft - 50) + 'px';
					}
				}
			}, 5);
		} else {
			for (let i = 0; i < puddingArray.length; i++) {
				if (!puddingArray[i].isEaten) {
					puddingArray[i].dom.style.top = (puddingArray[i].dom.offsetTop + velocity) + 'px';
				}
			}
		}
	} else { //向上移动时
		if (topDistance - velocity <= 0) { //布丁即将运动到上边界时，把每个存活的布丁向上移动，移动距离为最顶部的布丁到顶部的距离，然后再左移50px
			for (let i = 0; i < puddingArray.length; i++) {
				if (!puddingArray[i].isEaten) {
					puddingArray[i].dom.style.top = (puddingArray[i].dom.offsetTop - topDistance) + 'px';
				}
			}
			moveUp = false;
			setTimeout(function () {
				for (let i = 0; i < puddingArray.length; i++) {
					if (!puddingArray[i].isEaten) {
						puddingArray[i].dom.style.left = (puddingArray[i].dom.offsetLeft - 50) + 'px';
					}
				}
			}, 5);
		} else {
			for (let i = 0; i < puddingArray.length; i++) {
				if (!puddingArray[i].isEaten) {
					puddingArray[i].dom.style.top = (puddingArray[i].dom.offsetTop - velocity) + 'px';
				}
			}
		}
	}
}