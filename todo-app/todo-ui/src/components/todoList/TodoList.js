import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../todo/Todo';
import './todoList.css';

const TodoList = ({ upcomingTodos, pastDueTodos, todayTodos, onTodoClick, onDelete }) => (
  <div>
    <div className="row">
      <h1 href="#today-todo" data-toggle="collapse">Today <small>({todayTodos.length})</small></h1>
      <div id="today-todo" className="collapse in">
          {
            todayTodos
              .map(todo =>
                (<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo)} onDelete={() => onDelete(todo.id)}/>)
              )
          }
      </div>
    </div>
    <div className="row">
      <h1 href="#past-due" data-toggle="collapse">Past Due <small>({pastDueTodos.length})</small></h1>
      <div id="past-due" className="collapse in">
        {
          pastDueTodos
            .map(todo =>
              (<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo)} onDelete={() => onDelete(todo.id)}/>)
            )
        }
      </div>
    </div>

    <div className="row">
      <h1 href="#upcoming" data-toggle="collapse">Upcoming <small>({upcomingTodos.length})</small></h1>
      <div id="upcoming" className="collapse in">
        {
          upcomingTodos
            .map(todo =>
              (<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo)} onDelete={() => onDelete(todo.id)}/>)
            )
        }
      </div>
    </div>
  </div>
);

TodoList.propTypes = {
  upcomingTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      tags: PropTypes.array
    }).isRequired
  ).isRequired,

  pastDueTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      tags: PropTypes.array
    }).isRequired
  ).isRequired,

  todayTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      tags: PropTypes.array
    }).isRequired
  ).isRequired,

  onTodoClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TodoList;