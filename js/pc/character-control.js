//宫子的控制
let miyako = document.querySelector('.game .gameBg .miyako');
let y = 0;
miyako.style.top = y + 'px';

//按下↑或者w键且在界内时，宫子向上移动
function up(i) {
	if (y > i) {
		y = y - i;
		miyako.style.top = y + 'px';
	} else {
		miyako.style.top = '0px';
	}
}

//按下↓或者s键且在界内时，宫子向下移动
function down(i) {
	if ((y + miyako.offsetHeight) < bgHeight - i) {
		y = y + i;
		miyako.style.top = y + 'px';
	} else {
		miyako.style.top = (bgHeight - miyako.offsetHeight) + 'px' ;
	}
}
