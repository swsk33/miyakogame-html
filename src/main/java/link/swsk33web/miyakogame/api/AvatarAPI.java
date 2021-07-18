package link.swsk33web.miyakogame.api;

import link.swsk33web.miyakogame.model.Result;
import link.swsk33web.miyakogame.param.CommonValue;
import link.swsk33web.miyakogame.service.AvatarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping(CommonValue.API_PREFIX + "avatar")
public class AvatarAPI {

	@Autowired
	private AvatarService avatarService;

	@PostMapping(CommonValue.API_PREFIX + "/upload")
	@ResponseBody
	public Result<String> upload(@RequestParam("img") MultipartFile file) {
		return avatarService.upload(file);
	}

}