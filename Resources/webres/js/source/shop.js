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

/**
 * 购买物品
 * @param {*} price 所需消耗总积分
 * @param {*} valueNames 需要改变的变量名
 * @param {*} additions 对应变量需要增加的值
 */
function buyItems(price, valueNames, additions) {
	if (price > currentScore) {
		//积分不足
	} else {
		for (let i = 0; i < valueNames.length; i++) {
			new Function(valueNames[i] + ' = ' + valueNames[i] + ' + ' + additions[i])();
		}
	}
}