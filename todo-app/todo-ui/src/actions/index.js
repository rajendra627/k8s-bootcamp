import fetch from 'cross-fetch';
import actionTypes from './actionTypes';

let nextTodoId = 0;

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

export function createTodo(todo) {
  return function (dispatch) {
    dispatch(addTodo());
    return fetch('http://localhost:8080/api/todos', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "id": Math.floor(Math.random()*90000) + 10000,
          "owner": "87897",
          "description": todo.description,
          "done": false,
          "priority": todo.priority,
          "dueDate": todo.dueDate,
          "tags": [
            "string"
          ]
        }
      )
    })
      .then()
      .then(() => {
        dispatch(addedTodo(todo));
      })
  }
}



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

export const toggleTodo = id => {
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
