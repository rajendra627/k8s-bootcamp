package ca.architech.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@EnableMongoRepositories("ca.architech.todo")
public class TodoApiApplication {

	public static void main(String[] args) {
        System.out.println("MONGODB_URL was set to:" + System.getenv("MONGODB_URL"));
		SpringApplication.run(TodoApiApplication.class, args);
	}
}
