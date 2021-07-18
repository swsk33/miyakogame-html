//玩家登陆
let loginUserNameInput = document.querySelector('.formbody .userName input');
let loginPwdInput = document.querySelector('.formbody .pwd input');
//请求动画
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

queryUserCloseBtn.addEventListener('click', () => {
	queryUser.style.display = 'none';
	queryEmailList.innerHTML = '';
});

//开启鼠标效果
mouseMoveDropDotControl(true);
mouseClickLineControl(true);