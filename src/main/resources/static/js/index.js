//随机网页标签图标
let iconElement = document.createElement('link');
iconElement.setAttribute('rel', 'icon');
iconElement.setAttribute('href', './img/icons/' + genRandom(1, 4) + '.ico');
iconElement.setAttribute('type', 'x-icon');
document.head.appendChild(iconElement);
//初始化主界面
operateStartPage(true);