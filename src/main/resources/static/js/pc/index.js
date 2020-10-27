//初始化函数
function initialize() {
	if (readData()) {
		document.querySelector('.start ul').children[0].style.color = 'gray';
		document.querySelector('.start ul').children[0].removeEventListener('click', continueGame);
	}
}
initialize();