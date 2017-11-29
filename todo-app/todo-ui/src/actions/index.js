import actionTypes from './actionTypes';

let nextTodoId = 0;

export const addTodo = (description, priority, dueDate) => {
  return {
    type: actionTypes.ADD_TODO,
    id: nextTodoId++,
    description: description,
    priority: priority,
    dueDate: dueDate
  }
};

export const setVisibilityFilter = filter => {
  return {
    type: actionTypes.SET_VISIBILITY_FILTER,
    filter
  }
};

export const toggleTodo = id => {
  return {
    type: actionTypes.TOGGLE_TODO,
    id
  }
};