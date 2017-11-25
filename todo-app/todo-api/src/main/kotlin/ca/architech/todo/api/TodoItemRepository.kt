package ca.architech.todo.api

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface TodoItemRepository : MongoRepository<TodoItem, String> {
    fun findById(id: String) : TodoItem?
    fun findByPriority(priority: Priority) : List<TodoItem>?
    fun findAllByOrderByDueDateDesc() : List<TodoItem>?

    @Query(value="{ 'tags' : ?0 }")
    fun findByTag(tag: String) : List<TodoItem>?
}