package link.swsk33web.miyakogame.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebAppConfigurer implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// 多个拦截器组成一个拦截器链
		// 仅演示，设置所有 url 都拦截
		registry.addInterceptor(new MiyakoInterceptor()).addPathPatterns("/**");
	}

}