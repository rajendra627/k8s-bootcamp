package ca.architech.todo

import com.google.common.base.Predicate
import com.google.common.base.Predicates
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger2.annotations.EnableSwagger2

@SpringBootApplication
@EnableSwagger2
class TodoApiApplication

fun main(args: Array<String>) {
    System.out.println("MONGODB_URL was set to:" + System.getenv("MONGODB_URL"))
    SpringApplication.run(TodoApiApplication::class.java, *args)
}

@Bean
fun api() : Docket {
    return Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.basePackage("ca.architech.todo.api"))
            .apis(Predicates.not(RequestHandlerSelectors.basePackage("org.springframework.boot")))
            .paths(PathSelectors.any())
            .build()
}
