import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../todo/Todo';
import './todoList.css';

const TodoList = ({ upcomingTodos, pastDueTodos, todayTodos, onTodoClick, onDelete }) => (
  <div className="row">
    <div className="col-xs-12">
      <h1>Today <small>({todayTodos.length})</small></h1>
          {
            todayTodos
              .map(todo =>
                (<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo)} onDelete={() => onDelete(todo.id)}/>)
              )
          }
    </div>
    <div className="col-xs-12">
      <h1>Past Due <small>({pastDueTodos.length})</small></h1>

        {
          pastDueTodos
            .map(todo =>
              (<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo)} onDelete={() => onDelete(todo.id)}/>)
            )
        }
    </div>

    <div className="col-xs-12">
      <h1 >Upcoming <small>({upcomingTodos.length})</small></h1>
        {
          upcomingTodos
            .map(todo =>
              (<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo)} onDelete={() => onDelete(todo.id)}/>)
            )
        }
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