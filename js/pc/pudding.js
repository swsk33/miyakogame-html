//控制布丁的移动
let puddingArray = []; //存放布丁对象的数组
let puddingBox = document.querySelector('.gameBg .puddings'); //获取布丁所在的容器
let boxOriginHeight; //布丁容器原始高度
let moveUp; //布丁移动方向，false为下true为上
let puddingRol = 8; //布丁总行数
let puddingCol = 4; //布丁总列数
const puddingSize = {
	puddingWidth: 60,
	puddingHeight: 60
}; //每个布丁单位的尺寸

//获取布丁并重置位置，用于布丁容器的初始化，获取顺序为：第1列第1个，第1列第2个...第2列第1个...
function getPuddings() { //(此处有误，明天来改)
	let puds = puddingBox.children; //获取全部布丁dom
	//设置每个布丁相对容器的位置,使得每一列之间相隔10px，每一行之间相隔5px
	for (let i = 0; i < puddingCol; i++) {
		for (let j = 0; j < puddingRol; j++) {
			puds[j + i * 8].style.left = (i * (puddingSize.puddingWidth + 10)) + 'px';
			puds[j + i * 8].style.top = (j * (puddingSize.puddingHeight + 5)) + 'px';
		}
	}
	//清空数组
	puddingArray = [];
	for (let i = 0; i < puds.length; i++) {
		let scoreEachPudding; //每个布丁的分数
		if (i >= 0 && i <= 15) {
			scoreEachPudding = 1;
		} else if (i >= 16 && i <= 23) {
			scoreEachPudding = 2;
		} else if (i >= 24 && i <= 31) {
			scoreEachPudding = 3;
		}
		//构建每个布丁的模型对象并存入全局数组
		let eachPudding = {
			dom: puds[i], //布丁dom节点
			originTop: puds[i].offsetTop, //这个布丁初始时相对于容器顶的距离
			isEaten: false, //布丁是否被吃掉（击中）
			score: scoreEachPudding //这个布丁的分值
		};
		eachPudding.dom.style.display = 'block';
		puddingArray.push(eachPudding);
	}
	puddingBox.style.width = (puddingCol * (puddingSize.puddingWidth + 10) - 10) + 'px';
	puddingBox.style.height = (puddingRol * (puddingSize.puddingHeight + 5) - 5) + 'px';
	puddingBox.style.left = (bg.offsetWidth - puddingBox.offsetWidth) + 'px';
	puddingBox.style.top = '0px';
	boxOriginHeight = puddingBox.offsetHeight;
	moveUp = false;
}

//获取某个布丁的全局绝对位置，传入构造的布丁对象
function getPuddingPosition(puddingObject) {
	let pos = {
		left: puddingObject.dom.offsetLeft + puddingBox.offsetLeft,
		top: puddingObject.dom.offsetTop + puddingBox.offsetTop
	};
	return pos;
}

//布丁容器大小动态改变
function puddingBoxChange() {
	let topReduce = 0; //上部减少的总行数
	let bottomReduce = 0; //下部减少的总行数
	let rolIsExists; //表示该行是否存在
	//上判定
	rolIsExists = false;
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 4; j++) {
			if (!puddingArray[(j * 8) + i].isEaten) {
				rolIsExists = true;
				break;
			}
		}
		if (rolIsExists) {
			break;
		} else {
			topReduce++;
		}
	}
	//下判定
	rolIsExists = false;
	for (let i = 7; i >= 0; i--) {
		for (let j = 0; j < 4; j++) {
			if (!puddingArray[(j * 8) + i].isEaten) {
				rolIsExists = true;
				break;
			}
		}
		if (rolIsExists) {
			break;
		} else {
			bottomReduce++;
		}
	}
	//改变容器大小及其布丁的位置：上部减少和下部减少行数之和乘每一行高度即为容器减小的大小，但是布丁只需上移上部减少行数乘以每行高度
	let boxHeightReduce = (topReduce + bottomReduce) * (puddingSize.puddingHeight + 5); //容器减小的总大小
	let puddingUpOffset = topReduce * (puddingSize.puddingHeight + 5);
	puddingBox.style.height = (boxOriginHeight - boxHeightReduce) + 'px';
	for (let i = 0; i < puddingArray.length; i++) {
		if (!puddingArray[i].isEaten) {
			puddingArray[i].dom.style.top = (puddingArray[i].originTop - puddingUpOffset) + 'px';
		}
	}
}

//布丁的移动（回调函数）
function puddingMove() {
	let velocity = 5 * level; //布丁移动的速度，和关卡数成正比
	let moveControl = setInterval(function() {
		puddingBoxChange(); //先动态改变容器大小
		if (!moveUp) { //向下移动时
			if (puddingBox.offsetTop + puddingBox.offsetHeight + velocity >= bg.offsetHeight) { //布丁即将移动到底部时
				moveUp = true;
				puddingBox.style.top = (bg.offsetHeight - puddingBox.offsetHeight) + 'px';
				setTimeout(function() {
					puddingBox.style.left = (puddingBox.offsetLeft - 50) + 'px';
				}, 5);
			} else {
				puddingBox.style.top = (puddingBox.offsetTop + velocity) + 'px';
			}
		} else { //向下移动时
			if (puddingBox.offsetTop - velocity <= 0) { //布丁即将运动到上边界时
				moveUp = false;
				puddingBox.style.top = 0 + 'px';
				setTimeout(function() {
					puddingBox.style.left = (puddingBox.offsetLeft - 50) + 'px';
				}, 5);
			} else {
				puddingBox.style.top = (puddingBox.offsetTop - velocity) + 'px';
			}
		}
		//游戏暂停了，停止移动
		if (isPaused) {
			clearInterval(moveControl);
		}
		//如果移动过程中出界或者碰到宫子
		if (isPuddingOutOfBound()) {
			clearInterval(moveControl);
			healthDown();
		}
		//布丁被吃完了，停止计时器并显示胜利界面，进入下一关
		if (isEatUp()) {
			clearInterval(moveControl);
			level++;
			addScore(level * 10);
			succeedPage.style.display = 'flex';
			isPaused = true;
			saveData();
			refreshDom();
		}
	}, 100);
}

//操作布丁的移动（暂停时不动，不暂停就动）
function puddingMoveControl(notMove, callback) {
	if (!notMove) {
		callback();
	}
}

//判定是否有布丁碰到宫子或者跑出左边界
function isPuddingOutOfBound() {
	let isOut = false;
	for (let i = 0; i < puddingArray.length; i++) {
		//如果这个布丁是存活状态，则开始执行判断。
		if (!puddingArray[i].isEaten) {
			//条件1：宫子的右下方在该布丁范围内
			let criteria1 = (miyako.offsetTop + miyako.offsetHeight) >= getPuddingPosition(puddingArray[i]).top && (miyako.offsetLeft +
				miyako.offsetWidth) >= getPuddingPosition(puddingArray[i]).left;
			//条件2：宫子的左上方在该布丁范围内
			let criteria2 = miyako.offsetTop <= (getPuddingPosition(puddingArray[i]).top + puddingArray[i].dom.offsetHeight) &&
				miyako.offsetLeft <= (getPuddingPosition(puddingArray[i]).left + puddingArray[i].dom.offsetWidth);
			//条件3：布丁越界
			let criteria3 = getPuddingPosition(puddingArray[i]).left <= 0;
			//总条件：上述1和2同时满足或者3满足时
			isOut = (criteria1 && criteria2) || criteria3;
			if (isOut) {
				break;
			}
		}
	}
	return isOut;
}

//判断布丁是否被吃完
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
