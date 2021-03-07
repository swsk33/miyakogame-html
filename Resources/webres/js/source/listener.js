//监听键盘事件
window.addEventListener('keydown', function (e) {
	//宫子向上移动
	if ((e.keyCode == 38 || e.keyCode == 87) && !isPaused) {
		up(miyakoMoveRatio);
	}

	//宫子向下移动
	if ((e.keyCode == 40 || e.keyCode == 83) && !isPaused) {
		down(miyakoMoveRatio);
	}

	//开火
	if (e.keyCode == 32 && !isPaused) {
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
			showTipFrame('该道具数量不足！', propsList[currentPropsIndex].img, '.tip-false');
		} else {
			document.querySelector(propsList[currentPropsIndex].soundClassName).play();
			propsList[currentPropsIndex].effect(miyako, puddingArray);
			propsCount[currentPropsIndex]--;
			refreshDom();
			showTipFrame('已使用道具：' + propsList[currentPropsIndex].name, propsList[currentPropsIndex].img, propsList[currentPropsIndex].soundClassName);
		}
	}

	//暂停游戏
	if (e.keyCode == 80) {
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
});

//新游戏按钮
startPageBtn[1].addEventListener('click', function () {
	resetData();
	saveData();
	clearBullets();
	document.querySelector('.startAudio').play();
	operateStartPage(false);
	initializePuddings();
	startGameProcess();
});

//商店按钮
startPageBtn[2].addEventListener('click', function () {
	operateShopPage(true);
});

//帮助按钮
startPageBtn[3].addEventListener('click', function () {
	opreateHelpPage(true);
});

//成功界面监听
let succeedPageBtn = document.querySelector('.succeed ul').children;
//下一关按钮
succeedPageBtn[0].addEventListener('click', function () {
	clearBullets();
	operateSuccessPage(false);
	initializePuddings();
	startGameProcess();
});
//返回主菜单按钮
succeedPageBtn[1].addEventListener('click', function () {
	operateSuccessPage(false);
	operateStartPage(true);
});

//失败界面监听
let failedPageBtn = document.querySelector('.failed ul').children;
//重新开始按钮
failedPageBtn[0].addEventListener('click', function () {
	resetData();
	saveData();
	clearBullets();
	opreateFailedPage(false);
	initializePuddings();
	startGameProcess();
});

//返回主菜单按钮
failedPageBtn[1].addEventListener('click', function () {
	opreateFailedPage(false);
	operateStartPage(true);
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