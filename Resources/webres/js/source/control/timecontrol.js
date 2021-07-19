//时间或者节日控制
let nowTime = new Date();
/**
 * 修改指定页面的样式
 * @param {*} page 页面dom
 * @param {*} normalClassName 页面普通样式的类名（例如一个页面类名为start，那么css中需要定义傍晚样式就要预先写一个start-evening的样式定义为傍晚样式）
 */
function alterPageStyle(page, normalClassName) {
	if (nowTime.getHours() >= 18 && nowTime.getHours() < 20) { //傍晚
		page.classList.add(normalClassName + '-evening');
	} else if ((nowTime.getHours() >= 20 && nowTime.getHours() <= 23) || (nowTime.getHours() >= 0 && nowTime.getHours() <= 6)) { //夜晚
		page.classList.add(normalClassName + '-night');
		let pageWidth = window.innerWidth;
		let pageHeight = window.innerHeight;
		//生成小星星
		for (let i = 0; i < 150; i++) {
			let starDiv = document.createElement('div');
			starDiv.className = 'star';
			starDiv.style.position = 'absolute';
			starDiv.style.borderRadius = '50%';
			starDiv.style.backgroundColor = 'white';
			starDiv.style.boxShadow = '0 0 9px 0.5px white';
			starDiv.style.left = genRandom(pageWidth * 0.05, pageWidth * 0.95) + 'px';
			starDiv.style.top = genRandom(pageHeight * 0.05, pageHeight * 0.95) + 'px';
			let sideLength = Math.random();
			if (sideLength < 0.5) {
				sideLength = genRandom(1, 2);
			}
			starDiv.style.width = sideLength + 'px';
			starDiv.style.height = sideLength + 'px';
			page.appendChild(starDiv);
		}
	}
}
//根据时间修改加载页和主页
alterPageStyle(loadingPage, 'loading');
alterPageStyle(startPage, 'start');