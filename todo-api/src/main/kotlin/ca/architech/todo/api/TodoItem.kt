package ca.architech.todo.api

import org.springframework.data.annotation.Id
import java.util.*


class TodoItem(@Id val id: String,
               val description: String,
               val priority: Priority,
               val dueDate: Calendar?,
               var tags: MutableList<String>?) {

    init {
        if (tags == null) tags = mutableListOf<String>()
    }

    fun addTag(tag: String) {
        tags?.add(tag)
    }
}