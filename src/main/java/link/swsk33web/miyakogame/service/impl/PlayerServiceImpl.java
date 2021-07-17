package link.swsk33web.miyakogame.service.impl;

import link.swsk33web.miyakogame.dao.PlayerDAO;
import link.swsk33web.miyakogame.dataobject.Player;
import link.swsk33web.miyakogame.model.RankInfo;
import link.swsk33web.miyakogame.model.Result;
import link.swsk33web.miyakogame.param.CommonValue;
import link.swsk33web.miyakogame.service.PlayerService;
import link.swsk33web.miyakogame.util.PwdUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@SuppressWarnings({"rawtypes", "unchecked"})
@Component
public class PlayerServiceImpl implements PlayerService {

	@Autowired
	private PlayerDAO playerDAO;

	@Autowired
	private RedisTemplate redisTemplate;

	@Override
	public Result<Player> register(Player player) {
		Result<Player> result = new Result<>();
		if (player == null) {
			result.setResultFailed("数据体不能为空！");
			return result;
		}
		if (StringUtils.isEmpty(player.getUserName())) {
			result.setResultFailed("用户名不能为空！");
			return result;
		}
		if (StringUtils.isEmpty(player.getPwd())) {
			result.setResultFailed("密码不能为空！");
			return result;
		}
		if (player.getPwd().length() < 8) {
			result.setResultFailed("密码长度不能小于8！");
			return result;
		}
		if (StringUtils.isEmpty(player.getEmail())) {
			result.setResultFailed("邮箱不能为空！");
			return result;
		}
		if (!player.getEmail().contains("@")) {
			result.setResultFailed("邮箱不规范！");
			return result;
		}
		// 先从Redis找这个用户
		Player getPlayer = (Player) redisTemplate.opsForValue().get(player.getUserName());
		if (getPlayer == null) {
			// Redis找不着，再去MySQL中找
			try {
				getPlayer = playerDAO.findByUserName(player.getUserName());
			} catch (Exception e) {
				// none
			}
			if (getPlayer != null) {
				result.setResultFailed("该用户名已存在！");
				redisTemplate.opsForValue().set(player.getUserName(), getPlayer);
				return result;
			}
		} else {
			result.setResultFailed("该用户名已存在！");
			return result;
		}
		if (StringUtils.isEmpty(player.getAvatar())) {
			player.setAvatar("/avatars/default-" + (new Random().nextInt(5) + 1) + ".jpg");
		}
		if (StringUtils.isEmpty(player.getNickname())) {
			player.setNickname(player.getUserName());
		}
		player.setPwd(PwdUtils.encodePwd(player.getPwd()));
		player.setHighScore(0);
		player.setGameData("null");
		player.setGmtCreated(LocalDateTime.now());
		player.setGmtModified(LocalDateTime.now());
		redisTemplate.opsForValue().set(player.getUserName(), player);
		playerDAO.add(player);
		// 加入Redis排名表
		redisTemplate.opsForZSet().add(CommonValue.REDIS_RANK_TABLE_NAME, player.getUserName(), player.getHighScore());
		result.setResultSuccess("注册用户成功！", player);
		return result;
	}

	@Override
	public Result<Player> login(Player player) {
		Result<Player> result = new Result<>();
		if (player == null) {
			result.setResultFailed("数据体不能为空！");
			return result;
		}
		if (StringUtils.isEmpty(player.getUserName())) {
			result.setResultFailed("用户名不能为空！");
			return result;
		}
		if (StringUtils.isEmpty(player.getPwd())) {
			result.setResultFailed("密码不能为空！");
			return result;
		}
		// 先去Redis查询，没有再去数据库
		Player getPlayer = (Player) redisTemplate.opsForValue().get(player.getUserName());
		if (getPlayer == null) {
			try {
				getPlayer = playerDAO.findByUserName(player.getUserName());
			} catch (Exception e) {
				e.printStackTrace();
			}
			if (getPlayer == null) {
				result.setResultFailed("用户不存在！");
				// 即使是无效的用户名也给存入Redis，防止缓存穿透
				Player invalidPlayer = new Player();
				invalidPlayer.setUserName(player.getUserName());
				invalidPlayer.setPwd(null);
				redisTemplate.opsForValue().set(player.getUserName(), invalidPlayer, 1200, TimeUnit.SECONDS);
				return result;
			} else {
				redisTemplate.opsForValue().set(player.getUserName(), getPlayer);
			}
		} else if (StringUtils.isEmpty(getPlayer.getPwd())) { // 若Redis中找出的是没有密码的账户，就说明是无效账户
			result.setResultFailed("请勿重复登录无效账户！");
			return result;
		}
		if (!PwdUtils.encodePwd(player.getPwd()).equals(getPlayer.getPwd())) {
			result.setResultFailed("用户名或者密码错误！");
			return result;
		}
		result.setResultSuccess("登录成功", getPlayer);
		return result;
	}

