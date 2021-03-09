//玩家登陆
let loginUserNameInput = document.querySelector('.formbody .userName input');
let loginPwdInput = document.querySelector('.formbody .pwd input');

document.querySelector('.formbody .ok').addEventListener('click', () => {
	let data = {
		userName: loginUserNameInput.value,
		pwd: loginPwdInput.value
	}
	let dataString = JSON.stringify(data);
	fetch('/miyakogame/api/login', {
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
	});
});