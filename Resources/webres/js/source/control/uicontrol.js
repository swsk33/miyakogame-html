//界面控制器
//关键网页dom
let currentScoreDom = document.querySelector('.game .topBar .scorePanel .currentScore'); //当前分数dom
let highScoreDom = document.querySelector('.game .topBar .scorePanel .highScore'); //最高分数dom
let levelDom = document.querySelector('.game .topBar .level'); //关卡dom
let healthDom = document.querySelector('.game .topBar .health .t'); //获取生命值文字部分dom
let propsDom = document.querySelector('.game .topBar .props'); //获取道具指示部分的dom
let weaponDom = document.querySelector('.game .topBar .weapon'); //获取武器指示部分的dom
let gameBackground = document.querySelector('.game .gameBg'); //获取游戏背景
let gameTopBar = document.querySelector('.game .topBar'); //获取游戏上栏
let succeedPage = document.querySelector('.succeed'); //获取胜利界面
let failedPage = document.querySelector('.failed'); //获取失败界面
let startPage = document.querySelector('.start'); //获取开始界面
let pausePage = document.querySelector('.pause'); //获取暂停界面
let rankPage = document.querySelector('.leaderboard'); //获取排行榜页面
let loadingPage = document.querySelector('.loading'); //获取加载页面
let processBarOutline = document.querySelector('.loading .processBar'); //获取进度条外框
let processBar = document.querySelector('.loading .processBar .processValue'); //获取进度条
let processNum = document.querySelector('.loading .processNum'); //获取加载动画数值
let notSupportPage = document.querySelector('.notsupport'); //获取不支持提示页面
let helpPage = document.querySelector('.help'); //获取帮助界面
let shopPage = document.querySelector('.shop'); //获取商店页面
let startPageBtn = document.querySelector('.start ul').children; //获取开始界面的所有按钮

/**
 * 开始页面控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operateStartPage(isVisible) {
	if (isVisible) {
		startPage.children[0].style.display = 'flex';
		startPage.children[1].style.display = 'inline';
		startPage.style.borderRight = 'none';
		startPage.style.width = '100%';
		if (readData() || health < 0) {
			startPageBtn[0].style.color = 'gray';
			startPageBtn[0].removeEventListener('click', continueGame);
		} else {
			startPageBtn[0].style.color = '#ff5500';
			startPageBtn[0].addEventListener('click', continueGame);
		}
		startPage.style.display = 'flex';
	} else {
		let pageWidth = startPage.offsetWidth;
		startPage.style.left = -pageWidth + 'px';
		setTimeout(() => {
			startPage.style.display = 'none';
		}, 800);
	}
}

/**
 * 操纵顶栏控件
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operateTopBarContent(isVisible) {
	if (isVisible) {
		for (let i = 0; i < gameTopBar.children.length; i++) {
			gameTopBar.children[i].style.display = 'flex';
		}
	} else {
		for (let i = 0; i < gameTopBar.children.length; i++) {
			gameTopBar.children[i].style.display = 'none';
		}
	}
}

/**
 * 操纵加载页面
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operateLoadingPage(isVisible) {
	if (isVisible) {
		loadingPage.style.display = 'flex';
	} else {
		loadingPage.style.display = 'none';
	}
}

/**
 * 操控进度条和进度数值
 * @param {*} value 进度百分比
 */
function setLoadingBar(value) {
	processBar.style.width = value + '%';
	processNum.innerHTML = 'process ' + value.toFixed(2) + '%';
}

/**
 * 操纵不支持提示页
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 * @param {*} msg 提示信息
 */
function operateNotSupportPage(isVisible, msg) {
	if (isVisible) {
		notSupportPage.style.display = 'flex';
		notSupportPage.children[1].innerHTML = msg;
	} else {
		notSupportPage.style.display = 'none';
	}
}

