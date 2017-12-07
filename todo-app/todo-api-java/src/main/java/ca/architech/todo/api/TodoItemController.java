package ca.architech.todo.api;

import ca.architech.todo.TodoItemRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoItemController {

    @Autowired
    TodoItemRepository repository;
    private static final Log logger;

    static {
        logger = LogFactory.getLog(TodoItemController.class);
    }

    @GetMapping(value = "/healthcheck")
    public ResponseEntity<HttpStatus> healthCheck() {
        logger.info("Received a health-check request from K8S.");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping()
    public List<TodoItem> getTodoItems() {
        return repository.findAll();
    }

    @GetMapping(value = "/{id}")
    public TodoItem getTodoItem(@PathVariable String id, HttpServletResponse response) {
        logger.info(String.format("get Todo item with id: %s", id));
        TodoItem item = repository.findById(id);

        if (item == null) {
            response.setStatus(HttpStatus.NOT_FOUND.value());
            return null;
        }

        return item;
    }

    @GetMapping(value = "/priority/{priority}")
    List<TodoItem> getTodoItemsForPriority(@PathVariable Priority priority, HttpServletResponse response) {

        List<TodoItem> items = repository.findByPriority(priority);
        if (items == null || items.isEmpty()) {
            response.setStatus(HttpStatus.NOT_FOUND.value());
            return null;
        }

        return items;
    }


    @GetMapping(value = "/duedate/{dueDate}")
    public List<TodoItem> getTodoItemsByDueDate(@PathVariable LocalDate dueDate, HttpServletResponse response) {
        try {
            return repository.findAllByOrderByDueDateDesc();
        } catch (Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            logger.error("Failed to get items by due date", e);
            return null;
        }
    }

    @GetMapping(value = "/tags/{tag}")
    public List<TodoItem> getTodoItemsByTag(@PathVariable String tag, HttpServletResponse response) {
        if (tag.isEmpty()) {
            logger.error("invalid tag was submitted.");
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            return null;
        }

        logger.info(String.format("get todo items by tag: %s", tag));
        return repository.findByTag(tag);
    }

    @PatchMapping(value = "/{id}/{tag}")
    public ResponseEntity<HttpStatus> addTagToItem(@PathVariable String id, @PathVariable String tag) {
        logger.info(String.format("Adding %s to item with id=%s", tag, id));
        try {
            TodoItem item = repository.findById(id);
            item.addTag(tag);
            repository.save(item);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Failed to add tag to item", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping()
    public ResponseEntity<HttpStatus> updateTodoItem(@RequestBody TodoItem todoItem) {
        logger.info(String.format("updating todo item: %s", todoItem));

        try {
            TodoItem item = repository.findById(todoItem.getId());

            if (item == null)
                return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);

            repository.save(todoItem);

            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Failed to update item", e);
            return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public TodoItem createTodoItem(@RequestBody TodoItem todoItem, HttpServletResponse response) {
        logger.info(String.format("creating new todo item: %s", todoItem));
        TodoItem newItem;

        try {
            newItem = repository.insert(todoItem);
            logger.info("New todo item created with id: $newItem.id");
            return newItem;
        } catch (Exception e) {
            logger.error("Failed to create new item: ${todoItem.id}", e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletePost(@PathVariable String id) {
        //when is like the Java switch but more powerful
        //notice it evaluates to an expression
        //and because it is an expression, we can use the expression body syntax
        //for functions
        TodoItem item = repository.findById(id);

        if (item == null) {
            logger.info(String.format("Todo item not found for id: %s", id));
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            repository.delete(id);
            logger.info(String.format("TodoItem with id: %s deleted.", id));
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
    }
}


