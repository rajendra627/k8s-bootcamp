import actionTypes from '../actions/actionTypes';

const todos = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADDED_TODO:
      return [
        ...state,
        action.todo
      ];
    case actionTypes.TOGGLED_TODO:

      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, done: !todo.done}
          : todo
      );
    case actionTypes.RECEIVE_TODOS:
      state = action.todos;
      return state;
    default:
      return state
  }
};

export default todos