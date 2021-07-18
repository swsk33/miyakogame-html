//玩家登陆
let loginUserNameInput = document.querySelector('.formbody .userName input');
let loginPwdInput = document.querySelector('.formbody .pwd input');
//登录请求动画
let loginRequestTip = document.querySelector('.requesting');
//忘记密码按钮
let forgetBtn = document.querySelector('.formbody .forget');
//忘记密码-邮箱查询窗口
let queryUser = document.querySelector('.forget-queryEmail');
//忘记密码-邮箱查询窗口-加载动画
let queryUserLoadingTip = queryUser.querySelector('.requesting');
//忘记密码-邮箱查询窗口-输入栏
let queryEmailInput = document.querySelector('.forget-queryEmail .frame .query input');
//忘记密码-邮箱查询窗口-查询按钮
let queryEmailBtn = document.querySelector('.forget-queryEmail .frame .query .queryRequest');
//忘记密码-邮箱查询窗口-邮箱列表
let queryEmailList = document.querySelector('.forget-queryEmail .frame .box ul');
//忘记密码-邮箱查询窗口-关闭按钮
let queryUserCloseBtn = document.querySelector('.forget-queryEmail .frame .close');
//忘记密码-密码重置窗口
let resetPwdFrame = document.querySelector('.forget-verifyAndReset');
//忘记密码-密码重置窗口-请求动画
let resetLoadingTip = resetPwdFrame.querySelector('.requesting');
//忘记密码-密码重置窗口-主窗体
let resetPwdMainFrame = resetPwdFrame.querySelector('.frame');
//找回账号信息
let resetPlayerInfo = resetPwdMainFrame.querySelector('.userInfo');
//验证码输入窗
let verifyCode = resetPwdMainFrame.querySelector('.code input');
//发送验证码按钮
let sendCodeBtn = resetPwdMainFrame.querySelector('.code .send');
//新密码
let newPwd = resetPwdMainFrame.querySelector('.pwd input');
//确认按钮
let resetOk = resetPwdMainFrame.querySelector('.buttons .ok');
//取消按钮
let resetCancel = resetPwdMainFrame.querySelector('.buttons .cancel');
//被找回玩家数据
let resetPlayerData;

/**
 * 发送验证码
 */
function sendVerifyCode() {
	resetLoadingTip.style.display = 'flex';
	fetch('/miyakogame/api/mail/sendcode?id=' + resetPlayerData.id + '&email=' + resetPlayerData.email + '&type=PASSWORD_RESET').then((response) => {
		return response.json();
	}).then((result) => {
		if (result.success) {
			sendCodeBtn.removeEventListener('click', sendVerifyCode);
			let timeRemain = 60;
			sendCodeBtn.style.color = 'gray';
			sendCodeBtn.innerText = timeRemain + 's重新发送';
			let sendCodeInterval = setInterval(() => {
				timeRemain--;
				sendCodeBtn.innerText = timeRemain + 's重新发送';
				if (timeRemain <= 0) {
					sendCodeBtn.style.color = 'black';
					sendCodeBtn.innerText = '发送验证码';
					sendCodeBtn.addEventListener('click', sendVerifyCode);
					clearInterval(sendCodeInterval);
				}
			}, 1000);
		} else {
			showTipFrame('发送验证码失败！原因：' + result.message, null, '.tip-false');
		}
		resetLoadingTip.style.display = 'none';
	});
}

//登录按钮
document.querySelector('.formbody .ok').addEventListener('click', () => {
	let data = {
		userName: loginUserNameInput.value,
		pwd: loginPwdInput.value
	}
	let dataString = JSON.stringify(data);
	loginRequestTip.style.display = 'flex';
	fetch('/miyakogame/api/player/login', {
		method: 'POST',
		body: dataString,
		headers: {
			'content-type': 'application/json'
		}
	}).then((response) => {
		return response.json();
	}).then((result) => {
		if (result.success) {
			showTipFrame('登录成功！3s后跳转至游戏界面。', null, '.tip-true');
			setTimeout(() => {
				window.location.pathname = '/miyakogame';
			}, 3000);
		} else {
			showTipFrame('登录失败！原因：' + result.message, null, '.tip-false');
		}
		loginRequestTip.style.display = 'none';
	});
});

//忘记密码按钮
forgetBtn.addEventListener('click', () => {
	queryUser.style.display = 'flex';
});

//根据邮箱查询玩家按钮
queryEmailBtn.addEventListener('click', () => {
	queryEmailList.innerHTML = '';
	queryUserLoadingTip.style.display = 'flex';
	fetch('/miyakogame/api/player/findbyemail?email=' + queryEmailInput.value).then((response) => {
		return response.json();
	}).then((result) => {
		if (result.success) {
			for (let eachPlayer of result.data) {
				let liDOM = document.createElement('li');
				let imgBox = document.createElement('div');
				imgBox.className = 'imgBox';
				let imgDOM = document.createElement('img');
				imgDOM.src = eachPlayer.avatar;
				imgBox.appendChild(imgDOM);
				let usernameDOM = document.createElement('div');
				usernameDOM.className = 'username';
				usernameDOM.innerText = eachPlayer.userName;
				let nicknameDOM = document.createElement('div');
				nicknameDOM.className = 'nickname';
				nicknameDOM.innerText = eachPlayer.nickname;
				let btnDOM = document.createElement('div');
				btnDOM.className = 'div-btn';
				btnDOM.innerText = '找回';
				btnDOM.addEventListener('click', () => {
					resetPlayerData = eachPlayer;
					resetPwdFrame.style.display = 'flex';
					resetPlayerInfo.innerText = '找回账号：' + resetPlayerData.userName;
				});
				liDOM.appendChild(imgBox);
				liDOM.appendChild(usernameDOM);
				liDOM.appendChild(nicknameDOM);
				liDOM.appendChild(btnDOM);
				queryEmailList.appendChild(liDOM);
			}
		} else {
			showTipFrame('查询失败！原因：' + result.message, null, '.tip-false');
		}
		queryUserLoadingTip.style.display = 'none';
	});
});

//关闭查询页面按钮
queryUserCloseBtn.addEventListener('click', () => {
	queryUser.style.display = 'none';
	queryEmailList.innerHTML = '';
});

//关闭重置密码按钮
resetCancel.addEventListener('click', () => {
	resetPwdFrame.style.display = 'none';
	resetPlayerData = null;
});

//发送验证码按钮
sendCodeBtn.addEventListener('click', sendVerifyCode);

//确认重置密码按钮
resetOk.addEventListener('click', () => {
	resetLoadingTip.style.display = 'flex';
	resetPlayerData.pwd = newPwd.value;
	if (verifyCode.value === '') {
		showTipFrame('重置密码失败！原因：验证码不能为空！', null, '.tip-false');
		resetLoadingTip.style.display = 'none';
		return;
	}
	fetch('/miyakogame/api/player/resetpwd?code=' + verifyCode.value, {
		method: 'POST',
		body: JSON.stringify(resetPlayerData),
		headers: {
			'content-type': 'application/json'
		}
	}).then((response) => {
		return response.json();
	}).then((result) => {
		if (result.success) {
			showTipFrame('重置密码成功！3s后跳转至游戏界面。', null, '.tip-true');
			setTimeout(() => {
				window.location.pathname = '/miyakogame';
			}, 3000);
		} else {
			showTipFrame('重置密码失败！原因：' + result.message, null, '.tip-false');
		}
		resetLoadingTip.style.display = 'none';
	});
});

//开启鼠标效果
mouseMoveDropDotControl(true);
mouseClickLineControl(true);