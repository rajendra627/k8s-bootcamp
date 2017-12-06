package ca.architech.todo.api

import com.fasterxml.jackson.annotation.JsonFormat
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document(collection = "todos")
data class TodoItem(var id: String,
                    var owner: String,
                    var done: Boolean = false,
                    var description: String,
                    var priority: Priority,
                    @JsonFormat(pattern = "yyyy-MM-dd")
                    var dueDate: LocalDate,
                    var tags: MutableList<String>) {

    constructor() : this(
            id = "",
            owner = "",
            description = "",
            priority = Priority.NONE,
            dueDate = LocalDate.now(),
            done = false,
            tags = mutableListOf<String>()
    )

    fun addTag(tag: String) {
        tags.add(tag)
    }
}