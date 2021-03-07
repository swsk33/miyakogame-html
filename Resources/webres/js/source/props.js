//游戏道具
//所有道具列表
let propsList = [];

/**
 * 道具构造函数
 * @param {*} name 道具名
 * @param {*} description 道具描述
 * @param {*} price 道具价格
 * @param {*} img 道具贴图
 * @param {*} soundClassName 道具音效（audio标签类名）
 * @param {*} effect 道具效果（回调函数，需要传入两个形参：character，enemies，表示角色DOM和敌人构造数组）
 */
function Props(name, description, price, img, soundClassName, effect) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.img = img;
	this.soundClassName = soundClassName;
	this.effect = effect;
}

//生命值+1
let healthAdd = new Props('生命值+1', '生命值加1', 80, '/img/props/addHealth.png', '.props-healthAdd', (character, enemies) => {
	health++;
	refreshDom();
});

//增加宫子移速
let moveAdd = new Props('移速提升', '在60s内提高宫子移动速度，不可叠加', 10, '/img/props/moveFaster.png', '.props-moveAdd', (character, enemies) => {
	miyakoMoveRatio = 20;
	let time = 60;
	let propsControl = setInterval(() => {
		if (!isPaused) {
			time--;
		}
		if (time < 0) {
			miyakoMoveRatio = 10;
			clearInterval(propsControl);
		}
	}, 1000);
});

//冻结所有布丁
let freezePuddings = new Props('冻结吧！', '冻结所有布丁25s', 60, '/img/props/freezePuddings.png', '.props-stopPuddings', (character, enemies) => {
	let time = 25;
	clearInterval(puddingControlInterval);
	let propsControl = setInterval(() => {
		if (!isPaused) {
			clearInterval(puddingControlInterval);
			time--;
		}
		if (time < 0) {
			puddingControlInterval = setInterval(puddingMove, 100);
			clearInterval(propsControl);
		}
	}, 1000);
});

propsList.push(healthAdd);
propsList.push(moveAdd);
propsList.push(freezePuddings);