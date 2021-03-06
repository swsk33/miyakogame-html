package fun.swsk33site.miyakogame.dao;

import fun.swsk33site.miyakogame.dataobject.Player;
import fun.swsk33site.miyakogame.model.RankInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PlayerDAO {

	/**
	 * 新增用户
	 */
	int add(Player player);

	/**
	 * 删除用户
	 */
	int delete(int id);

	/**
	 * 修改用户
	 **/
	int update(Player player);

	/**
	 * 根据id查找用户
	 */
	Player findById(int id);

	/**
	 * 根据用户名查找用户
	 */
	Player findByUserName(String userName);

	/**
	 * 根据邮件查找用户
	 */
	List<Player> findByEmail(String email);

	/**
	 * 查询最高分前十用户
	 */
	List<RankInfo> findByHighScoreInTen();

	/**
	 * 通过用户id查询用户排名
	 */
	RankInfo findUserRankByUserId(int userId);

}