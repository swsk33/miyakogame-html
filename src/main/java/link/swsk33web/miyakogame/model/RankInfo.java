package link.swsk33web.miyakogame.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

/**
 * 排名信息
 *
 * @author swsk33
 */
@Getter
@Setter
@NoArgsConstructor
public class RankInfo implements Serializable {

	/**
	 * 用户名
	 */
	private String userName;

	/**
	 * 昵称
	 */
	private String nickname;

	/**
	 * 头像
	 */
	private String avatar;

	/**
	 * 最高分
	 */
	private int highScore;

	/**
	 * 排名
	 */
	private Long sequence;

}