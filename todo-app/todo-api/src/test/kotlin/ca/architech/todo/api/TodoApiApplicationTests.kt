package ca.architech.todo.api

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*

@RunWith(SpringRunner::class)
@SpringBootTest
class TodoApiApplicationTests {

    @Autowired
    lateinit var repository: TodoItemRepository

	@Test
	fun contextLoads() {
	}

	@Test
	fun addTodoItem() {
		val now = Date();
		val tomorrow = LocalDateTime.from(now.toInstant().atZone(ZoneId.of("UTC"))).plusDays(1)
		val item = TodoItem(id = "123456789",
                owner = "123456789",
                description = "Test Item",
                priority = Priority.HIGH,
                dueDate = tomorrow,
                tags = mutableListOf("test"))

        val item2 = TodoItem(id = "234567890",
                owner = "234567890",
                description = "Read policies by end of week.",
                priority = Priority.HIGH,
                dueDate = tomorrow,
                tags = mutableListOf("policy, HR"))

        val item3 = TodoItem(id= "345678901",
                owner = "345678901",
                description = "Finish K8S bootcamp outline.",
                priority = Priority.HIGH,
                dueDate = tomorrow,
                tags = mutableListOf("K8S", "training"))

        repository.save(mutableListOf(item, item2, item3))
        assert(!repository.findAll().isEmpty())

        var retrievedItem = repository.findById(item.id!!)
        assert(retrievedItem?.id!! == item.id!!)
	}

}
