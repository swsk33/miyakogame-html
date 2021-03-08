package link.swsk33web.miyakogame.dataobject;

import link.swsk33web.miyakogame.model.RankInfo;

public class RankInfoDO {

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
	private int sequence;

	/**
	 * @return the nickname
	 */
	public String getNickname() {
		return nickname;
	}

	/**
	 * @param nickname the nickname to set
	 */
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	/**
	 * @return the avatar
	 */
	public String getAvatar() {
		return avatar;
	}

	/**
	 * @param avatar the avatar to set
	 */
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	/**
	 * @return the highScore
	 */
	public int getHighScore() {
		return highScore;
	}

	/**
	 * @param highScore the highScore to set
	 */
	public void setHighScore(int highScore) {
		this.highScore = highScore;
	}

	/**
	 * @return the sequence
	 */
	public int getSequence() {
		return sequence;
	}

	/**
	 * @param sequence the sequence to set
	 */
	public void setSequence(int sequence) {
		this.sequence = sequence;
	}

	public RankInfo toModel() {
		RankInfo info = new RankInfo();
		info.setNickname(nickname);
		info.setAvatar(avatar);
		info.setHighScore(highScore);
		info.setSequence(sequence);
		return info;
	}

}