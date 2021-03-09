package link.swsk33web.miyakogame.control;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import link.swsk33web.miyakogame.model.Player;

@Controller
public class MainPageControl {

	@GetMapping("/miyakogame")
	public String getIndex(HttpServletRequest request, Model model) {
		boolean isLogin = false;
		HttpSession session = request.getSession();
		Player getPlayer = (Player) session.getAttribute("session");
		if (getPlayer != null) {
			isLogin = true;
			model.addAttribute("player", getPlayer);
		}
		model.addAttribute("islogin", isLogin);
		return "index";
	}

	@GetMapping("/miyakogame/player/register")
	public String register() {
		return "register";
	}

}