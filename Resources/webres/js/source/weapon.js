//关于不同的武器
//武器（魔法）列表
let weaponList = [];

/**
 * 武器类构造函数，每个对象相当于屏幕上一颗子弹
 * @param {*} name 武器（魔法）名
 * @param {*} price 武器价格
 * @param {*} texture 子弹贴图url
 * @param {*} shootingSound 射击音效（audio标签dom）
 * @param {*} flyingMethod 子弹飞行方法（回调函数，需要计时器循环调用）
 * @param {*} hitTrigger 子弹击中时触发的函数（回调函数）
 */
function Weapon(name, price, texture, shootingSound, flyingMethod, hitTrigger) {
	this.name = name;
	this.price = price;
	this.texture = texture;
	this.shootingSound = shootingSound;
	//子弹dom节点
	this.dom = document.createElement('img');
	this.dom.src = texture;
	this.dom.style.position = 'absolute';
	this.flyingMethod = flyingMethod;
	this.hitTrigger = hitTrigger;
	//生成子弹
	this.createBullet = () => {
		gameBackground.appendChild(this.dom);
		shootingSound.play();
	}
}

//默认武器
let defaultWeapon = new Weapon('常规鬼火', 0, '/img/bullets/bullet.png', document.querySelector('.fireAudio'), () => {
	let x = defaultWeapon.dom.offsetLeft;
	x = x + 8;
	defaultWeapon.dom.style.left = x + 'px';
}, (enemy) => {
	document.querySelector('.scoreAduio').play();
	enemyFadeEffect(enemy);
	defaultWeapon.dom.remove();
});
//穿透鬼火

//爆炸鬼火

//散布式魔法

weaponList.push(defaultWeapon);