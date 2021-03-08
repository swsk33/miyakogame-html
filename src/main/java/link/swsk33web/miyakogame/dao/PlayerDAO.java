package link.swsk33web.miyakogame.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import link.swsk33web.miyakogame.dataobject.PlayerDO;
import link.swsk33web.miyakogame.dataobject.RankInfoDO;

@Mapper
public interface PlayerDAO {

	int add(PlayerDO playerDO);

	int update(PlayerDO playerDO);

	PlayerDO findByUserName(@Param("userName") String userName);

	List<RankInfoDO> findByHighScoreInTen();

	RankInfoDO findUserRankByUsername(@Param("userName") String userName);

}