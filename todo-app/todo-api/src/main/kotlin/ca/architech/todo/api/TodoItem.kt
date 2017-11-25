package ca.architech.todo.api

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.format.annotation.DateTimeFormat
import java.util.*

@Document(collection = "todos")
class TodoItem(@Id val id: String,
               val description: String,
               @Indexed var priority: Int, //High = 1, Medium = 2, Low = 3, UNDEFINED = 0
               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) var dueDate: Date?,
               @Indexed var tags: MutableList<String>?) {

    init {
        if (tags == null) tags = mutableListOf<String>()
    }

    fun addTag(tag: String) {
        tags?.add(tag)
    }
}