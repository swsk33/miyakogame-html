package link.swsk33web.miyakogame.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import link.swsk33web.miyakogame.dao.PlayerDAO;
import link.swsk33web.miyakogame.param.CommonValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import link.swsk33web.miyakogame.dataobject.Player;

public class MiyakoInterceptor implements HandlerInterceptor {

	@Autowired
	private RedisTemplate redisTemplate;

	@Autowired
	private PlayerDAO playerDAO;

	// Controller方法执行之前
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		Player sessionPlayer = (Player) session.getAttribute(CommonValue.SESSION_NAME);
		if (sessionPlayer == null) {
			response.sendRedirect("/miyakogame/player/login");
			return false;
		}
		Player getPlayer = null;
		try {
			getPlayer = (Player) redisTemplate.opsForValue().get(sessionPlayer.getUserName());
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (getPlayer == null) {
			try {
				getPlayer = playerDAO.findByUserName(sessionPlayer.getUserName());
			} catch (Exception e) {
				e.printStackTrace();
			}
			if (getPlayer == null) {
				response.sendRedirect("/miyakogame/player/login");
				return false;
			}
		}
		if (!getPlayer.getPwd().equals(sessionPlayer.getPwd())) {
			response.sendRedirect("/miyakogame/player/login");
			return false;
		}
		return true;
	}

	// Controller方法执行之后
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

	}

	// 整个请求完成后（包括Thymeleaf渲染完毕）
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

	}

}