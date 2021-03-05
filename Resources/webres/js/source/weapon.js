//关于不同的武器
//武器模板（魔法）列表
let weaponList = [];

/**
 * 武器类构造函数，用于构造一个武器模板
 * @param {*} name 武器（魔法）名
 * @param {*} price 武器价格
 * @param {*} texture 子弹贴图url
 * @param {*} interval 射击间隔（ms）
 * @param {*} soundClassName 射击音效（音频dom的类名）
 * @param {*} shooting 子弹发射方法（回调函数，需要有两个形参x，y，分别表示子弹初始位置的横纵坐标，并返回子弹的dom节点或者dom节点数组）
 * @param {*} flying 子弹飞行方法（回调函数，需要有一个形参bulletDOM表示子弹对应的dom节点对象，需要计时器循环调用）
 * @param {*} hitTrigger 子弹击中时触发的函数（回调函数，需要有三个形参bulletDOM，enemy，enemies，分别表示子弹dom节点、构造敌人对象和所有敌人数组）
 */
function Weapon(name, price, texture, interval, soundClassName, shooting, flying, hitTrigger) {
	this.name = name;
	this.price = price;
	this.texture = texture;
	this.interval = interval;
	this.soundClassName = soundClassName;
	this.shooting = shooting;
	this.flying = flying;
	this.hitTrigger = hitTrigger;
}

//默认武器模板
let defaultWeapon = new Weapon('常规鬼火', 0, '/img/bullets/bullet.png', 600, '.fireAudio', (x, y) => {
	let dom = document.createElement('img');
	dom.src = defaultWeapon.texture;
	dom.style.position = 'absolute';
	dom.style.left = x + 'px';
	dom.style.top = y + 'px';
	gameBackground.appendChild(dom);
	return dom;
}, (bulletDOM) => {
	let x = bulletDOM.offsetLeft;
	x = x + 8;
	bulletDOM.style.left = x + 'px';
}, (bulletDOM, enemy, enemies) => {
	document.querySelector('.scoreAduio').play();
	enemyFadeEffect(enemy);
	bulletDOM.remove();
});

//穿透鬼火模板
let penetrateWildfire = new Weapon('穿透鬼火', 20, '/img/bullets/bullet-penetrate.png', 800, '.fireAudio', (x, y) => {
	let dom = document.createElement('img');
	dom.src = penetrateWildfire.texture;
	dom.style.position = 'absolute';
	dom.style.left = x + 'px';
	dom.style.top = y + 'px';
	gameBackground.appendChild(dom);
	return dom;
}, (bulletDOM) => {
	let x = bulletDOM.offsetLeft;
	x = x + 12;
	bulletDOM.style.left = x + 'px';
}, (bulletDOM, enemy, enemies) => {
	document.querySelector('.scoreAduio').play();
	enemyFadeEffect(enemy);
});
//爆炸鬼火

//散布式魔法

weaponList.push(defaultWeapon);
weaponList.push(penetrateWildfire);