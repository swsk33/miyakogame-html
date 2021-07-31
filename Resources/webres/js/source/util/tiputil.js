//提示框
/**
 * 弹出提示框
 * @param {*} text 提示文字
 * @param {*} img 图标
 * @param {*} soundClassName 提示音（audio标签声音）
 */
function showTipFrame(text, img, soundClassName) {
	let tipDialog = document.createElement('div');
	tipDialog.style.position = 'absolute';
	tipDialog.style.width = '500px';
	tipDialog.style.height = '60px';
	tipDialog.style.display = 'flex';
	tipDialog.style.backgroundColor = 'white';
	tipDialog.style.opacity = 0;
	tipDialog.style.borderColor = 'black';
	tipDialog.style.borderStyle = 'dashed';
	tipDialog.style.borderWidth = '2.5px';
	tipDialog.style.borderRadius = '10px';
	tipDialog.style.justifyContent = 'center';
	tipDialog.style.alignItems = 'center';
	tipDialog.style.left = ((window.innerWidth - 500) / 2) + 'px';
	tipDialog.style.top = '-60px';
	tipDialog.style.transitionProperty = 'top, opacity';
	tipDialog.style.transitionDuration = '1s';
	tipDialog.style.transitionDelay = '0s, 0.3s';
	tipDialog.style.transitionTimingFunction = 'ease-out';
	let textDOM = document.createElement('div');
	let imgDOM = document.createElement('img');
	textDOM.innerText = text;
	textDOM.display = 'flex';
	if (img != null) {
		imgDOM.src = img;
		imgDOM.style.height = '24px';
		imgDOM.style.marginRight = '15px';
		tipDialog.appendChild(imgDOM);
	}
	tipDialog.appendChild(textDOM);
	document.querySelector('body').appendChild(tipDialog);
	if (soundClassName != null) {
		document.querySelector(soundClassName).play();
	}
	setTimeout(() => {
		tipDialog.style.opacity = 0.95;
		tipDialog.style.top = '1px';
	}, 1);
	setTimeout(() => {
		tipDialog.style.opacity = 0;
		tipDialog.style.top = '-60px';
	}, 2501);
	setTimeout(() => {
		tipDialog.remove();
	}, 3510);
}