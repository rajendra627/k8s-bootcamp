package ca.architech.todo.api

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDate

@Document(collection = "todos")
class TodoItem(@Id var id: String?,
               @Indexed var owner: String?,
               var description: String,
               @Indexed var priority: Priority,
               var done: Boolean,
               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) var dueDate: LocalDate?,
               @Indexed var tags: MutableList<String>?) {

    init {
        if (tags == null) tags = mutableListOf<String>()
    }

    fun addTag(tag: String) {
        tags?.add(tag)
    }
}