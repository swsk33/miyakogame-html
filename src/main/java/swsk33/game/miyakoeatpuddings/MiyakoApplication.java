package swsk33.game.miyakoeatpuddings;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(value={"file:Resources/config/config.properties"})
public class MiyakoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiyakoApplication.class, args);
	}

}