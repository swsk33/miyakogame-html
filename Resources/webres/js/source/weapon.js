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
 * @param {*} shooting 子弹发射方法，用于生成子弹dom，可以理解为初始化子弹dom的作用（回调函数，需要有两个形参x，y，分别表示子弹初始位置的横纵坐标，并返回子弹的dom节点或者dom节点数组）
 * @param {*} flying 子弹飞行方法，决定子弹飞行方向速度等等（回调函数，需要有两个形参bulletDOM，enemies分别表示子弹对应的dom节点对象、构造敌人数组，若为单个敌人也放入数组作为单元素数组传入，需要计时器循环调用）
 * @param {*} hitTrigger 子弹击中时触发的函数，击中敌人时发生事件，一般敌人消失这个事件会被写入此（回调函数，需要有三个形参bulletDOM，enemy，enemies，分别表示子弹dom节点（无论武器一次发射单发还是多发，这里传入的始终是单个子弹的dom）、构造敌人对象和所有敌人数组）
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

/**
 * 生成子弹的dom节点，为img元素，并放到页面上
 * @param {*} src 子弹贴图url
 * @param {*} x 生成x坐标
 * @param {*} y 生成y坐标
 * @returns 子弹dom对象
 */
function generateImageBulletDOM(src, x, y) {
	let imgBulletDom = document.createElement('img');
	imgBulletDom.src = src;
	imgBulletDom.style.position = 'absolute';
	imgBulletDom.style.left = x + 'px';
	imgBulletDom.style.top = y + 'px';
	gameBackground.appendChild(imgBulletDom);
	return imgBulletDom;
}

/**
 * 控制dom元素水平方向飞行（移动）的函数，每调用一次函数则沿着水平正右方向按照指定速度移动一下（这个函数用于子弹飞行方法里面，飞行方法会被计时器循环调用，以实现子弹飞行效果）
 * @param {*} dom 要移动的dom元素
 * @param {*} velocity 速度，即为每次位移距离
 */
function domFlyX(dom, velocity) {
	let x = dom.offsetLeft;
	x = x + velocity;
	dom.style.left = x + 'px';
}

/**
 * 控制dom元素垂直方向飞行（移动）的函数，每调用一次函数则沿着垂直向下方向按照指定速度移动一下（这个函数用于子弹飞行方法里面，飞行方法会被计时器循环调用，以实现子弹飞行效果）
 * @param {*} dom 要移动的dom元素
 * @param {*} velocity 速度，即为每次位移距离
 */
function domFlyY(dom, velocity) {
	let y = dom.offsetTop;
	x = y - velocity;
	dom.style.top = y + 'px';
}

/**
 * 控制dom元素飞行（移动）的函数，每调用一次函数则沿着指定角度和速度移动一下（这个函数用于子弹飞行方法里面，飞行方法会被计时器循环调用，以实现子弹飞行效果）
 * @param {*} dom 要移动的dom元素
 * @param {*} velocity 速度，即为每次位移距离
 * @param {*} direction 位移方向，以正右为0，逆时针为正方向，单位度
 */
function domFly(dom, velocity, direction) {
	//弧度制转换
	let arcDirection = (direction / 180) * Math.PI;
	//dom移动
	let x = dom.offsetLeft;
	let y = dom.offsetTop;
	x = x + Math.cos(arcDirection) * velocity;
	y = y - Math.sin(arcDirection) * velocity;
	dom.style.left = x + 'px';
	dom.style.top = y + 'px';
}

//默认武器模板
let defaultWeapon = new Weapon('常规鬼火', 0, '/img/bullets/bullet.png', 600, '.fireAudio', (x, y) => {
	return generateImageBulletDOM(defaultWeapon.texture, x, y);
}, (bulletDOM, enemies) => {
	domFlyX(bulletDOM, 8);
}, (bulletDOM, enemy, enemies) => {
	document.querySelector('.scoreAduio').play();
	enemyFadeEffect(enemy);
	bulletDOM.remove();
});

//穿透鬼火模板
let penetrateWildfire = new Weapon('穿透鬼火', 15, '/img/bullets/bullet-penetrate.png', 1500, '.fire-penetrateAudio', (x, y) => {
	return generateImageBulletDOM(penetrateWildfire.texture, x, y);
}, (bulletDOM, enemies) => {
	domFlyX(bulletDOM, 9);
}, (bulletDOM, enemy, enemies) => {
	document.querySelector('.scoreAduio').play();
	enemyFadeEffect(enemy);
});

