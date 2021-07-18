package link.swsk33web.miyakogame.api;

import link.swsk33web.miyakogame.model.Result;
import link.swsk33web.miyakogame.param.CommonValue;
import link.swsk33web.miyakogame.service.AvatarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(CommonValue.API_PREFIX + "avatar")
public class AvatarAPI {

	@Autowired
	private AvatarService avatarService;

	@PostMapping("/upload")
	public Result<String> upload(@RequestParam("img") MultipartFile file) {
		return avatarService.upload(file);
	}

}