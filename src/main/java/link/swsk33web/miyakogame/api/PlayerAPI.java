package link.swsk33web.miyakogame.api;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import link.swsk33web.miyakogame.dataobject.PlayerDO;
import link.swsk33web.miyakogame.model.Player;
import link.swsk33web.miyakogame.model.RankInfo;
import link.swsk33web.miyakogame.model.Result;
import link.swsk33web.miyakogame.service.PlayerService;

@RestController
public class PlayerAPI {

	@Autowired
	private PlayerService playerService;

	@PostMapping("/miyakogame/api/reg")
	public Result<Player> register(@RequestBody PlayerDO playerDO, HttpServletRequest request) {
		Result<Player> result = playerService.register(playerDO);
		if (result.isSuccess()) {
			HttpSession session = request.getSession();
			session.setAttribute("session", result.getData());
		}
		return result;
	}

	@PostMapping("/miyakogame/api/login")
	public Result<Player> login(@RequestBody PlayerDO playerDO, HttpServletRequest request) throws Exception {
		Result<Player> result = playerService.login(playerDO);
		if (result.isSuccess()) {
			HttpSession session = request.getSession();
			session.setAttribute("session", result.getData());
		}
		return result;
	}

	@PostMapping("/miyakogame/api/update")
	public Result<Player> update(@RequestBody PlayerDO playerDO) {
		return playerService.update(playerDO);
	}

	@GetMapping("/miyakogame/api/rankten")
	public Result<List<RankInfo>> getRankTen() {
		return playerService.getTotalRank();
	}

	@PostMapping("/miyakogame/api/playerank")
	public Result<RankInfo> getPlayerRank(@RequestBody PlayerDO playerDO) {
		return playerService.getPlayerRank(playerDO);
	}

}