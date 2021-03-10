package link.swsk33web.miyakogame.config;

import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebAppConfigurer implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		List<String> pathPatterns = new ArrayList<String>();
		pathPatterns.add("/miyakogame/api/update");
		pathPatterns.add("/miyakogame/api/avatar/upload");
		registry.addInterceptor(new MiyakoInterceptor()).addPathPatterns(pathPatterns);
	}

}