/**
 * 失败页面控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function opreateFailedPage(isVisible) {
	if (isVisible) {
		failedPage.style.display = 'flex';
		document.querySelector('.failedAudio-' + genRandom(1, 3)).play();
	} else {
		failedPage.style.display = 'none';
	}
}

/**
 * 胜利页面控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operateSuccessPage(isVisible) {
	if (isVisible) {
		succeedPage.style.display = 'flex';
		document.querySelector('.succeedAduio-' + genRandom(1, 2)).play();
	} else {
		succeedPage.style.display = 'none';
	}
}

/**
 * 暂停蒙层控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operatePausePage(isVisible) {
	if (isVisible) {
		pausePage.style.display = 'flex';
	} else {
		pausePage.style.display = 'none';
	}
}

/**
 * 帮助页面控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function opreateHelpPage(isVisible) {
	if (isVisible) {
		helpPage.style.display = 'flex';
	} else {
		helpPage.style.display = 'none';
	}
}

/**
 * 商店页面控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operateShopPage(isVisible) {
	if (isVisible) {
		//关闭鼠标效果防止造成影响
		mouseMoveDropDotControl(false);
		mouseClickLineControl(false);
		//获取当前所有分数
		currentDOM.innerText = '当前有' + currentScore + '分';
		//根据道具信息获取道具列表
		for (let i = 0; i < propsList.length; i++) {
			let eachPropsItem = document.createElement('li');
			let img = document.createElement('img');
			img.src = propsList[i].img;
			let descriptionDialog = document.createElement('div');
			descriptionDialog.style.position = 'absolute';
			descriptionDialog.style.backgroundColor = 'white';
			descriptionDialog.style.borderStyle = 'solid';
			descriptionDialog.style.borderWidth = '1.5px';
			descriptionDialog.style.borderRadius = '3px';
			descriptionDialog.innerText = propsList[i].description;
			let name = document.createElement('div');
			name.innerText = propsList[i].name + ' ' + propsList[i].price;
			name.addEventListener('mouseenter', (e) => {
				descriptionDialog.style.left = (e.pageX - descriptionDialog.offsetWidth) + 'px';
				descriptionDialog.style.top = (e.pageY - 36) + 'px';
				document.querySelector('body').appendChild(descriptionDialog);
			});
			name.addEventListener('mouseleave', () => {
				descriptionDialog.remove();
			});
			let count = document.createElement('div');
			count.style.color = 'purple';
			count.innerText = '0';
			let buttons = document.createElement('div');
			buttons.className = 'countButtonBox';
			let addOne = document.createElement('div');
			addOne.addEventListener('click', () => {
				eachPropsSelectCount[i]++;
				count.innerText = eachPropsSelectCount[i];
				totalPrice = totalPrice + propsList[i].price;
				totalDOM.innerText = '共消耗' + totalPrice + '积分';
			});
			addOne.innerText = '+1';
			let addTen = document.createElement('div');
			addTen.addEventListener('click', () => {
				eachPropsSelectCount[i] = eachPropsSelectCount[i] + 10;
				count.innerText = eachPropsSelectCount[i];
				totalPrice = totalPrice + 10 * propsList[i].price;
				totalDOM.innerText = '共消耗' + totalPrice + '积分';
			});
			addTen.innerText = '+10';
			let rmOne = document.createElement('div');
			rmOne.addEventListener('click', () => {
				if (eachPropsSelectCount[i] > 0) {
					eachPropsSelectCount[i]--;
					count.innerText = eachPropsSelectCount[i];
					totalPrice = totalPrice - propsList[i].price;
					totalDOM.innerText = '共消耗' + totalPrice + '积分';
				}
			});
			rmOne.innerText = '-1';
			let rmTen = document.createElement('div');
			rmTen.addEventListener('click', () => {
				if (eachPropsSelectCount[i] >= 10) {
					eachPropsSelectCount[i] = eachPropsSelectCount[i] - 10;
					count.innerText = eachPropsSelectCount[i];
					totalPrice = totalPrice - 10 * propsList[i].price;
				} else if (eachPropsSelectCount[i] > 0 && eachPropsSelectCount[i] < 10) {
					let currentCount = eachPropsSelectCount[i];
					eachPropsSelectCount[i] = 0;
					count.innerText = eachPropsSelectCount[i];
					totalPrice = totalPrice - currentCount * propsList[i].price;
				}
				totalDOM.innerText = '共消耗' + totalPrice + '积分';
			});
			rmTen.innerText = '-10';
			buttons.appendChild(addOne);
			buttons.appendChild(addTen);
			buttons.appendChild(rmOne);
			buttons.appendChild(rmTen);
			eachPropsItem.appendChild(img);
			eachPropsItem.appendChild(name);
			eachPropsItem.appendChild(count);
			eachPropsItem.appendChild(buttons);
			propsShopList.appendChild(eachPropsItem);
			eachPropsSelectCount.push(0);
		}
		//根据武器信息设定武器列表
		//因为默认武器无法购买，所以先把每个武器选择个数数组的第一个设为默认武器的
		eachWeaponSelectedCount.push(0);
		for (let i = 1; i < weaponList.length; i++) {
			let eachWeaponItem = document.createElement('li');
			let img = document.createElement('img');
			img.src = weaponList[i].texture;
			let name = document.createElement('div');
			name.innerText = weaponList[i].name + ' ' + weaponList[i].price;
			let count = document.createElement('div');
			count.style.color = 'purple';
			count.innerText = '0';
			let buttons = document.createElement('div');
			buttons.className = 'countButtonBox';
			let addOne = document.createElement('div');
			addOne.addEventListener('click', () => {
				eachWeaponSelectedCount[i]++;
				count.innerText = eachWeaponSelectedCount[i];
				totalPrice = totalPrice + weaponList[i].price;
				totalDOM.innerText = '共消耗' + totalPrice + '积分';
			});
			addOne.innerText = '+1';
			let addTen = document.createElement('div');
			addTen.addEventListener('click', () => {
				eachWeaponSelectedCount[i] = eachWeaponSelectedCount[i] + 10;
				count.innerText = eachWeaponSelectedCount[i];
				totalPrice = totalPrice + 10 * weaponList[i].price;
				totalDOM.innerText = '共消耗' + totalPrice + '积分';
			});
			addTen.innerText = '+10';
			let rmOne = document.createElement('div');
			rmOne.addEventListener('click', () => {
				if (eachWeaponSelectedCount[i] > 0) {
					eachWeaponSelectedCount[i]--;
					count.innerText = eachWeaponSelectedCount[i];
					totalPrice = totalPrice - weaponList[i].price;
					totalDOM.innerText = '共消耗' + totalPrice + '积分';
				}
			});
			rmOne.innerText = '-1';
			let rmTen = document.createElement('div');
			rmTen.addEventListener('click', () => {
				if (eachWeaponSelectedCount[i] >= 10) {
					eachWeaponSelectedCount[i] = eachWeaponSelectedCount[i] - 10;
					count.innerText = eachWeaponSelectedCount[i];
					totalPrice = totalPrice - 10 * weaponList[i].price;
				} else if (eachWeaponSelectedCount[i] > 0 && eachWeaponSelectedCount[i] < 10) {
					let currentCount = eachWeaponSelectedCount[i];
					eachWeaponSelectedCount[i] = 0;
					count.innerText = eachWeaponSelectedCount[i];
					totalPrice = totalPrice - currentCount * weaponList[i].price;
				}
				totalDOM.innerText = '共消耗' + totalPrice + '积分';
			});
			rmTen.innerText = '-10';
			buttons.appendChild(addOne);
			buttons.appendChild(addTen);
			buttons.appendChild(rmOne);
			buttons.appendChild(rmTen);
			eachWeaponItem.appendChild(img);
			eachWeaponItem.appendChild(name);
			eachWeaponItem.appendChild(count);
			eachWeaponItem.appendChild(buttons);
			weaponShopList.appendChild(eachWeaponItem);
			eachWeaponSelectedCount.push(0);
		}
		shopPage.style.display = 'flex';
	} else {
		//重新打开鼠标效果
		mouseMoveDropDotControl(true);
		mouseClickLineControl(true);
		totalPrice = 0;
		eachPropsSelectCount = [];
		eachWeaponSelectedCount = [];
		totalDOM.innerText = '共消耗0积分';
		propsShopList.innerHTML = '';
		weaponShopList.innerHTML = '';
		shopPage.style.display = 'none';
	}
}

/**
 * 账户信息修改控制
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面
 */
