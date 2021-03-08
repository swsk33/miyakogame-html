package link.swsk33web.miyakogame.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import link.swsk33web.miyakogame.dao.PlayerDAO;
import link.swsk33web.miyakogame.dataobject.PlayerDO;
import link.swsk33web.miyakogame.dataobject.RankInfoDO;
import link.swsk33web.miyakogame.model.Player;
import link.swsk33web.miyakogame.model.RankInfo;
import link.swsk33web.miyakogame.model.Result;
import link.swsk33web.miyakogame.service.PlayerService;
import link.swsk33web.miyakogame.util.PwdUtils;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Component
public class PlayerServiceImpl implements PlayerService {

	@Autowired
	private PlayerDAO playerDAO;

	@Autowired
	private RedisTemplate redisTemplate;

	@Override
	public Result<Player> register(PlayerDO playerDO) {
		Result<Player> result = new Result<Player>();
		if (playerDO == null) {
			result.setResultFailed("数据体不能为空！");
			return result;
		}
		if (StringUtils.isEmpty(playerDO.getUserName())) {
			result.setResultFailed("用户名不能为空！");
			return result;
		}
		if (StringUtils.isEmpty(playerDO.getPwd())) {
			result.setResultFailed("密码不能为空！");
			return result;
		}
		// 先从Redis找这个用户
		Player getPlayer = (Player) redisTemplate.opsForValue().get(playerDO.getUserName());
		if (getPlayer == null) {
			// Redis找不着，再去MySQL中找
			try {
				getPlayer = playerDAO.findByUserName(playerDO.getUserName()).toModel();
			} catch (Exception e) {
				// none
			}
			if (getPlayer != null) {
				result.setResultFailed("该用户名已存在！");
				redisTemplate.opsForValue().set(playerDO.getUserName(), getPlayer);
				return result;
			}
		} else {
			result.setResultFailed("该用户名已存在！");
			return result;
		}
		if (StringUtils.isEmpty(playerDO.getAvatar())) {
			playerDO.setAvatar("/avatars/default-" + (new Random().nextInt(3) + 1) + ".jpg");
		}
		if (StringUtils.isEmpty(playerDO.getNickname())) {
			playerDO.setNickname(playerDO.getUserName());
		}
		playerDO.setPwd(PwdUtils.encodePwd(playerDO.getPwd()));
		playerDO.setHighScore(0);
		playerDO.setGameData(null);
		playerDO.setGmtCreated(LocalDateTime.now());
		playerDO.setGmtModified(LocalDateTime.now());
		redisTemplate.opsForValue().set(playerDO.getUserName(), playerDO.toModel());
		playerDAO.add(playerDO);
		// 加入Redis排名表
		redisTemplate.opsForZSet().add("totalRank", playerDO.toModel(), playerDO.getHighScore());
		result.setResultSuccess("注册用户成功！", playerDO.toModel());
		return result;
	}

	@Override
	public Result<Player> login(PlayerDO playerDO) {
		Result<Player> result = new Result<Player>();
		if (playerDO == null) {
			result.setResultFailed("数据体不能为空！");
			return result;
		}
		if (StringUtils.isEmpty(playerDO.getUserName())) {
			result.setResultFailed("用户名不能为空！");
			return result;
		}
		if (StringUtils.isEmpty(playerDO.getPwd())) {
			result.setResultFailed("密码不能为空！");
			return result;
		}
		// 先去Redis查询，没有再去数据库
		Player getPlayer = (Player) redisTemplate.opsForValue().get(playerDO.getUserName());
		if (getPlayer == null) {
			try {
				getPlayer = playerDAO.findByUserName(playerDO.getUserName()).toModel();
			} catch (Exception e) {
				// none
			}
			if (getPlayer == null) {
				result.setResultFailed("用户不存在！");
				// 即使是无效的用户名也给存入Redis，防止缓存穿透
				Player invalidPlayer = new Player();
				invalidPlayer.setUserName(playerDO.getUserName());
				invalidPlayer.setPwd(null);
				redisTemplate.opsForValue().set(playerDO.getUserName(), invalidPlayer, 1200, TimeUnit.SECONDS);
				return result;
			} else {
				redisTemplate.opsForValue().set(playerDO.getUserName(), getPlayer);
			}
		} else if (StringUtils.isEmpty(getPlayer.getPwd())) { // 若Redis中找出的是没有密码的账户，就说明是无效账户
			result.setResultFailed("请勿重复登录无效账户！");
			return result;
		}
		if (!playerDO.getPwd().equals(getPlayer.getPwd())) {
			result.setResultFailed("用户名或者密码错误！");
			return result;
		}
		result.setResultSuccess("登录成功", getPlayer);
		return result;
	}

	@Override
	public Result<Player> update(PlayerDO playerDO) {
		Result<Player> result = new Result<Player>();
		if (playerDO == null) {
			result.setResultFailed("数据体不能为空！");
			return result;
		}
		Player getPlayer = (Player) redisTemplate.opsForValue().get(playerDO.getUserName());
		if (getPlayer == null) {
			try {
				getPlayer = playerDAO.findByUserName(playerDO.getUserName()).toModel();
			} catch (Exception e) {
				// none
			}
			if (getPlayer == null) {
				result.setResultFailed("找不到玩家！");
				return result;
			}
		}
		if (StringUtils.isEmpty(playerDO.getNickname())) {
			playerDO.setNickname(getPlayer.getNickname());
		}
		if (StringUtils.isEmpty(playerDO.getAvatar())) {
			playerDO.setAvatar(playerDO.getAvatar());
		}
		if (StringUtils.isEmpty("" + playerDO.getHighScore())) {
			playerDO.setHighScore(getPlayer.getHighScore());
		}
		if (StringUtils.isEmpty(playerDO.getPwd())) {
			playerDO.setPwd(getPlayer.getPwd());
		}
		if (StringUtils.isEmpty(playerDO.getGameData())) {
			playerDO.setGameData(getPlayer.getGameData());
		}
		playerDO.setGmtCreated(getPlayer.getGmtCreated());
		playerDO.setGmtModified(LocalDateTime.now());
		redisTemplate.opsForValue().set(playerDO.getUserName(), getPlayer);
		playerDAO.update(playerDO);
		// 重新写入Redis排名表信息
		redisTemplate.opsForZSet().remove("totalRank", getPlayer);
		redisTemplate.opsForZSet().add("totalRank", playerDO.toModel(), playerDO.getHighScore());
		result.setResultSuccess("修改信息成功！", playerDO.toModel());
		return result;
	}

	@Override
	public Result<List<RankInfo>> getTotalRank() {
		Result<List<RankInfo>> result = new Result<List<RankInfo>>();
		List<RankInfo> ranks = new ArrayList<RankInfo>();
		// 先去Redis中查询排名信息
		List<Player> getRank = (List<Player>) redisTemplate.opsForZSet().reverseRangeWithScores("totalRank", 0, 9);
		if (getRank == null) {
			List<RankInfoDO> getRankDO = null;
			try {
				getRankDO = playerDAO.findByHighScoreInTen();
			} catch (Exception e) {
				// none
			}
			if (getRankDO != null) {
				for (RankInfoDO rank : getRankDO) {
					ranks.add(rank.toModel());
					
				}
			} else {
				result.setResultFailed("查询失败！");
				return result;
			}
		} else {
			
		}

		return result;
	}

	@Override
	public Result<RankInfo> getPlayerRank(String userName) {
		// TODO Auto-generated method stub
		return null;
	}

}
