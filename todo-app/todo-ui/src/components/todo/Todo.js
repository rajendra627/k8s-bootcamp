import React from 'react';
import PropTypes from 'prop-types';
import './todo.css';
import TagLabel from '../TagLabel';

const Todo = ({ onClick, done, description, priority, dueDate, tags }) => (
  <div className={"col-sm-12 todo-item " + (done ? 'done' : 'not-done') } onClick={onClick}>
    <div className="col-sm-5">
      <i className={"fa " + (done ? 'fa-check-square-o fa-lg' : 'fa-square-o fa-lg')}/>
      <span className="description">
      {description}
    </span>
    </div>
    <div className="col-sm-4">
      {
        tags.length ?
          tags.map(tag =>  <TagLabel key={tags.indexOf(tag)} tag={tag}/>)
          : ''
      }
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
  dueDate: PropTypes.string.isRequired,
  tags: PropTypes.array
};

export default Todo;