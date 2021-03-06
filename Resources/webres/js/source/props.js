//游戏道具
//所有道具列表
let propsList = [];

/**
 * 道具构造函数
 * @param {*} name 道具名
 * @param {*} description 道具描述
 * @param {*} price 道具价格
 * @param {*} img 道具贴图
 * @param {*} effect 道具效果（回调函数，需要传入两个形参：character，enemies，表示角色DOM和敌人构造数组）
 */
function Props(name, description, price, img, effect) {
	this.name = name;
	this.description = description;
	this.price = price;
	this.img = img;
	this.effect = effect;
}

//生命值+1
let healthAdd = new Props('生命值+1', '生命值加1', 80, '/img/props/addHealth.png', (character, enemies) => {
	health++;
	refreshDom();
});

propsList.push(healthAdd);