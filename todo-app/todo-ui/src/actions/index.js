import fetch from 'cross-fetch';
import actionTypes from './actionTypes';

let nextTodoId = 0;

export const addTodo = () => {
  return {
    type: actionTypes.ADD_TODO,
  }
};

export const addedTodo = todo => {
  console.log("added todo ", todo);
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
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": "3294786239486723498742634",
        "owner": "23123123123",
        "description": "sdfsdfsfsfs",
        "done": false,
        "priority": "HIGH",
        "dueDate": "2017-11-30",
        "tags": [
          "sdfsdfsdf"
        ]
      })
    })
      .then(response => response.json())
      .then(response => {
        dispatch(addedTodo());
        dispatch(fetchTodos());
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