function operateUserInfoUpdatePage(isVisible) {
	if (isVisible) {
		userInfoPageDOM.style.display = 'flex';
		previewImg.src = onlineUserData.avatar;
		updateNickNameInput.value = onlineUserData.nickname;
		updateEmailInput.value = onlineUserData.email;
	} else {
		userInfoPageDOM.style.display = 'none';
	}
}

/**
 * 排行榜界面
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面 
 */
function operateRankPage(isVisible) {
	let loadingTip = document.querySelector('.leaderboard .requesting');
	let totalRankList = document.querySelector('.leaderboard .frame .total .rank');
	let personalRank = document.querySelector('.leaderboard .frame .me .content').children;
	if (isVisible) {
		rankPage.style.display = 'flex';
		loadingTip.style.display = 'flex';
		let rankArray;
		fetch('/miyakogame/api/player/rankten').then((response) => {
			return response.json();
		}).then((result) => {
			if (result.success) {
				rankArray = result.data;
				for (let i = 0; i < rankArray.length; i++) {
					let getUserRank = rankArray[i];
					let eachRankInfo = document.createElement('li');
					let eachUserInfo = document.createElement('div');
					eachUserInfo.className = 'nickname';
					let userAvatar = document.createElement('img');
					userAvatar.src = getUserRank.avatar;
					let userNameText = document.createElement('div');
					userNameText.className = 'text';
					userNameText.innerText = getUserRank.nickname;
					if (getUserRank.userName == onlineUserData.userName) {
						userNameText.style.color = 'blue';
					}
					eachUserInfo.appendChild(userAvatar);
					eachUserInfo.appendChild(userNameText);
					let scoreText = document.createElement('div');
					scoreText.className = 'score';
					scoreText.innerText = getUserRank.highScore;
					let rankText = document.createElement('div');
					rankText.className = 'rank';
					rankText.innerText = getUserRank.sequence;
					eachRankInfo.appendChild(eachUserInfo);
					eachRankInfo.appendChild(scoreText);
					eachRankInfo.appendChild(rankText);
					totalRankList.appendChild(eachRankInfo);
				}
				loadingTip.style.display = 'none';
			} else {
				loadingTip.style.display = 'none';
				showTipFrame('获取全服排名失败！请检查网络！', null, '.tip-false');
			}
		});
		if (isUserLogin) {
			fetch('/miyakogame/api/player/playerank?id=' + onlineUserData.id).then((response) => {
				return response.json();
			}).then((result) => {
				if (result.success) {
					personalRank[0].children[0].src = onlineUserData.avatar;
					personalRank[0].children[1].innerText = onlineUserData.nickname;
					personalRank[1].innerText = onlineUserData.highScore;
					personalRank[2].innerText = result.data.sequence;
					loadingTip.style.display = 'none';
				} else {
					loadingTip.style.display = 'none';
					showTipFrame('获取个人排名失败！请检查网络！', null, '.tip-false');
				}
			});
		}
	} else {
		totalRankList.innerHTML = '';
		rankPage.style.display = 'none';
	}
}

