import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';
import filter from '../constants/filter';


const getVisibleTodos = (todos, selectedFilter) => {
  switch (selectedFilter) {
    case filter.SHOW_COMPLETED:
      return todos.filter(todo => todo.done);
    case filter.SHOW_ACTIVE:
      return todos.filter(todo => !todo.done);
    case filter.SHOW_ALL:
    default:
      return todos
  }
};

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: (todo) => { dispatch(toggleTodo(todo)) },
  }
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;