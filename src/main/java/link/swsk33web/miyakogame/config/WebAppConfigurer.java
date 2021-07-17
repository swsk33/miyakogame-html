package link.swsk33web.miyakogame.config;

import java.util.ArrayList;
import java.util.List;

import link.swsk33web.miyakogame.param.CommonValue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 网站配置类，例如拦截器拦截链等等
 */
@Configuration
public class WebAppConfigurer implements WebMvcConfigurer {

	@Bean
	public HandlerInterceptor getInterceptor() {
		return new MiyakoInterceptor();
	}

	/**
	 * 添加拦截器
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		List<String> pathPatterns = new ArrayList<>();
		pathPatterns.add(CommonValue.API_PREFIX + "update");
		pathPatterns.add(CommonValue.API_PREFIX + "delete");
		pathPatterns.add(CommonValue.API_PREFIX + "avatar/upload");
		registry.addInterceptor(getInterceptor()).addPathPatterns(pathPatterns);
	}

}