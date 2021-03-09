//提示框
/**
 * 弹出提示框
 * @param {*} text 提示文字
 * @param {*} img 图标
 * @param {*} soundClassName 提示音（audio标签声音）
 */
function showTipFrame(text, img, soundClassName) {
	let tipDialog = document.createElement('div');
	let bgTrans = 0;
	let contentTrans = 0;
	let dialogHeight = 60;
	let tipAtY = -dialogHeight;
	tipDialog.style.position = 'absolute';
	tipDialog.style.width = '500px';
	tipDialog.style.height = dialogHeight + 'px';
	tipDialog.style.display = 'flex';
	tipDialog.style.backgroundColor = 'rgba(255, 255, 255, ' + bgTrans + ')';
	tipDialog.style.borderColor = 'black';
	tipDialog.style.borderStyle = 'dashed';
	tipDialog.style.borderWidth = '2.5px';
	tipDialog.style.borderRadius = '10px';
	tipDialog.style.justifyContent = 'center';
	tipDialog.style.alignItems = 'center';
	tipDialog.style.left = ((window.innerWidth - 500) / 2) + 'px';
	tipDialog.style.top = tipAtY + 'px';
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
	let keyFrame = 240;
	let tipControl = setInterval(() => {
		if (keyFrame <= 45) {
			tipAtY = tipAtY - dialogHeight / 45;
			bgTrans = bgTrans - 0.8 / 45;
			contentTrans = contentTrans - 1 / 45;
		} else if (keyFrame >= 195) {
			tipAtY = tipAtY + dialogHeight / 45;
			bgTrans = bgTrans + 0.8 / 45;
			contentTrans = contentTrans + 1 / 45;
		}
		tipDialog.style.top = tipAtY + 'px';
		tipDialog.style.backgroundColor = 'rgba(255, 255, 255, ' + bgTrans + ')';
		tipDialog.style.color = 'rgba(0, 0, 0, ' + contentTrans + ')';
		keyFrame--;
		if (keyFrame <= 0) {
			tipDialog.remove();
			clearInterval(tipControl);
		}
	}, 16);
}