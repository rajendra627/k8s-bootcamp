package ca.architech.todo.api

import org.springframework.data.mongodb.repository.MongoRepository

interface TodoItemRepository : MongoRepository<TodoItem, String> {
    fun findById(id: String) : TodoItem?
    fun findByPriority(priority: Int) : List<TodoItem>?
    fun findByTags(tags: List<String>) : List<TodoItem>?
}