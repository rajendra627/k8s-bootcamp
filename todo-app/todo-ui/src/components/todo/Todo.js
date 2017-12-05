import React from 'react';
import PropTypes from 'prop-types';
import './todo.css';

const Todo = ({ onClick, done, description, priority, dueDate }) => (
  <div className={"col-sm-12 todo-item " + (done ? 'done' : 'not-done') } onClick={onClick}>
    <div className="col-sm-5">
      <i className={"fa " + (done ? 'fa-check-square-o fa-lg' : 'fa-square-o fa-lg')}/>
      <span className="description">
      {description}
    </span>
    </div>
    <div className="col-sm-4">
      {/*FOR BADGES*/}
    </div>
    <div className="col-sm-3 text-right">
      <span>{dueDate}</span>
    </div>
  </div>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired
};

export default Todo;