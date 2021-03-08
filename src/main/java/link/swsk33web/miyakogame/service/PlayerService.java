package link.swsk33web.miyakogame.service;

import java.util.List;
import org.springframework.stereotype.Service;
import link.swsk33web.miyakogame.dataobject.PlayerDO;
import link.swsk33web.miyakogame.model.Player;
import link.swsk33web.miyakogame.model.RankInfo;
import link.swsk33web.miyakogame.model.Result;

@Service
public interface PlayerService {

	/**
	 * 用户注册
	 */
	public Result<Player> register(PlayerDO playerDO);

	/**
	 * 用户登录
	 */
	public Result<Player> login(PlayerDO playerDO);

	/**
	 * 用户信息更新
	 */
	public Result<Player> update(PlayerDO playerDO);

	/**
	 * 查询全服前十
	 */
	public Result<List<RankInfo>> getTotalRank();

	/**
	 * 查询某用户排名信息
	 */
	public Result<RankInfo> getPlayerRank(String userName);

}