//用户修改信息界面
let userInfoPageDOM = document.querySelector('.userInfoUpdate');
//图片上传表单项
let uploadInputImg = document.querySelector('.userInfoUpdate .frame .formBody .avatar .file input')
//昵称
let updateNickNameInput = document.querySelector('.userInfoUpdate .frame .formBody .nickname input');
//邮箱
let updateEmailInput = document.querySelector('.userInfoUpdate .frame .formBody .email input');
//密码
let updatePwdInput = document.querySelector('.userInfoUpdate .frame .formBody .pwd input');
//预览图
let previewImg = document.querySelector('.userInfoUpdate .frame .formBody .avatar .preview');
//按钮
let userInfoButtons = document.querySelector('.userInfoUpdate .buttons').children;
//请求提示
let updateRequestTip = document.querySelector('.userInfoUpdate .requesting');
//注销账户按钮
let delUserBtn = document.querySelector('.userInfoUpdate .frame .del');
//注销用户确认页
let delUserTip = document.querySelector('.userInfoUpdate .delUserTip');
//注销用户密码
let delUserPwd = document.querySelector('.userInfoUpdate .delUserTip input');
//用户注销确认页按钮
let delUserTipBtn = document.querySelector('.userInfoUpdate .delUserTip .buttons').children;

//显示预览图
uploadInputImg.onchange = () => {
	let reader = new FileReader();
	reader.onload = () => {
		previewImg.src = reader.result;
	}
	reader.readAsDataURL(uploadInputImg.files[0]);
}

//确认修改按钮
userInfoButtons[0].addEventListener('click', () => {
	updateRequestTip.style.display = 'flex';
	//待组装信息
	let data = {
		id: onlineUserData.id,
		nickname: updateNickNameInput.value,
		pwd: updatePwdInput.value,
		email: updateEmailInput.value
	};
	// 组装头像并获取地址
	if (uploadInputImg.files.length > 0) {
		if (uploadInputImg.files[0].size == 0) {
			showTipFrame('更新信息失败，原因：不能上传空文件！', null, '.tip-false');
			updateRequestTip.style.display = 'none';
			return false;
		}
		if (uploadInputImg.files[0].size > 2097152) {
			showTipFrame('更新信息失败，原因：头像文件大小必须小于2MB！', null, '.tip-false');
			updateRequestTip.style.display = 'none';
			return false;
		}
		let fileType = uploadInputImg.files[0].name.substring(uploadInputImg.files[0].name.lastIndexOf('.') + 1);
		fileType = fileType.toLowerCase();
		if (fileType != 'jpg' && fileType != 'jpeg' && fileType != 'png' && fileType != 'gif') {
			showTipFrame('更新信息失败，原因：头像文件必须是jpg,jpeg,png或者gif格式！', null, '.tip-false');
			updateRequestTip.style.display = 'none';
			return false;
		}
		let imgData = new FormData();
		imgData.append('img', uploadInputImg.files[0]);
		fetch('/miyakogame/api/avatar/upload', {
			method: 'POST',
			body: imgData
		}).then((response) => {
			return response.json();
		}).then((result) => {
			if (result.success) {
				data.avatar = result.data;
				let dataStr = JSON.stringify(data);
				fetch('/miyakogame/api/update', {
					method: 'POST',
					body: dataStr,
					headers: {
						'content-type': 'application/json'
					}
				}).then((response) => {
					return response.json();
				}).then((result) => {
					if (result.success) {
						showTipFrame('更新信息成功！3s后刷新页面...', null, '.tip-true');
						setTimeout(() => {
							window.location.pathname = '/miyakogame';
						}, 3000);
					} else {
						showTipFrame('更新信息失败，原因：' + result.message, null, '.tip-false');
					}
					updateRequestTip.style.display = 'none';
				});
			} else {
				showTipFrame('更新信息失败，原因：' + result.message, null, '.tip-false');
				updateRequestTip.style.display = 'none';
			}
		});
	} else { //不修改头像时，仅组装用户信息
		let dataStr = JSON.stringify(data);
		fetch('/miyakogame/api/update', {
			method: 'POST',
			body: dataStr,
			headers: {
				'content-type': 'application/json'
			}
		}).then((response) => {
			return response.json();
		}).then((result) => {
			if (result.success) {
				showTipFrame('更新信息成功！3s后刷新页面...', null, '.tip-true');
				setTimeout(() => {
					window.location.pathname = '/miyakogame';
				}, 3000);
			} else {
				showTipFrame('更新信息失败，原因：' + result.message, null, '.tip-false');
			}
			updateRequestTip.style.display = 'none';
		});
	}
});

//关闭按钮
userInfoButtons[1].addEventListener('click', () => {
	operateUserInfoUpdatePage(false);
});

//用户注销按钮
delUserBtn.addEventListener('click', () => {
	operateUserDelTip(true);
});

//用户注销确认页面按钮
delUserTipBtn[0].addEventListener('click', () => {
	updateRequestTip.style.display = 'flex';
	//待组装信息
	let data = {
		id: onlineUserData.id,
		pwd: delUserPwd.value
	};
	fetch('/miyakogame/api/delete', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'content-type': 'application/json'
		}
	}).then((response) => {
		return response.json();
	}).then((result) => {
		if (result.success) {
			showTipFrame('注销账户成功！3s后刷新页面...', null, '.tip-true');
			setTimeout(() => {
				window.location.pathname = '/miyakogame';
			}, 3000);
		} else {
			showTipFrame('注销账户失败，原因：' + result.message, null, '.tip-false');
		}
		updateRequestTip.style.display = 'none';
	});
});
delUserTipBtn[1].addEventListener('click', () => {
	operateUserDelTip(false);
});