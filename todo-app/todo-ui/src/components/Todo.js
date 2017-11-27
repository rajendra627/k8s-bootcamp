import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, completed, description, priority, dueDate }) => (
  <li
    onClick={onClick}
    style={ {
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {description} [{priority} - {dueDate}]
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired
};

export default Todo;