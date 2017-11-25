package ca.architech.todo.api

import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import java.time.LocalDate

@RunWith(SpringRunner::class)
@SpringBootTest
class TodoApiApplicationTests {

    @Autowired
    lateinit var repository: TodoItemRepository

    @Before
    fun setUp() {
        val now = LocalDate.now();

        val item = TodoItem(id = "123456789",
                owner = "123456789",
                description = "Test Item",
                priority = Priority.HIGH,
                dueDate = now.plusDays(7),
                tags = mutableListOf("test"))

        val item2 = TodoItem(id = "234567890",
                owner = "234567890",
                description = "Read policies by end of week.",
                priority = Priority.HIGH,
                dueDate = now.plusWeeks(4),
                tags = mutableListOf("policy, HR"))

        val item3 = TodoItem(id= "345678901",
                owner = "345678901",
                description = "Finish K8S bootcamp outline.",
                priority = Priority.HIGH,
                dueDate = now.plusDays(5),
                tags = mutableListOf("K8S", "training"))

        repository.save(mutableListOf(item, item2, item3))
    }

	@Test
	fun findById() {
        assert(!repository.findAll().isEmpty())

        val id = "123456789"
        val item = repository.findById(id)

        assertThat(item?.id).isEqualTo(id)
	}

    @Test
    fun findByTag() {
        assert(!repository.findAll().isEmpty())

        val tag = "training"
        val items = repository.findByTag(tag)

        assertThat(items).hasSize(1)
    }

}
