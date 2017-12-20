package ca.architech.todo.models;

import ca.architech.todo.models.Priority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "todos")
public class TodoItem {
    private String id;
    private String owner;
    private String description;
    private boolean done;
    private Priority priority;
    private LocalDate dueDate;
    private List<String> tags;

    public void addTag(String tag) {
        tags.add(tag);
    }

}
