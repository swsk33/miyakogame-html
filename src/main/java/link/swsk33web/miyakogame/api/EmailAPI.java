package link.swsk33web.miyakogame.api;

import link.swsk33web.miyakogame.model.Result;
import link.swsk33web.miyakogame.param.CommonValue;
import link.swsk33web.miyakogame.param.MailServiceType;
import link.swsk33web.miyakogame.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailAPI {

	@Autowired
	private MailService mailService;

	@GetMapping(CommonValue.API_PREFIX + "mail/sendcode")
	public Result sendCode(@RequestParam("id") int id, @RequestParam("email") String email, @RequestParam("type") String type) {
		return mailService.sendCode(email, id, MailServiceType.valueOf(type));
	}

}