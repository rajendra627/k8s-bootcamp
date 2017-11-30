import actionTypes from '../actions/actionTypes';



const todos = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          description: action.description,
          priority: action.priority,
          dueDate: action.dueDate,
          done: false
        }
      ];
    case actionTypes.TOGGLE_TODO:
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