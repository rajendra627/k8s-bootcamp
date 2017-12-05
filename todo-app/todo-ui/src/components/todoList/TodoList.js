import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../todo/Todo';
import './todoList.css';

const TodoList = ({ upcomingTodos, pastDueTodos, todayTodos, onTodoClick }) => (
  <div>
    <div className="row">
      <h1 href="#today-todo" data-toggle="collapse">Today <small>({todayTodos.length})</small></h1>
      <div id="today-todo" className="collapse in row">
        <div className="col-md-12">
          {
            todayTodos
              .map(todo => (<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo)} />))
          }
        </div>
      </div>
    </div>

    <div className="row">
      <h1 href="#past-due" data-toggle="collapse">Past Due <small>({pastDueTodos.length})</small></h1>
      <div id="past-due" className="collapse in row">
        <div className="col-md-12">
          {
            pastDueTodos
              .map(todo => (<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo)} />))
          }
        </div>
      </div>
    </div>

    <div className="row">
      <h1 href="#upcoming" data-toggle="collapse">Upcoming <small>({upcomingTodos.length})</small></h1>
      <div id="upcoming" className="collapse in row">
        <div className="col-md-12">
          {
            upcomingTodos
              .map(todo => (<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo)} />))
          }
        </div>
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
      dueDate: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,

  pastDueTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,

  todayTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,

  onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;