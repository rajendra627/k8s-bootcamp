import fetch from 'cross-fetch';
import actionTypes from './actionTypes';
import BASE_API_URL from '../constants/api';
import handleErrors from '../utils/fetchErrorHandler'

export const setLoading = (loading) => {
  return {
    type: actionTypes.LOADING,
    loading
  }
};

export const setError = ({error, errorMessage}) => {
  return {
    type: actionTypes.SET_ERROR,
    error,
    errorMessage
  }
};

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
    dispatch(setLoading(true));
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
      .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        }
      )
      .then(newTodo => {
        console.log(newTodo);
        dispatch(addedTodo(newTodo));
        dispatch(setLoading(false));
        dispatch(setError({error:false, errorMessage:''}))
      })
      .catch(err => {
        dispatch(setError({error: true, errorMessage: err.message}));
        dispatch(setLoading(false));
      })
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
    dispatch(setLoading(true));
    return fetch(BASE_API_URL, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...todo, done: !todo.done})
    }).then(handleErrors)
      .then(() => {
        dispatch(toggledTodo(todo.id));
        dispatch(setLoading(false));
        dispatch(setError({error:false, errorMessage:''}))
      })
      .catch(err => {
        dispatch(setError({error: true, errorMessage: err.message}));
        dispatch(setLoading(false));
      })
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
    dispatch(setLoading(true));
    return fetch(BASE_API_URL + '/' + id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(handleErrors)
      .then(() => {
          dispatch(deletedTodo(id));
          dispatch(setLoading(false));
          dispatch(setError({error:false, errorMessage:''}))
        }
      )
      .catch(err => {
        dispatch(setError({error: true, errorMessage: err.message}));
        dispatch(setLoading(false));
      })
  };
};

export const setVisibilityFilter = filter => {
  return {
    type: actionTypes.SET_VISIBILITY_FILTER,
    filter
  }
};

export const setSearchFilter = ({searchTerm, tags}) => {
  return {
    type: actionTypes.SET_SEARCH_FILTER,
    filter: {
      searchTerm,
      tags
    }
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
    dispatch(setLoading(true));
    dispatch(requestTodos());
    return fetch(BASE_API_URL)
      .then(response => response.json())
      .then(response => {
        dispatch(receiveTodos(response));
        dispatch(setLoading(false));
        dispatch(setError({error:false, errorMessage:''}))
      })
      .catch(err => {
        dispatch(setError({error: true, errorMessage: err.message}));
        dispatch(setLoading(false));
      })
  }
};
