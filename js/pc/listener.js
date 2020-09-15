//监听事件
//宫子移动
window.addEventListener('keydown', function(e) {
	//宫子向上移动
	if ((e.keyCode == 38 || e.keyCode == 87) && !isPaused) {
		up(5);
	}

	//宫子向下移动
	if ((e.keyCode == 40 || e.keyCode == 83) && !isPaused) {
		down(5);
	}
})
