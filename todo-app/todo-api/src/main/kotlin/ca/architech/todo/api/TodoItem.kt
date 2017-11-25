package ca.architech.todo.api

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime
import java.util.*

@Document(collection = "todos")
class TodoItem(@Id var id: String?,
               var owner: String?,
               val description: String,
               @Indexed var priority: Priority,
               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) var dueDate: LocalDateTime?,
               @Indexed var tags: MutableList<String>?) {

    init {
        if (tags == null) tags = mutableListOf<String>()
    }

    fun addTag(tag: String) {
        tags?.add(tag)
    }
}