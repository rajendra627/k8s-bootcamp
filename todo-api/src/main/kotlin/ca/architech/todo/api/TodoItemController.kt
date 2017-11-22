package ca.architech.todo.api

import org.apache.commons.logging.LogFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.net.URI
import java.util.*
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/api/todos")
class TodoItemController(@Autowired val repository: TodoItemRepository) {

    //the !! is how we tell the compiler that we know this function will not return null
    //and if it does, we accept the consequences.  Kotlin forces us to make our intention
    //clear
    val logger = LogFactory.getLog(TodoItemController::class.java)!!

    @GetMapping(value="/healthcheck")
    fun healthCheck() : ResponseEntity<HttpStatus> {
        logger.info("Received a health-check request from K8S.")
        return ResponseEntity(HttpStatus.OK)
    }

    @GetMapping()
    fun getTodoItems() : List<TodoItem> = repository.findAll()

    @GetMapping(value="/{id}")
    fun getTodoItem(@PathVariable id: String, response: HttpServletResponse) : TodoItem? {
        logger.info("get Todo item with id: $id")
        return repository.findById(id) ?: unableToProcessRequest(404, response)

    }

    @GetMapping(value="/{priority}")
    fun getTodoItemsForPriority(@PathVariable priority: Priority, response: HttpServletResponse) : List<TodoItem>? {

        return repository.findByPriority(priority) ?: unableToProcessRequest(404, response)
    }


    @GetMapping(value="/{dueDate}")
    fun getTodoItemsByDueDate(@PathVariable dueDate: Calendar, response: HttpServletResponse) : List<TodoItem>? {
        return repository.findAll().sortedBy { it.dueDate }
    }

    fun getTodoItemsByTag(@PathVariable tags: List<String>, response: HttpServletResponse) : List<TodoItem>? {
        if(tags.isEmpty()) {
            logger.info("get todo items by tag but tag list was empty")
            return unableToProcessRequest(400, response)
        }

        logger.info("get todo items by tags: $tags")
        return repository.findByTags(tags)
    }

    @PatchMapping(value="/{id}/{tag}")
    fun addTagToItem(@PathVariable id: String, @PathVariable tag: String) : ResponseEntity<HttpStatus> {
        logger.info("Adding $tag to item with id=$id")
        try {
            val item = repository.findById(id)
            item?.addTag(tag)
            repository.save(item)
            return ResponseEntity(HttpStatus.OK)
        } catch (e: Exception) {
            logger.error("Failed add tag to item", e)
            return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    @PostMapping()
    fun createTodoItem(@RequestBody todoItem: TodoItem): ResponseEntity<HttpStatus> {
        logger.info("creating new todo item: $todoItem")
        var newItem : TodoItem? = null

        try {
            newItem = repository.insert(todoItem)
            logger.info("New todo item created with id: $newItem.id")
        } catch (e: Exception) {
            logger.error("Failed to create new item: ${todoItem.id}", e)
            return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return ResponseEntity.created(getUriForItem(newItem)).build()
    }

    @DeleteMapping("/{id}")
    fun deletePost(@PathVariable id: String): ResponseEntity<HttpStatus> =
            //when is like the Java switch but more powerful
            //notice it evaluates to an expression
            //and because it is an expression, we can use the expression body syntax
            //for functions
            when(repository.findById(id)) {
                null -> {
                    logger.info("Todo item not found for id: $id")
                    ResponseEntity(HttpStatus.NOT_FOUND)
                }
                else -> {
                    repository.delete(id)
                    logger.info("Todo item with id: $id deleted.")
                    ResponseEntity(HttpStatus.ACCEPTED)
                }
            }

    private fun <T> unableToProcessRequest(httpStatusCode: Int, response: HttpServletResponse): T? {
        logger.info("Was unable to process the request. Returning status: $httpStatusCode")
        response.status = httpStatusCode
        return null
    }

    private fun getUriForItem(item: TodoItem): URI? {
        val uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(item.id)
                .toUri()
        return uri
    }
}

