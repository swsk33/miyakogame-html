//用户修改信息界面
let userInfoPageDOM = document.querySelector('.userInfoUpdate');
//上传按钮
let uploadInputImg = document.querySelector('.userInfoUpdate .frame .formBody .avatar .file input')
//预览图
let previewImg = document.querySelector('.userInfoUpdate .frame .formBody .avatar .preview');
//按钮
let userInfoButtons = document.querySelector('.userInfoUpdate .buttons').children;
//请求提示
let updateRequestTip = document.querySelector('.userInfoUpdate .requesting');

//显示预览图
uploadInputImg.onchange = () => {
	let reader = new FileReader();
	reader.onload = () => {
		previewImg.src = reader.result;
	}
	reader.readAsDataURL(uploadInputImg.files[0]);
}

//userInfoButtons[0].addEventListener();