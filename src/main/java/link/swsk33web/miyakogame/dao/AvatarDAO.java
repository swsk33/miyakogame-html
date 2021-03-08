package link.swsk33web.miyakogame.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import link.swsk33web.miyakogame.dataobject.AvatarDO;

@Mapper
public interface AvatarDAO {

	int add(AvatarDO avatarDO);

	String find(@Param("id") String id);

}