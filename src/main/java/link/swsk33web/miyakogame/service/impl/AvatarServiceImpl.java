package link.swsk33web.miyakogame.service.impl;

import java.io.File;
import javax.annotation.PostConstruct;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import link.swsk33web.miyakogame.dao.AvatarDAO;
import link.swsk33web.miyakogame.dataobject.AvatarDO;
import link.swsk33web.miyakogame.model.Avatar;
import link.swsk33web.miyakogame.model.Result;
import link.swsk33web.miyakogame.service.AvatarService;
import link.swsk33web.miyakogame.util.UUIDUtils;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Component
public class AvatarServiceImpl implements AvatarService {

	private File imgDir = new File("Resources" + File.separator + "avatars" + File.separator + "users");

	@Autowired
	private AvatarDAO avatarDAO;

	@Autowired
	private RedisTemplate redisTemplate;

	@PostConstruct
	public void fileinit() {
		if (!imgDir.exists()) {
			imgDir.mkdirs();
		}
	}

	@Override
	public Result<Avatar> upload(MultipartFile file) {
		Result<Avatar> result = new Result<Avatar>();
		if (file == null) {
			result.setResultFailed("请上传图片！");
			return result;
		}
		if (file.getSize() == 0) {
			result.setResultFailed("请勿上传空文件！");
			return result;
		}
		String fileFormat = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
		if (!fileFormat.equalsIgnoreCase(".png") && !fileFormat.equalsIgnoreCase(".jpg") && !fileFormat.equalsIgnoreCase(".jpeg") && !fileFormat.equalsIgnoreCase(".gif")) {
			result.setResultFailed("上传的文件必须是png，jpg，jpeg或者gif格式！");
			return result;
		}
		if (file.getSize() > 2097152) {
			result.setResultFailed("上传文件大小不能超过2MB！");
			return result;
		}
		String fileName = UUIDUtils.generateTimeId() + fileFormat;
		try {
			file.transferTo(new File(imgDir.getAbsolutePath() + File.separator + fileName));
		} catch (Exception e) {
			e.printStackTrace();
			result.setResultFailed("图片转存失败！");
			return result;
		}
		String id = UUIDUtils.generateUUID();
		AvatarDO avatarDO = new AvatarDO();
		avatarDO.setId(id);
		avatarDO.setRequestPath("/avatars/users/" + fileName);
		avatarDAO.add(avatarDO);
		redisTemplate.opsForValue().set(id, avatarDO.getRequestPath());
		result.setResultSuccess("上传头像成功！", avatarDO.toModel());
		return result;
	}

	@Override
	public Result<String> get(String id) {
		Result<String> result = new Result<String>();
		if (StringUtils.isEmpty(id)) {
			result.setResultFailed("id不能为空！");
			return result;
		}
		// 先去Redis查询
		String getRequestPath = (String) redisTemplate.opsForValue().get(id);
		if (StringUtils.isEmpty(getRequestPath)) {
			try {
				getRequestPath = avatarDAO.find(id);
			} catch (Exception e) {
				// none
			}
			if (StringUtils.isEmpty(getRequestPath)) {
				result.setResultSuccess("找不到原文件，使用默认头像代替之。", "/avatars/default-3.jpg");
				redisTemplate.opsForValue().set(id, "/avatars/default-3.jpg");
				return result;
			} else {
				redisTemplate.opsForValue().set(id, getRequestPath);
			}
		}
		result.setResultSuccess("找到头像！", getRequestPath);
		return result;
	}

}