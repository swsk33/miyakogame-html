//对商店数据的控制
//道具列表dom
let propsShopList = document.querySelector('.shop .frame .item ul');
//武器列表dom
let weaponShopList = document.querySelector('.shop .frame .weapon ul');
//所选商品所需总价
let totalPrice = 0;
//每个道具选择个数
let eachPropsSelectCount = [];
//每个武器选择个数
let eachWeaponSelectedCount = [];
//获取商店总价格指示文字
let totalDOM = shopPage.children[0].children[1];
//获取商店当前所有分数指示文字
let currentDOM = shopPage.children[0].children[2];

/**
 * 购买商品
 */
function buyItems() {
	if (totalPrice == 0) {
		showTipFrame('请选择要购买的道具或者武器！', null, '.tip-false');
	} else if (totalPrice > currentScore) {
		showTipFrame('积分不足！', null, '.tip-false');
	} else {
		currentScore = currentScore - totalPrice;
		for (let i = 0; i < eachPropsSelectCount.length; i++) {
			propsCount[i] = propsCount[i] + eachPropsSelectCount[i];
		}
		for (let i = 0; i < eachWeaponSelectedCount.length; i++) {
			weaponCount[i] = weaponCount[i] + eachWeaponSelectedCount[i];
		}
		saveData();
		currentDOM.innerText = '当前有' + currentScore + '分';
		showTipFrame('购买物品成功！', null, '.tip-true');
	}
}