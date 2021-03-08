package link.swsk33web.miyakogame.control;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebPageControl {

	@GetMapping("/miyakogame")
	public String getIndex() {
		return "index";
	}

}