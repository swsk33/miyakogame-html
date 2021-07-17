package link.swsk33web.miyakogame.service.impl;

import java.io.File;
import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import link.swsk33web.miyakogame.model.Result;
import link.swsk33web.miyakogame.service.AvatarService;
import link.swsk33web.miyakogame.util.UUIDUtils;

@SuppressWarnings({"rawtypes", "unchecked"})
@Component
public class AvatarServiceImpl implements AvatarService {

	private File imgDir = new File("Resources" + File.separator + "avatars" + File.separator + "users");

	@PostConstruct
	public void fileinit() {
		if (!imgDir.exists()) {
			imgDir.mkdirs();
		}
	}

	@Override
	public Result<String> upload(MultipartFile file) {
		Result<String> result = new Result<>();
		if (file == null) {
			result.setResultFailed("请上传图片！");
			return result;
		}
		String fileFormat = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
		String fileName = UUIDUtils.generateTimeId() + fileFormat;
		try {
			file.transferTo(new File(imgDir.getAbsolutePath() + File.separator + fileName));
		} catch (Exception e) {
			e.printStackTrace();
			result.setResultFailed("图片转存失败！");
			return result;
		}
		String imgRequestPath = "/avatars/users/" + fileName;
		result.setResultSuccess("上传头像成功！", imgRequestPath);
		return result;
	}

}