package link.swsk33web.miyakogame.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;
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
		if (playerDO.getPwd().length() < 8) {
			result.setResultFailed("密码长度不能小于8！");
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
		playerDO.setGameData("null");
		playerDO.setGmtCreated(LocalDateTime.now());
		playerDO.setGmtModified(LocalDateTime.now());
		redisTemplate.opsForValue().set(playerDO.getUserName(), playerDO.toModel());
		playerDAO.add(playerDO);
		// 加入Redis排名表
		redisTemplate.opsForZSet().add("totalRank", playerDO.getUserName(), playerDO.getHighScore());
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
		if (!PwdUtils.encodePwd(playerDO.getPwd()).equals(getPlayer.getPwd())) {
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
			playerDO.setAvatar(getPlayer.getAvatar());
		}
		if (StringUtils.isEmpty("" + playerDO.getHighScore())) {
			playerDO.setHighScore(getPlayer.getHighScore());
		} else {
			// 重新写入Redis排名表信息
			redisTemplate.opsForZSet().remove("totalRank", playerDO.getUserName());
			redisTemplate.opsForZSet().add("totalRank", playerDO.getUserName(), playerDO.getHighScore());
		}
		if (StringUtils.isEmpty(playerDO.getPwd())) {
			playerDO.setPwd(getPlayer.getPwd());
		} else if (playerDO.getPwd().length() < 8) {
			result.setResultFailed("修改密码长度不能小于8！");
			return result;
		} else {
			playerDO.setPwd(PwdUtils.encodePwd(playerDO.getPwd()));
		}
		if (StringUtils.isEmpty(playerDO.getGameData())) {
			playerDO.setGameData(getPlayer.getGameData());
		}
		playerDO.setGmtCreated(getPlayer.getGmtCreated());
		playerDO.setGmtModified(LocalDateTime.now());
		redisTemplate.opsForValue().set(playerDO.getUserName(), playerDO.toModel());
		playerDAO.update(playerDO);
		result.setResultSuccess("修改信息成功！", playerDO.toModel());
		return result;
	}

	@Override
	public Result<List<RankInfo>> getTotalRank() {
		Result<List<RankInfo>> result = new Result<List<RankInfo>>();
		List<RankInfo> rankResult = new ArrayList<RankInfo>();
		Set<String> userNames = redisTemplate.opsForZSet().reverseRange("totalRank", 0, 9);
		if (userNames == null) {
			List<RankInfoDO> getRankDO = null;
			try {
				getRankDO = playerDAO.findByHighScoreInTen();
			} catch (Exception e) {
				// none
			}
			if (getRankDO == null) {
				result.setResultFailed("查询失败！");
				return result;
			} else {
				for (RankInfoDO rank : getRankDO) {
					rankResult.add(rank.toModel());
					redisTemplate.opsForZSet().add("totalRank", rank.getUserName(), rank.getHighScore());
				}
			}
		} else {
			long order = 1;
			for (String eachUserName : userNames) {
				Player getPlayer = (Player) redisTemplate.opsForValue().get(eachUserName);
				if (getPlayer == null) {
					try {
						getPlayer = playerDAO.findByUserName(eachUserName).toModel();
					} catch (Exception e) {
						// none
					}
					if (getPlayer != null) {
						redisTemplate.opsForValue().set(eachUserName, getPlayer);
						RankInfo info = new RankInfo();
						info.setUserName(getPlayer.getUserName());
						info.setNickname(getPlayer.getNickname());
						info.setAvatar(getPlayer.getAvatar());
						info.setHighScore(getPlayer.getHighScore());
						info.setSequence(order);
						rankResult.add(info);
					}
				} else {
					RankInfo info = new RankInfo();
					info.setUserName(getPlayer.getUserName());
					info.setNickname(getPlayer.getNickname());
					info.setAvatar(getPlayer.getAvatar());
					info.setHighScore(getPlayer.getHighScore());
					info.setSequence(order);
					rankResult.add(info);
				}
				order++;
			}
		}
		result.setResultSuccess("获取排名成功！", rankResult);
		return result;
	}

	@Override
	public Result<RankInfo> getPlayerRank(PlayerDO playerDO) {
		Result<RankInfo> result = new Result<RankInfo>();
		if (playerDO == null) {
			result.setResultFailed("数据体不能为空！");
			return result;
		}
		Long rank = redisTemplate.opsForZSet().reverseRank("totalRank", playerDO.getUserName());
		if (rank == null) {
			RankInfo info = null;
			try {
				info = playerDAO.findUserRankByUsername(playerDO.getUserName()).toModel();
			} catch (Exception e) {
				// none
			}
			if (info == null) {
				result.setResultFailed("查询失败！");
				return result;
			} else {
				redisTemplate.opsForZSet().add("totalRank", info.getUserName(), info.getHighScore());
				result.setResultSuccess("查询成功！", info);
				return result;
			}
		} else {
			rank++;
		}
		double score = redisTemplate.opsForZSet().score("totalRank", playerDO.getUserName());
		RankInfo rankInfo = new RankInfo();
		rankInfo.setUserName(playerDO.getUserName());
		rankInfo.setNickname(playerDO.getNickname());
		rankInfo.setHighScore((int) score);
		rankInfo.setAvatar(playerDO.getAvatar());
		rankInfo.setSequence(rank);
		result.setResultSuccess("查询成功！", rankInfo);
		return result;
	}

}