//爆裂之火模板
let boomWildfire = new Weapon('爆裂之火', 15, '/img/bullets/bullet-boom.gif', 1250, '.fire-boomAudio', (x, y) => {
	return generateImageBulletDOM(boomWildfire.texture, x, y);
}, (bulletDOM, enemies) => {
	domFlyX(bulletDOM, 7);
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
let scatterMagic = new Weapon('散布式魔法', 20, '/img/bullets/scatter-icon.png', 2000, '.fire-scatterAudio', (x, y) => {
	let doms = [];
	const colors = ['#ff0f26', '#ff7d0f', '#ffe72e', '#b2ff2e', '#3cff2e', '#2effd3', '#0700ff', '#c000ff'];
	let count = 8;
	let shootControl = setInterval(() => {
		let direction = genRandom(-20, 20);
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
}, (bulletDOM, enemies) => {
	for (let i = 0; i < bulletDOM.length; i++) {
		domFly(bulletDOM[i], 8, bulletDOM[i].flydirect);
	}
}, (bulletDOM, enemy, enemies) => {
	document.querySelector('.scoreAduio').play();
	enemyFadeEffect(enemy);
	bulletDOM.remove();
});

//弹弹魔法
let bounceMagic = new Weapon('弹弹魔法', 2, '/img/bullets/bounce-icon.png', 300, '.fire-bounce-shootAudio', (x, y) => {
	let direction = genRandom(-60, 60);
	let dom = generateImageBulletDOM('/img/bullets/bounce-' + genRandom(1, 2) + '.png', x, y);
	dom.flydirect = direction;
	return dom;
}, (bulletDOM, enemies) => {
	let v = 7;
	//判断是否到达上下边界，是的话就发生反弹
	if (bulletDOM.offsetTop - v <= 0 || bulletDOM.offsetTop + v + bulletDOM.offsetHeight >= gameBackground.offsetHeight) {
		bulletDOM.flydirect = -bulletDOM.flydirect;
		document.querySelector('.fire-bounce-reflectAudio').play();
	}
	domFly(bulletDOM, v, bulletDOM.flydirect);
}, (bulletDOM, enemy, enemies) => {
	document.querySelector('.scoreAduio').play();
	enemyFadeEffect(enemy);
	bulletDOM.remove();
});

//追踪光球
let traceBall = new Weapon('追踪光球', 5, '/img/bullets/trace.png', 300, '.fire-traceAudio', (x, y) => {
	let dom = generateImageBulletDOM(traceBall.texture, x, y);
	dom.flydirect = 0;
	dom.targetEnemy = null;
	return dom;
}, (bulletDOM, enemies) => {
	//检查这个子弹是否锁定了敌人或者其锁定的敌人是否不是存活状态，没有锁定敌人或者锁定敌人已经被吃掉就重新锁定
	if (bulletDOM.targetEnemy == null || bulletDOM.targetEnemy.isEaten) {
		for (let enemy of enemies) {
			if (!enemy.isEaten) {
				bulletDOM.targetEnemy = enemy;
				break;
			}
		}
	}
	let v = 8;
	//添加子弹尾迹
	const colors = ['#ff0f26', '#ff7d0f', '#ffe72e', '#b2ff2e', '#3cff2e', '#2effd3', '#0700ff', '#c000ff'];
	let color = colors[genRandom(0, colors.length - 1)];
	let dotRadius = Math.random();
	if (dotRadius < 0.5) {
		dotRadius = dotRadius + 1;
	}
	let dot = document.createElement('div');
	dot.style.position = 'absolute';
	dot.style.width = dotRadius + 'px';
	dot.style.height = dotRadius + 'px';
	dot.style.borderRadius = '50%';
	dot.style.backgroundColor = color;
	dot.style.boxShadow = '0px 0px 1px 2px ' + color;
	dot.style.left = bulletDOM.offsetLeft + bulletDOM.offsetWidth / 2 + 'px';
	dot.style.top = bulletDOM.offsetTop + bulletDOM.offsetHeight / 2 + 'px';
	gameBackground.appendChild(dot);
	let dotDropSpeed = 1;
	let dotDisappearTime = 100;
	//如果锁敌失败则沿着当前方向飞行
	if (bulletDOM.targetEnemy == null || bulletDOM.targetEnemy.isEaten) {
		domFly(bulletDOM, v, bulletDOM.flydirect);
	} else { //否则计算自己和敌人中心位置角度
		let targetX = bulletDOM.targetEnemy.dom.offsetLeft + bulletDOM.targetEnemy.dom.offsetWidth / 2;
		let targetY = bulletDOM.targetEnemy.dom.offsetTop + bulletDOM.targetEnemy.dom.offsetHeight / 2;
		let xDistance = targetX - (bulletDOM.offsetLeft + bulletDOM.offsetWidth / 2);
		let yDistance = (bulletDOM.offsetTop + bulletDOM.offsetHeight / 2) - targetY;
		let direction = Math.atan2(yDistance, xDistance) / Math.PI * 180;
		domFly(bulletDOM, v, direction);
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
weaponList.push(bounceMagic);
weaponList.push(traceBall);