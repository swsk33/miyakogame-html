package swsk33.game.miyakoeatpuddings.dataobject;

import java.time.LocalDateTime;
import swsk33.game.miyakoeatpuddings.model.Player;

public class PlayerDO {

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
	 * 密码
	 */
	private String pwd;

	/**
	 * 游戏数据
	 */
	private String gameData;
	
	/**
	 * 创建时间
	 */
	private LocalDateTime gmtCreated;
	
	/**
	 * 修改时间
	 */
	private LocalDateTime gmtModified;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getAvatar() {
		return avatar;
	}

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

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getGameData() {
		return gameData;
	}

	public void setGameData(String gameData) {
		this.gameData = gameData;
	}

	/**
	 * @return the gmtCreated
	 */
	public LocalDateTime getGmtCreated() {
		return gmtCreated;
	}

	/**
	 * @param gmtCreated the gmtCreated to set
	 */
	public void setGmtCreated(LocalDateTime gmtCreated) {
		this.gmtCreated = gmtCreated;
	}

	/**
	 * @return the gmtModified
	 */
	public LocalDateTime getGmtModified() {
		return gmtModified;
	}

	/**
	 * @param gmtModified the gmtModified to set
	 */
	public void setGmtModified(LocalDateTime gmtModified) {
		this.gmtModified = gmtModified;
	}
	
	public Player toModel() {
		Player player = new Player();
		player.setUserName(userName);
		player.setNickname(nickname);
		player.setAvatar(avatar);
		player.setHighScore(highScore);
		player.setPwd(pwd);
		player.setGameData(gameData);
		player.setGmtCreated(gmtCreated);
		player.setGmtModified(gmtModified);
		return player;
	}
	
}