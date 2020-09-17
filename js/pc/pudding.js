//控制布丁的移动
let puddingArray = []; //存放布丁对象的数组
let puds = document.querySelector('.gameBg .puddings').children;

//获取布丁，用于每一关的初始化
function getPuddings() {
	for (let i = 0; i < puds.length; i++) {
		let col = puds[i].children;
		//分数判定与设置
		let scoreEach;
		if (i == 2) {
			scoreEach = 2;
		} else if (i == 3) {
			scoreEach = 3;
		} else {
			scoreEach = 1;
		}
		for (let j = 0; j < col.length; j++) {
			//读取并构建每一个布丁对象并存入全局数组
			let eachPudding = {
				dom: col[j],
				isEaten: false,
				score: scoreEach
			};
			puddingArray.push(eachPudding);
		}
	}
}