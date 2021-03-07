package swsk33.game.miyakoeatpuddings.dataobject;

import java.time.LocalDateTime;
import swsk33.game.miyakoeatpuddings.model.Avatar;

public class AvatarDO {

	/**
	 * 图片主键id
	 */
	private String id;

	/**
	 * 图片储存路径
	 */
	private String filePath;
	
	/**
	 * 创建时间
	 */
	private LocalDateTime gmtCreated;
	
	/**
	 * 修改时间
	 */
	private LocalDateTime gmtModified;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the filePath
	 */
	public String getFilePath() {
		return filePath;
	}

	/**
	 * @param filePath the filePath to set
	 */
	public void setFilePath(String filePath) {
		this.filePath = filePath;
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
	
	public Avatar toModel() {
		Avatar avatar = new Avatar();
		avatar.setId(id);
		avatar.setFilePath(filePath);
		avatar.setGmtCreated(gmtCreated);
		avatar.setGmtModified(gmtModified);
		return avatar;
	}

}