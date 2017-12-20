package ca.architech.todo.api;

import ca.architech.todo.models.TodoItem;
import ca.architech.todo.services.TodoService;
import com.microsoft.azure.spring.autoconfigure.aad.UserPrincipal;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/todos")
public class TodoItemController {
    private static final Log logger;

    static {
        logger = LogFactory.getLog(TodoItemController.class);
    }

    private TodoService todoService;

    @Autowired
    public TodoItemController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping(value = "/healthcheck")
    public ResponseEntity<HttpStatus> healthCheck() {
        logger.info("Received a health-check request from K8S.");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<TodoItem>> getTodoItems(PreAuthenticatedAuthenticationToken authToken) {
        try {
            List<TodoItem> todoItems = todoService.getTodos(getEmail(authToken));
            logger.info(String.format("Returning %d Todo items", todoItems.size()));
            return new ResponseEntity<>(todoItems, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error when fetching Todo items", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping()
    public ResponseEntity<TodoItem> updateTodoItem(@RequestBody TodoItem todoItem,
            PreAuthenticatedAuthenticationToken authToken) {
        try {
            Optional<TodoItem> updatedItem = todoService.updateTodo(todoItem, getEmail(authToken));
            if (!updatedItem.isPresent()) {
                logger.info(String.format("Todo item is not found - %s", todoItem.getId()));
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            logger.info(String.format("Todo item is successfully updated - %s", todoItem.getId()));
            return new ResponseEntity<>(updatedItem.get(), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error when updating a Todo item", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<TodoItem> createTodoItem(@RequestBody TodoItem todoItem,
            PreAuthenticatedAuthenticationToken authToken, HttpServletResponse response) {
        try {
            TodoItem newItem = todoService.createTodo(todoItem, getEmail(authToken));
            logger.info(String.format("New Todo item is successfully created - %s", newItem.getId()));
            return new ResponseEntity<>(newItem, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error when creating a new Todo item", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TodoItem> deletePost(@PathVariable String id,
            PreAuthenticatedAuthenticationToken authToken) {
        Optional<TodoItem> deletedItem = todoService.deleteTodo(id, getEmail(authToken));
        if (!deletedItem.isPresent()) {
            logger.info(String.format("Todo item is not found - %s", id));
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        logger.info(String.format("Todo item is successfully deleted - %s", id));
        return new ResponseEntity<>(deletedItem.get(), HttpStatus.ACCEPTED);
    }

    private String getEmail(PreAuthenticatedAuthenticationToken authToken) {
        UserPrincipal userPrincipal = (UserPrincipal) authToken.getPrincipal();
        Map<String, Object> claims = userPrincipal.getClaims();
        return (String) claims.get("email");
    }
}
