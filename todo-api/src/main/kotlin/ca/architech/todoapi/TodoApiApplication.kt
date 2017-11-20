package ca.architech.todoapi

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class TodoApiApplication

fun main(args: Array<String>) {
    SpringApplication.run(TodoApiApplication::class.java, *args)
}
