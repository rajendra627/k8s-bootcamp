package ca.architech.todo.api

import org.springframework.data.mongodb.repository.MongoRepository

interface TodoItemRepository : MongoRepository<TodoItem, String> {
    fun findById(id: String) : TodoItem?
    fun findByPriority(priority: Priority) : List<TodoItem>?
    fun
}