//宫子的行为模块
let miyako = document.querySelector('.game .gameBg .miyako');
let y = 0;
miyako.style.top = y + 'px';

//宫子向上移动
function up(i) {
	if (y > i) {
		y = y - i;
		miyako.style.top = y + 'px';
	} else {
		miyako.style.top = '0px';
	}
}

//宫子向下移动
function down(i) {
	if ((y + miyako.offsetHeight) < bg.offsetHeight - i) {
		y = y + i;
		miyako.style.top = y + 'px';
	} else {
		miyako.style.top = (bg.offsetHeight - miyako.offsetHeight) + 'px' ;
	}
}
