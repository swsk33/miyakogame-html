package link.swsk33web.miyakogame.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import link.swsk33web.miyakogame.model.Avatar;
import link.swsk33web.miyakogame.model.Result;

@Service
public interface AvatarService {

	/**
	 * 上传头像
	 */
	public Result<Avatar> upload(MultipartFile file);

	/**
	 * 根据图片id获得头像地址
	 */
	public Result<String> get(String id);

}