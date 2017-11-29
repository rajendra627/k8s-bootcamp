package ca.architech.todo;

import ca.architech.todo.api.Priority;
import ca.architech.todo.api.TodoItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface TodoItemRepository extends MongoRepository<TodoItem, String> {
    TodoItem findById(String id);

    List<TodoItem> findByPriority(Priority priority);

    List<TodoItem> findAllByOrderByDueDateDesc();

    @Query(value = "{ 'tags' : ?0 }")
    List<TodoItem> findByTag(String tag);

    @Query(value = "{ 'done': true }")
    List<TodoItem> findDone();

    @Query(value = "{ 'done': false }")
    List<TodoItem> findNotDone();
}