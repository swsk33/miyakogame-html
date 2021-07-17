package link.swsk33web.miyakogame.api;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import link.swsk33web.miyakogame.param.CommonValue;
import link.swsk33web.miyakogame.util.PwdUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import link.swsk33web.miyakogame.dataobject.Player;
import link.swsk33web.miyakogame.model.RankInfo;
import link.swsk33web.miyakogame.model.Result;
import link.swsk33web.miyakogame.service.PlayerService;

@RestController
public class PlayerAPI {

	@Autowired
	private PlayerService playerService;

	@PostMapping(CommonValue.API_PREFIX + "reg")
	public Result<Player> register(@RequestBody Player player, HttpServletRequest request) {
		Result<Player> result = playerService.register(player);
		if (result.isSuccess()) {
			HttpSession session = request.getSession();
			session.setAttribute(CommonValue.SESSION_NAME, result.getData());
		}
		return result;
	}

	@PostMapping(CommonValue.API_PREFIX + "login")
	public Result<Player> login(@RequestBody Player player, HttpServletRequest request) {
		Result<Player> result = playerService.login(player);
		if (result.isSuccess()) {
			HttpSession session = request.getSession();
			session.setAttribute(CommonValue.SESSION_NAME, result.getData());
		}
		return result;
	}

	@GetMapping(CommonValue.API_PREFIX + "logout")
	public void logout(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setAttribute(CommonValue.SESSION_NAME, null);
	}

	@PostMapping(CommonValue.API_PREFIX + "delete")
	public Result<Player> del(@RequestBody Player player, HttpServletRequest request) {
		Result<Player> result = null;
		HttpSession session = request.getSession();
		String sessionPwd = ((Player) session.getAttribute(CommonValue.SESSION_NAME)).getPwd();
		if (!PwdUtils.encodePwd(player.getPwd()).equals(sessionPwd)) {
			result = new Result<>();
			result.setResultFailed("密码不正确！");
			return result;
		}
		result = playerService.delete(player.getId());
		request.getSession().setAttribute(CommonValue.SESSION_NAME, null);
		return result;
	}

	@PostMapping(CommonValue.API_PREFIX + "update")
	public Result<Player> update(@RequestBody Player player, HttpServletRequest request) {
		Result<Player> result = null;
		HttpSession session = request.getSession();
		Player sessionPlayer = (Player) session.getAttribute(CommonValue.SESSION_NAME);
		if (sessionPlayer.getId() != player.getId()) {
			result = new Result<>();
			result.setResultFailed("当前登录用户和被修改用户不一致，终止！");
			return result;
		}
		result = playerService.update(player);
		if (result.isSuccess()) {
			session.setAttribute(CommonValue.SESSION_NAME, result.getData());
		}
		return result;
	}

	@GetMapping(CommonValue.API_PREFIX + "rankten")
	public Result<List<RankInfo>> getRankTen() {
		return playerService.getTotalRank();
	}

	@GetMapping(CommonValue.API_PREFIX + "playerank")
	public Result<RankInfo> getPlayerRank(@RequestParam("id") int playerId) {
		return playerService.getPlayerRank(playerId);
	}

}