	@Override
	public Result<Player> delete(String userName) {
		Result<Player> result = new Result<>();
		redisTemplate.delete(userName);
		redisTemplate.opsForZSet().remove(CommonValue.REDIS_RANK_TABLE_NAME, userName);
		playerDAO.delete(userName);
		result.setResultSuccess("注销用户完成！", null);
		return result;
	}

	@Override
	public Result<Player> update(Player player) {
		Result<Player> result = new Result<>();
		if (player == null) {
			result.setResultFailed("数据体不能为空！");
			return result;
		}
		Player getPlayer = (Player) redisTemplate.opsForValue().get(player.getUserName());
		if (getPlayer == null) {
			try {
				getPlayer = playerDAO.findByUserName(player.getUserName());
			} catch (Exception e) {
				e.printStackTrace();
			}
			if (getPlayer == null) {
				result.setResultFailed("找不到玩家！");
				return result;
			}
		}
		if (StringUtils.isEmpty(player.getNickname())) {
			player.setNickname(getPlayer.getNickname());
		}
		if (StringUtils.isEmpty(player.getAvatar())) {
			player.setAvatar(getPlayer.getAvatar());
		} else {
			String originAvatar = getPlayer.getAvatar();
			//删除原有头像，默认头像不删除
			if (!originAvatar.contains("default")) {
				new File("Resource" + originAvatar).delete();
			}
		}
		if (StringUtils.isEmpty("" + player.getHighScore())) {
			player.setHighScore(getPlayer.getHighScore());
		} else {
			// 重新写入Redis排名表信息
			redisTemplate.opsForZSet().remove(CommonValue.REDIS_RANK_TABLE_NAME, player.getUserName());
			redisTemplate.opsForZSet().add(CommonValue.REDIS_RANK_TABLE_NAME, player.getUserName(), player.getHighScore());
		}
		if (StringUtils.isEmpty(player.getPwd())) {
			player.setPwd(getPlayer.getPwd());
		} else if (player.getPwd().length() < 8) {
			result.setResultFailed("修改密码长度不能小于8！");
			return result;
		} else {
			player.setPwd(PwdUtils.encodePwd(player.getPwd()));
		}
		if (StringUtils.isEmpty(player.getEmail())) {
			player.setEmail(getPlayer.getEmail());
		}
		if (StringUtils.isEmpty(player.getGameData())) {
			player.setGameData(getPlayer.getGameData());
		}
		player.setGmtCreated(getPlayer.getGmtCreated());
		player.setGmtModified(LocalDateTime.now());
		redisTemplate.opsForValue().set(player.getUserName(), player);
		playerDAO.update(player);
		result.setResultSuccess("修改信息成功！", player);
		return result;
	}

	@Override
	public Result<List<RankInfo>> getTotalRank() {
		Result<List<RankInfo>> result = new Result<>();
		List<RankInfo> rankResult = new ArrayList<>();
		Set<String> userNames = redisTemplate.opsForZSet().reverseRange("totalRank", 0, 9);
		if (userNames == null) {
			List<RankInfo> getRankDO = null;
			try {
				getRankDO = playerDAO.findByHighScoreInTen();
			} catch (Exception e) {
				// none
			}
			if (getRankDO == null) {
				result.setResultFailed("查询失败！");
				return result;
			} else {
				for (RankInfo rank : getRankDO) {
					rankResult.add(rank);
					redisTemplate.opsForZSet().add(CommonValue.REDIS_RANK_TABLE_NAME, rank.getUserName(), rank.getHighScore());
				}
			}
		} else {
			long order = 1;
			for (String eachUserName : userNames) {
				Player getPlayer = (Player) redisTemplate.opsForValue().get(eachUserName);
				if (getPlayer == null) {
					try {
						getPlayer = playerDAO.findByUserName(eachUserName);
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
	public Result<RankInfo> getPlayerRank(Player player) {
		Result<RankInfo> result = new Result<>();
		if (player == null) {
			result.setResultFailed("数据体不能为空！");
			return result;
		}
		Long rank = redisTemplate.opsForZSet().reverseRank(CommonValue.REDIS_RANK_TABLE_NAME, player.getUserName());
		if (rank == null) {
			RankInfo info = null;
			try {
				info = playerDAO.findUserRankByUsername(player.getUserName());
			} catch (Exception e) {
				// none
			}
			if (info == null) {
				result.setResultFailed("查询失败！");
				return result;
			} else {
				redisTemplate.opsForZSet().add(CommonValue.REDIS_RANK_TABLE_NAME, info.getUserName(), info.getHighScore());
				result.setResultSuccess("查询成功！", info);
				return result;
			}
		} else {
			rank++;
		}
		double score = redisTemplate.opsForZSet().score(CommonValue.REDIS_RANK_TABLE_NAME, player.getUserName());
		RankInfo rankInfo = new RankInfo();
		rankInfo.setUserName(player.getUserName());
		rankInfo.setNickname(player.getNickname());
		rankInfo.setHighScore((int) score);
		rankInfo.setAvatar(player.getAvatar());
		rankInfo.setSequence(rank);
		result.setResultSuccess("查询成功！", rankInfo);
		return result;
	}

}