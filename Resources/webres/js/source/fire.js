//火控系统
//子弹构造对象数组
let bulletArray = [];

/**
 * 根据武器模板射击子弹
 * 该函数实际上是对武器模板对象的深复制，因为直接使用武器模板赋值会导致武器模板的dom属性也被修改，不仅破坏了模板信息，还不能实现多个不同子弹效果
 * @param {*} weapon 武器模板
 * @returns 根据武器模板生成子弹
 */
function genBulletByWeaponTemplate(weapon) {
	let destObject = {};
	for (let key in weapon) {
		let property = weapon[key];
		if (property == null) {
			destObject[key] = null;
		} else if (property == undefined) {
			destObject[key] = undefined;
		} else if (typeof property == 'object') {
			destObject[key] = genBulletByWeaponTemplate(property);
		} else {
			destObject[key] = property;
		}
	}
	return destObject;
}

/**
 * 开火函数
 * @param {*} weapon 武器模板
 */
function fire(weapon) {
	//在装填完毕且有子弹的时候可以开火
	if (!isLoadingBullet && (currentWeaponIndex == 0 || weaponCount[currentWeaponIndex] > 0)) {
		//射击后装载
		isLoadingBullet = true;
		setTimeout(function () {
			isLoadingBullet = false;
		}, weapon.interval);
		//生成子弹
		let bullet = genBulletByWeaponTemplate(weapon);
		document.querySelector(bullet.soundClassName).play();
		bullet.dom = bullet.shooting(miyako.offsetLeft + miyako.offsetWidth, miyako.offsetTop + (0.3 * miyako.offsetHeight));
		bulletArray.push(bullet);
		//子弹数-1
		if (currentWeaponIndex != 0) {
			weaponCount[currentWeaponIndex]--;
			refreshDom();
		}
	} else if (weaponCount[currentWeaponIndex] == 0) { //当前武器没子弹时发出提示
		showTipFrame('当前武器没有弹药！请切换武器！', weaponList[currentWeaponIndex].texture, '.tip-false');
	}
}

/**
 * 全局子弹飞行主控，此函数为回调函数，需通过另外的循环计时器调用
 * @param {*} bullets 子弹构造数组
 * @param {*} enemies 敌人构造对象数组
 */
function bulletFlyMainControl(bullets, enemies) {
	for (let i = 0; i < bullets.length; i++) {
		let eachBullet = bullets[i];
		let eachBulletDOM = eachBullet.dom;
		//执行子弹自身的飞行方法
		eachBullet.flying(eachBulletDOM, enemies);
		//有的武器一次可以发射多颗子弹，因此每个武器中的子弹全部视作数组。单子弹武器的dom属性就表示一颗子弹，多子弹武器中dom属性表示该武器每次发射的子弹组。
		//因为子弹判定必须是一颗颗的，所以说无论是单子弹还是多子弹武器，每次的子弹全放进数组，单子弹武器的子弹dom就创建为单元素数组。然后下面统一做遍历操作。
		let eachBulletDOMArray = [];
		if (Object.prototype.toString.call(eachBulletDOM) != '[object Array]') {
			eachBulletDOMArray.push(eachBulletDOM);
		} else {
			eachBulletDOMArray = eachBulletDOM;
		}
		//开始碰撞检测
		for (let j = 0; j < eachBulletDOMArray.length; j++) {
			let getSingleBulletDOM = eachBulletDOMArray[j];
			for (let k = 0; k < enemies.length; k++) {
				if (!enemies[k].isEaten) {
					//条件1：子弹的右下部分在敌人贴图范围内
					let criteria1 = getSingleBulletDOM.offsetTop + getSingleBulletDOM.offsetHeight >= enemies[k].dom.offsetTop && getSingleBulletDOM.offsetLeft + getSingleBulletDOM.offsetWidth >= enemies[k].dom.offsetLeft;
					//条件2：子弹左上部分在敌人贴图范围内
					let criteria2 = getSingleBulletDOM.offsetTop <= enemies[k].dom.offsetTop + enemies[k].dom.offsetHeight && getSingleBulletDOM.offsetLeft <= enemies[k].dom.offsetLeft + enemies[k].dom.offsetWidth;
					//总条件：两个条件需要同时满足
					let criteriaTotal = criteria1 && criteria2;
					if (criteriaTotal) {
						//执行子弹自身的击中方法
						eachBullet.hitTrigger(getSingleBulletDOM, enemies[k], enemies);
						if (getSingleBulletDOM.offsetParent == null) {
							eachBulletDOMArray.splice(j, 1);
						}
						break;
					}
				}
			}
			//假设子弹没有消失，说明子弹没有击中敌人或者属于击中敌人但是不消失的武器类型，那么进一步判断子弹是否飞出边界，是的话也要销毁自身
			if (getSingleBulletDOM.offsetParent != null) {
				if (getSingleBulletDOM.offsetLeft + getSingleBulletDOM.offsetWidth >= gameBackground.offsetWidth || getSingleBulletDOM.offsetTop <= 0 || getSingleBulletDOM.offsetTop + getSingleBulletDOM.offsetHeight >= gameBackground.offsetHeight) {
					getSingleBulletDOM.remove();
					eachBulletDOMArray.splice(j, 1);
				}
			}
			//最后，如果这个子弹（组）完全消失了，将其子弹构造对象移出子弹构造数组
			if (eachBulletDOMArray.length == 0) {
				bullets.splice(i, 1);
			}
		}
	}
}

/**
 * 清空所有子弹
 */
function clearBullets() {
	for (let i = 0; i < bulletArray.length; i++) {
		if (Object.prototype.toString.call(bulletArray[i].dom) != '[object Array]') {
			bulletArray[i].dom.remove();
		} else {
			for (let j = 0; j < bulletArray[i].dom.length; j++) {
				bulletArray[i].dom[j].remove();
			}
		}
	}
	bulletArray = [];
}