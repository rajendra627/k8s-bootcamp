package ca.architech.todo.api

import java.util.*


class TodoItem(val id: String? = null,
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