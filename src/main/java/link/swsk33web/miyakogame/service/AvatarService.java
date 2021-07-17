package link.swsk33web.miyakogame.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import link.swsk33web.miyakogame.model.Result;

@Service
public interface AvatarService {

	/**
	 * 上传头像
	 */
	Result<String> upload(MultipartFile file);

}