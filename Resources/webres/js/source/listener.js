//监听键盘事件
//是否可以弹出道具提示
let showNoPropTip = true;

window.addEventListener('keydown', (e) => {
	if (!isPaused) {
		//宫子向上移动
		if ((e.keyCode == 38 || e.keyCode == 87)) {
			up(miyakoMoveRatio);
		}

		//宫子向下移动
		if ((e.keyCode == 40 || e.keyCode == 83)) {
			down(miyakoMoveRatio);
		}

		//开火
		if (e.keyCode == 32) {
			fire(weaponList[currentWeaponIndex]);
		}

		//切换武器
		if (e.keyCode == 69) {
			currentWeaponIndex++;
			if (currentWeaponIndex >= weaponList.length) {
				currentWeaponIndex = 0;
			}
			refreshDom();
			showTipFrame('已切换至武器：' + weaponList[currentWeaponIndex].name, weaponList[currentWeaponIndex].texture, '.tip-true');
		}

		if (e.keyCode == 81) {
			currentWeaponIndex--;
			if (currentWeaponIndex < 0) {
				currentWeaponIndex = weaponList.length - 1;
			}
			refreshDom();
			showTipFrame('已切换至武器：' + weaponList[currentWeaponIndex].name, weaponList[currentWeaponIndex].texture, '.tip-true');
		}

		//切换和使用道具
		if (e.keyCode == 90) {
			currentPropsIndex--;
			if (currentPropsIndex < 0) {
				currentPropsIndex = propsList.length - 1;
			}
			refreshDom();
			showTipFrame('已切换至道具：' + propsList[currentPropsIndex].name, propsList[currentPropsIndex].img, '.tip-true');
		}

		if (e.keyCode == 67) {
			currentPropsIndex++;
			if (currentPropsIndex >= propsList.length) {
				currentPropsIndex = 0;
			}
			refreshDom();
			showTipFrame('已切换至道具：' + propsList[currentPropsIndex].name, propsList[currentPropsIndex].img, '.tip-true');
		}

		if (e.keyCode == 86) {
			if (propsCount[currentPropsIndex] <= 0) {
				//2s内不可弹出同一提示
				if (showNoPropTip) {
					showTipFrame('该道具数量不足！', propsList[currentPropsIndex].img, '.tip-false');
					showNoPropTip = false;
					setTimeout(() => {
						showNoPropTip = true;
					}, 2000);
				}
			} else {
				document.querySelector(propsList[currentPropsIndex].soundClassName).play();
				propsList[currentPropsIndex].effect(miyako, puddingArray);
				propsCount[currentPropsIndex]--;
				refreshDom();
				showTipFrame('已使用道具：' + propsList[currentPropsIndex].name, propsList[currentPropsIndex].img, propsList[currentPropsIndex].soundClassName);
			}
		}
	}

	//暂停游戏
	if (e.keyCode == 80) {
		let isStartPageOn = window.getComputedStyle(startPage, null).getPropertyValue('display') != 'none';
		let isSucceedPageOn = window.getComputedStyle(succeedPage, null).getPropertyValue('display') != 'none';
		let isFailedPageOn = window.getComputedStyle(failedPage, null).getPropertyValue('display') != 'none';
		//是否在游戏之外，只要开始界面、失败界面或者成功界面有一个是显示的就说明不在游戏过程中
		let isOutofGame = isStartPageOn || isSucceedPageOn || isFailedPageOn;
		if (!isOutofGame) {
			if (!isPaused) {
				stopGameProcess();
				isPaused = true;
				operatePausePage(true);
			} else {
				startGameProcess();
				isPaused = false;
				operatePausePage(false);
			}
		}
	}
});

//新游戏按钮
startPageBtn[1].addEventListener('click', () => {
	if (!readData()) {
		newGameTipFrame.style.display = 'flex';
	} else {
		resetData();
		clearBullets();
		document.querySelector('.startAudio').play();
		operateStartPage(false);
		initializePuddings();
		startGameProcess();
	}
});

