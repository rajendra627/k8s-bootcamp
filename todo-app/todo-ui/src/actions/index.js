import fetch from 'cross-fetch';
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
  console.log("toggling todo.......", id);
  return {
    type: actionTypes.TOGGLE_TODO,
    id
  }
};

export function requestTodos() {
  return {
    type: actionTypes.REQUEST_TODOS
  }
}

export function receiveTodos(todos) {
  return {
    type: actionTypes.RECEIVE_TODOS,
    todos: todos
  }
}

export function fetchTodos() {
  return function (dispatch) {
    dispatch(requestTodos());
    return fetch('http://localhost:8080/api/todos')
      .then(response => response.json())
      .then(response => dispatch(receiveTodos(response)))
  }
}
