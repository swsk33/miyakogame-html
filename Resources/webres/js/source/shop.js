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
 * 购买商品
 */
function buyItems() {
	if (totalPrice > currentScore) {
		//积分不足
	} else {
		currentScore = currentScore - totalPrice;
		for (let i = 0; i < eachPropsSelectCount.length; i++) {
			propsCount[i] = propsCount[i] + eachPropsSelectCount[i];
		}
		for (let i = 0; i < eachWeaponSelectedCount.length; i++) {
			weaponCount[i] = weaponCount[i] + eachWeaponSelectedCount[i];
		}
		saveData();
	}
}