//新游戏提示按钮
newgameTipBtn[0].addEventListener('click', () => {
	newGameTipFrame.style.display = 'none';
	resetData();
	clearBullets();
	document.querySelector('.startAudio').play();
	operateStartPage(false);
	initializePuddings();
	startGameProcess();
});
newgameTipBtn[1].addEventListener('click', () => {
	newGameTipFrame.style.display = 'none';
});

//商店按钮
startPageBtn[2].addEventListener('click', () => {
	operateShopPage(true);
});

//排行榜按钮
startPageBtn[3].addEventListener('click', () => {
	operateRankPage(true);
});

//帮助按钮
startPageBtn[4].addEventListener('click', () => {
	opreateHelpPage(true);
});

//成功界面监听
let succeedPageBtn = document.querySelector('.succeed ul').children;
//下一关按钮
succeedPageBtn[0].addEventListener('click', () => {
	clearBullets();
	operateSuccessPage(false);
	initializePuddings();
	startGameProcess();
});
//返回主菜单按钮
succeedPageBtn[1].addEventListener('click', () => {
	operateSuccessPage(false);
	operateStartPage(true);
});

//失败界面监听
let failedPageBtn = document.querySelector('.failed ul').children;
//重新开始按钮
failedPageBtn[0].addEventListener('click', () => {
	clearBullets();
	opreateFailedPage(false);
	initializePuddings();
	startGameProcess();
});

//返回主菜单按钮
failedPageBtn[1].addEventListener('click', () => {
	opreateFailedPage(false);
	operateStartPage(true);
});

//排行榜界面按钮
rankPage.children[1].lastElementChild.addEventListener('click', () => {
	operateRankPage(false);
});

//帮助界面按钮
helpPage.children[0].lastElementChild.addEventListener('click', () => {
	opreateHelpPage(false);
});

//商店页面操纵按钮
let shopBtn = shopPage.children[0].lastElementChild;
shopBtn.children[0].addEventListener('click', () => {
	buyItems();
});
shopBtn.children[1].addEventListener('click', () => {
	operateShopPage(false);
});

//登录和注册按钮
let loginBtn = document.querySelector('.start .userInfo .login');
let regBtn = document.querySelector('.start .userInfo .register');
let userBtn = document.querySelector('.start .userInfo .player');
if (loginBtn != null && regBtn != null) {
	loginBtn.addEventListener('click', () => {
		window.location.pathname = '/miyakogame/player/login';
	});
	regBtn.addEventListener('click', () => {
		window.location.pathname = '/miyakogame/player/register';
	});
}
if (userBtn != null) {
	let userPanelDOM = document.querySelector('.start .userInfo .userPanel');
	let pointerDOM = document.querySelector('.start .userInfo .player .pointer');
	let eachListBtn = document.querySelector('.start .userInfo .userPanel .userPanelList').children;
	userBtn.addEventListener('mouseenter', () => {
		//暂时关闭鼠标效果
		mouseMoveDropDotControl(false);
		mouseClickLineControl(false);
		pointerDOM.style.transform = 'rotate(180deg)';
		userPanelDOM.style.display = 'flex';
	});
	userPanelDOM.addEventListener('mouseleave', () => {
		//重新打开鼠标效果
		mouseMoveDropDotControl(true);
		mouseClickLineControl(true);
		pointerDOM.style.transform = 'rotate(0deg)';
		userPanelDOM.style.display = 'none';
	});
	//修改信息页面
	eachListBtn[0].addEventListener('click', () => {
		operateUserInfoUpdatePage(true);
	});
	//退出登录页面
	eachListBtn[1].addEventListener('click', () => {
		fetch('/miyakogame/api/player/logout');
		showTipFrame('已登出！3s后刷新页面...', null, '.tip-true');
		setTimeout(() => {
			window.location.pathname = '/miyakogame';
		}, 3000);
	});
}