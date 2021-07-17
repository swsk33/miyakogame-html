package link.swsk33web.miyakogame.service;

import java.util.List;

import org.springframework.stereotype.Service;
import link.swsk33web.miyakogame.dataobject.Player;
import link.swsk33web.miyakogame.model.RankInfo;
import link.swsk33web.miyakogame.model.Result;

@Service
public interface PlayerService {

	/**
	 * 用户注册
	 */
	Result<Player> register(Player player);

	/**
	 * 用户登录
	 */
	Result<Player> login(Player player);

	/**
	 * 用户销号
	 */
	Result<Player> delete(int id);

	/**
	 * 用户信息更新
	 */
	Result<Player> update(Player player);

	/**
	 * 获取一个邮箱下的所有账户
	 */
	Result<List<Player>> findByEmail(String email);

	/**
	 * 发送邮箱验证码
	 */
	Result<Player> sendCode(String username, String email);

	/**
	 * 重置用户密码
	 */
	Result<Player> resetPwd(int code, Player player);

	/**
	 * 查询全服前十
	 */
	Result<List<RankInfo>> getTotalRank();

	/**
	 * 查询某用户排名信息
	 */
	Result<RankInfo> getPlayerRank(int id);

}