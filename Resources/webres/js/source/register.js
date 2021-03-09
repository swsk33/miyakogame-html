//注册页面
let userNameInput = document.querySelector('form .userName .content input');
let nickNameInput = document.querySelector('form .nickname .content input');
let pwdInput = document.querySelector('form .pwd .content input');
//请求动画
let regRequestTip = document.querySelector('.requesting');

document.querySelector('.formbody .ok').addEventListener('click', () => {
	let data = {
		userName: userNameInput.value,
		nickname: nickNameInput.value,
		pwd: pwdInput.value
	}
	let dataString = JSON.stringify(data);
	regRequestTip.style.display = 'flex';
	fetch('/miyakogame/api/reg', {
		method: 'POST',
		body: dataString,
		headers: {
			'content-type': 'application/json'
		}
	}).then((response) => {
		return response.json();
	}).then((result) => {
		if (result.success) {
			showTipFrame('注册成功！3s后跳转至游戏界面。', null, '.tip-true');
			setTimeout(() => {
				window.location.pathname = '/miyakogame';
			}, 3000);
		} else {
			showTipFrame('注册失败！原因：' + result.message, null, '.tip-false');
		}
		regRequestTip.style.display = 'none';
	});
});