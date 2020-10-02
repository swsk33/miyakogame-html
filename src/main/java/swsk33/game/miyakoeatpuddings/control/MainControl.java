package swsk33.game.miyakoeatpuddings.control;

import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainControl {
	@GetMapping("/miyakogame")
	public String getIndex() {
		return "index.html";
	}

	@GetMapping("/miyakogamepc")
	public String getIndexPc() {
		return "index-pc.html";
	}

	@GetMapping("/miyakogamemobile")
	public String getIndexMobile() {
		return "index-mobile.html";
	}
}