/**
 * 操纵注销账户提示页
 * @param {*} isVisible 值为true时显示界面，否则隐藏界面 
 */
function operateUserDelTip(isVisible) {
	if (isVisible) {
		delUserTip.style.display = 'flex';
	} else {
		delUserTip.style.display = 'none';
	}
}

/**
 * 敌人消失动画
 * @param {*} enemyObject 构造敌人对象
 */
function enemyFadeEffect(enemyObject) {
	enemyObject.isEaten = true;
	addScore(enemyObject.score);
	enemyObject.dom.style.transform = 'scale(0) rotate(90deg)';
	let showScore = document.createElement('div');
	showScore.innerText = '+' + enemyObject.score;
	showScore.style.position = 'absolute';
	showScore.style.fontSize = '24px';
	showScore.style.left = enemyObject.dom.offsetLeft - enemyObject.dom.offsetWidth / 2 + 'px';
	showScore.style.top = enemyObject.dom.offsetTop + 'px';
	showScore.style.opacity = 1;
	showScore.style.transitionProperty = 'top, opacity';
	showScore.style.transitionDuration = '0.5s';
	showScore.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0, 1.0)';
	document.querySelector('body').appendChild(showScore);
	showScore.style.top = (enemyObject.dom.offsetTop - 50) + 'px';
	showScore.style.opacity = 0;
	setTimeout(() => {
		enemyObject.dom.style.display = 'none';
		showScore.remove();
	}, 500);
}