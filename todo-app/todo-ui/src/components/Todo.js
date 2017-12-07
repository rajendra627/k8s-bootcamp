import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, done, description, priority, dueDate }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: done ? 'line-through' : 'none'
    }}
  >
    {description} [{priority} - {dueDate}]
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired
};

export default Todo;