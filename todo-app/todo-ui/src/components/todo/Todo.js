import React from 'react';
import PropTypes from 'prop-types';
import './todo.css';
import TagLabel from '../TagLabel';

const Todo = ({ onClick, onDelete, done, description, priority, dueDate, tags }) => (
  <div className="col-xs-12">
    <div className={"col-sm-11 col-xs-10 todo-item " + (done ? 'done' : 'not-done') } onClick={onClick}>
      <div className="col-xs-5">
        <i className={"fa " + (done ? 'fa-check-square-o fa-lg' : 'fa-square-o fa-lg')}/>
        <span className="description">
      {description}
    </span>
      </div>
      <div className="col-xs-4 text-right">
        {
          tags.length ?
            tags.map(tag =>  <TagLabel key={tags.indexOf(tag)} tag={tag}/>)
            : ''
        }
      </div>
      <div className="col-xs-3 text-right">
        <span>{dueDate}</span>
      </div>
    </div>
    <div className="col-sm-1 col-xs-2 text-right todo-action">
      <button className="btn btn-default todo-delete" type="button" onClick={onDelete}>
        <i class="fa fa-trash-o" aria-hidden="true"/>
      </button>
    </div>
  </div>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  tags: PropTypes.array
};

export default Todo;