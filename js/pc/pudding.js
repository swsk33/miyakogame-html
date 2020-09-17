//控制布丁的移动
let puddingArray = []; //存放布丁对象的数组
let puddingBox = document.querySelector('.gameBg .puddings'); //获取布丁所在的容器
let puds = puddingBox.children; //获取全部布丁dom

//获取布丁，用于每一关的初始化
function getPuddings() {
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
			dom: puds[i],
			isEaten: false,
			score: scoreEachPudding
		};
		puddingArray.push(eachPudding);
	}
}

//获取某个布丁的全局绝对位置，传入构造的布丁对象
function getPuddingPosition(puddingObject) {
	let pos = {
		left: puddingObject.dom.offsetLeft + puddingBox.offsetLeft,
		top: puddingObject.dom.offsetTop + puddingBox.offsetTop
	};
	return pos;
}

//布丁的移动
function puddingMove() {
	let velocity = 5 * level; //布丁移动的速度，和关卡数成正比
	
}
