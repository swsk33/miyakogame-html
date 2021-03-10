package link.swsk33web.miyakogame.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import link.swsk33web.miyakogame.model.Avatar;
import link.swsk33web.miyakogame.model.Result;
import link.swsk33web.miyakogame.service.AvatarService;

@Controller
public class AvatarAPI {

	@Autowired
	private AvatarService avatarService;

	@PostMapping("/miyakogame/api/avatar/upload")
	@ResponseBody
	public Result<Avatar> upload(@RequestParam("img") MultipartFile file) {
		return avatarService.upload(file);
	}

	@GetMapping("/miyakogame/api/avatar/{id}")
	public String get(@PathVariable("id") String id) {
		return "redirect:" + avatarService.get(id).getData();
	}

}