package ca.architech.todo.api

import org.apache.commons.logging.LogFactory
import org.json.HTTP
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.util.*
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/api/todos")
class TodoItemController(@Autowired val repository: TodoItemRepository) {

    //the !! is how we tell the compiler that we know this function will not return null
    //and if it does, we accept the consequences.  Kotlin forces us to make our intention
    //clear
    val logger = LogFactory.getLog(TodoItemController::class.java)!!

    @GetMapping()
    fun getTodoItems() : List<TodoItem> = repository.findAll()

    @GetMapping(value="/{id}")
    fun getTodoItem(@PathVariable id: String, response: HttpServletResponse) : TodoItem? =
            repository.findById(id) ?: unableToProcessRequest(404, response)

    @GetMapping(value="/{priority}")
    fun getTodoItemsForPriority(@PathVariable priority: Priority, response: HttpServletResponse) : List<TodoItem>? =
            repository.findByPriority(priority) ?: unableToProcessRequest(404, response)

    @GetMapping(value="/{dueDate}")
    fun getTodoItemsByDueDate(@PathVariable dueDate: Calendar, response: HttpServletResponse) : List<TodoItem>? {
        return repository.findAll().sortedBy { it.dueDate }
    }

    fun getTodoItemsByTag(@PathVariable tags: List<String>, response: HttpServletResponse) : List<TodoItem>? {
        if(tags.isEmpty())
            return unableToProcessRequest(400, response)

        return repository.findByTags(tags)
    }


    @PostMapping()
    fun createTodoItem(@RequestBody todoItem: TodoItem): ResponseEntity<HttpStatus> {
        val newPost = repository.insert(todoItem)
        val uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newPost.id)
                .toUri()
        return ResponseEntity.created(uri).build()
    }

    @DeleteMapping("/{id}")
    fun deletePost(@PathVariable id: String): ResponseEntity<HttpStatus> =
            //when is like the Java switch but more powerful
            //notice it evaluates to an expression
            //and because it is an expression, we can use the expression body syntax
            //for functions
            when(repository.findById(id)) {
                null -> {
                    logger.debug("Post not found for id: $id")
                    ResponseEntity(HttpStatus.NOT_FOUND)
                }
                else -> {
                    repository.delete(id)
                    ResponseEntity(HttpStatus.ACCEPTED)
                }
            }

    private fun <T> unableToProcessRequest(statusCode: Int, response: HttpServletResponse): T? {
        response.status = statusCode
        return null
    }
}

