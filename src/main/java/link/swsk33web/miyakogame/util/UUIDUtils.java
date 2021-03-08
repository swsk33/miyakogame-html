package link.swsk33web.miyakogame.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class UUIDUtils {

	/**
	 * 生成UUID
	 * 
	 * @return UUID值
	 */
	public static String generateUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	/**
	 * 获取当前时间作为id
	 * 
	 * @return 时间id
	 */
	public static String generateTimeId() {
		LocalDateTime time = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");
		return formatter.format(time);
	}

}