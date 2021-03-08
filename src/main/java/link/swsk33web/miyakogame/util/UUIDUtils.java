package link.swsk33web.miyakogame.util;

import java.util.UUID;

public class UUIDUtils {

	/**
	 * 生成UUID
	 * @return UUID值
	 */
	public static String generateUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}

}