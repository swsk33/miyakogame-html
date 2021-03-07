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
 * @param {*} hitTrigger 子弹击中时触发的函数（回调函数，需要有三个形参bulletDOM，enemy，enemies，分别表示子弹dom节点（无论武器一次发射单发还是多发，这里传入的始终是单个子弹的dom）、构造敌人对象和所有敌人数组）
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
let penetrateWildfire = new Weapon('穿透鬼火', 15, '/img/bullets/bullet-penetrate.png', 1500, '.fire-penetrateAudio', (x, y) => {
	let dom = document.createElement('img');
	dom.src = penetrateWildfire.texture;
	dom.style.position = 'absolute';
	dom.style.left = x + 'px';
	dom.style.top = y + 'px';
	gameBackground.appendChild(dom);
	return dom;
}, (bulletDOM) => {
	let x = bulletDOM.offsetLeft;
	x = x + 9;
	bulletDOM.style.left = x + 'px';
}, (bulletDOM, enemy, enemies) => {
	document.querySelector('.scoreAduio').play();
	enemyFadeEffect(enemy);
});

//爆裂之火模板
let boomWildfire = new Weapon('爆裂之火', 10, '/img/bullets/bullet-boom.gif', 1250, '.fire-boomAudio', (x, y) => {
	let dom = document.createElement('img');
	dom.src = boomWildfire.texture;
	dom.style.position = 'absolute';
	dom.style.left = x + 'px';
	dom.style.top = y + 'px';
	gameBackground.appendChild(dom);
	return dom;
}, (bulletDOM) => {
	let x = bulletDOM.offsetLeft;
	x = x + 7;
	bulletDOM.style.left = x + 'px';
}, (bulletDOM, enemy, enemies) => {
	document.querySelector('.score-boomAudio').play();
	const colors = ['#ff0f26', '#ff7d0f', '#ffe72e', '#b2ff2e', '#3cff2e', '#2effd3', '#0700ff', '#c000ff'];
	let bulletAtX = bulletDOM.offsetLeft - bulletDOM.offsetWidth / 2;
	let bulletAtY = bulletDOM.offsetTop - bulletDOM.offsetHeight / 2;
	let radius = 1;
	let radiusGrowth = 5;
	let color = colors[genRandom(0, colors.length - 1)];
	let shockWave = document.createElement('div');
	shockWave.style.position = 'absolute';
	shockWave.style.left = bulletAtX + 'px';
	shockWave.style.top = bulletAtY + 'px';
	shockWave.style.borderColor = color;
	shockWave.style.borderRadius = '50%';
	shockWave.style.borderStyle = 'solid';
	shockWave.style.borderWidth = '5px';
	bulletDOM.remove();
	gameBackground.appendChild(shockWave);
	let keyFrame = 42;
	let waveControl = setInterval(() => {
		shockWave.style.width = radius + 'px';
		shockWave.style.height = radius + 'px';
		shockWave.style.left = (bulletAtX - radius / 2) + 'px';
		shockWave.style.top = (bulletAtY - radius / 2) + 'px';
		if (shockWave.offsetLeft + radius + radiusGrowth / 2 < gameBackground.offsetWidth && shockWave.offsetTop + radius + radiusGrowth / 2 < gameBackground.offsetHeight) {
			radius = radius + radiusGrowth;
		}
		for (let i = 0; i < enemies.length; i++) {
			if (!enemies[i].isEaten) {
				//条件1：冲击波的右下部分在敌人贴图范围内
				let criteria1 = shockWave.offsetTop + shockWave.offsetHeight >= enemies[i].dom.offsetTop && shockWave.offsetLeft + shockWave.offsetWidth >= enemies[i].dom.offsetLeft;
				//条件2：冲击波左上部分在敌人贴图范围内
				let criteria2 = shockWave.offsetTop <= enemies[i].dom.offsetTop + enemies[i].dom.offsetHeight && shockWave.offsetLeft <= enemies[i].dom.offsetLeft + enemies[i].dom.offsetWidth;
				//总条件：两个条件需要同时满足
				let criteriaTotal = criteria1 && criteria2;
				if (criteriaTotal) {
					enemyFadeEffect(enemies[i]);
				}
			}
		}
		keyFrame--;
		if (keyFrame <= 12) {
			if (radiusGrowth > 0) {
				radiusGrowth--;
			}
		}
		if (keyFrame <= 0) {
			shockWave.remove();
			clearInterval(waveControl);
		}
	}, 16);
});

//散布式魔法
let scatterMagic = new Weapon('散布式魔法', 15, '/img/bullets/scatter-icon.png', 2000, '.fire-scatterAudio', (x, y) => {
	let doms = [];
	const colors = ['#ff0f26', '#ff7d0f', '#ffe72e', '#b2ff2e', '#3cff2e', '#2effd3', '#0700ff', '#c000ff'];
	let count = 8;
	let shootControl = setInterval(() => {
		let direction = (genRandom(-20, 20) / 180) * Math.PI;
		let startAtY = y + genRandom(-5, 5);
		let color = colors[genRandom(0, dotColors.length - 1)];
		let eachDot = document.createElement('div');
		eachDot.style.position = 'absolute';
		eachDot.style.width = '3px';
		eachDot.style.height = '3px';
		eachDot.style.borderRadius = '50%';
		eachDot.style.backgroundColor = color;
		eachDot.style.boxShadow = '0px 0px 4px 5px ' + color;
		eachDot.style.left = x + 'px';
		eachDot.style.top = startAtY + 'px';
		eachDot.flydirect = direction;
		gameBackground.appendChild(eachDot);
		doms.push(eachDot);
		count--;
		if (count <= 0) {
			clearInterval(shootControl);
		}
	}, 60);
	return doms;
}, (bulletDOM) => {
	for (let i = 0; i < bulletDOM.length; i++) {
		let direction = bulletDOM[i].flydirect;
		let v = 8;
		let x = bulletDOM[i].offsetLeft;
		let y = bulletDOM[i].offsetTop;
		x = x + Math.cos(direction) * v;
		y = y + Math.sin(direction) * v;
		bulletDOM[i].style.left = x + 'px';
		bulletDOM[i].style.top = y + 'px';
	}
}, (bulletDOM, enemy, enemies) => {
	document.querySelector('.scoreAduio').play();
	enemyFadeEffect(enemy);
	bulletDOM.remove();
});

//设定武器列表
weaponList.push(defaultWeapon);
weaponList.push(penetrateWildfire);
weaponList.push(boomWildfire);
weaponList.push(scatterMagic);