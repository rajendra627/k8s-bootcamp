import fetch from 'cross-fetch';
import actionTypes from './actionTypes';
import BASE_API_URL from '../constants/api';

export const addTodo = () => {
  return {
    type: actionTypes.ADD_TODO,
  }
};

export const addedTodo = todo => {
  return {
    type: actionTypes.ADDED_TODO,
    todo
  }
};

export const createTodo = (todo) => {
  return function (dispatch) {
    dispatch(addTodo());
    return fetch(BASE_API_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "owner": "87897",
          "description": todo.description,
          "done": false,
          "priority": todo.priority,
          "dueDate": todo.dueDate,
          "tags": todo.tags
        }
      )
    })
      .then(response => response.json())
      .then(newTodo => dispatch(addedTodo(newTodo)))
  }
};

export const toggledTodo = id => {
  return {
    type: actionTypes.TOGGLED_TODO,
    id
  }
};

export const toggleTodo = todo => {
  return function (dispatch) {
    return fetch(BASE_API_URL, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...todo, done: !todo.done})
    }).then()
      .then(dispatch(toggledTodo(todo.id)))
  }
};

export const deletedTodo = id => {
  return {
    type: actionTypes.DELETED_TODO,
    id
  }
};

export const deleteTodo = id => {
  return function (dispatch) {
    return fetch(BASE_API_URL + '/' + id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then()
      .then(dispatch(deletedTodo(id)))
  };
};

export const setVisibilityFilter = filter => {
  return {
    type: actionTypes.SET_VISIBILITY_FILTER,
    filter
  }
};

export const requestTodos = () => {
  return {
    type: actionTypes.REQUEST_TODOS
  }
};

export const receiveTodos = (todos) => {
  return {
    type: actionTypes.RECEIVE_TODOS,
    todos: todos
  }
};

export const fetchTodos = () => {
  return function (dispatch) {
    dispatch(requestTodos());
    return fetch(BASE_API_URL)
      .then(response => response.json())
      .then(response => dispatch(receiveTodos(response)))
  }
};
