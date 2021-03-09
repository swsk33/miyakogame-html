package link.swsk33web.miyakogame.control;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import link.swsk33web.miyakogame.dao.PlayerDAO;
import link.swsk33web.miyakogame.model.Player;

@SuppressWarnings({ "rawtypes", "unchecked" })
@Controller
public class MainPageControl {

	@Autowired
	private PlayerDAO playerDAO;

	@Autowired
	private RedisTemplate redisTemplate;

	@GetMapping("/miyakogame")
	public String getIndex(HttpServletRequest request, Model model) {
		boolean isLogin = false;
		// 验证session是否正确
		HttpSession session = request.getSession();
		Player sessionPlayer = (Player) session.getAttribute("session");
		if (sessionPlayer != null) {
			// 根据session中信息去Redis中查找，没有就去数据库
			Player getPlayer = (Player) redisTemplate.opsForValue().get(sessionPlayer.getUserName());
			if (getPlayer == null) {
				try {
					getPlayer = playerDAO.findByUserName(sessionPlayer.getUserName()).toModel();
				} catch (Exception e) {
					// none
				}
				if (getPlayer != null) {
					redisTemplate.opsForValue().set(getPlayer.getUserName(), getPlayer);
				}
			}
			if (sessionPlayer.getPwd().equals(getPlayer.getPwd())) {
				isLogin = true;
				model.addAttribute("player", sessionPlayer);
			}
		}
		model.addAttribute("islogin", isLogin);
		return "index";
	}

	@GetMapping("/miyakogame/player/register")
	public String register() {
		return "register";
	}
	
	@GetMapping("/miyakogame/player/login")
	public String login() {
		return "login";
	}

}