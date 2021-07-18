//玩家登陆
let loginUserNameInput = document.querySelector('.formbody .userName input');
let loginPwdInput = document.querySelector('.formbody .pwd input');
//请求动画
let loginRequestTip = document.querySelector('.requesting');
//忘记密码按钮
let forgetBtn = document.querySelector('.formbody .forget');
//忘记密码-邮箱查询窗口
let queryUser = document.querySelector('forget-queryEmail');

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

forgetBtn.addEventListener('click', () => {
	queryUser.style.display = 'flex';
});

//开启鼠标效果
mouseMoveDropDotControl(true);
mouseClickLineControl(true);