package swsk33.game.miyakoeatpuddings.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import swsk33.game.miyakoeatpuddings.dataobject.PlayerDO;

@Mapper
public interface PlayerDAO {

	int add(PlayerDO playerDO);

	int delete(@Param("userName") String userName);

	int update(PlayerDO playerDO);

	PlayerDO findByUserName(@Param("userName") String userName);

	List<PlayerDO> findByHighScoreInTen();

}