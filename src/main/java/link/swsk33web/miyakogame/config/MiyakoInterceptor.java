package link.swsk33web.miyakogame.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import link.swsk33web.miyakogame.model.Player;

public class MiyakoInterceptor implements HandlerInterceptor {

	// Controller方法执行之前
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		Player sessionPlayer = (Player) session.getAttribute("session");
		if (sessionPlayer == null) {
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