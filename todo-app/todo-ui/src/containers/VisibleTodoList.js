import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/todoList/TodoList';
import filter from '../constants/filter';
import * as moment from 'moment'


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

const filterPastDueTodos = (todos) => {
  return todos.filter( todo => moment(todo.dueDate).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD") )
};

const filterUpcomingTodos = (todos) => {
  return todos.filter( todo => moment(todo.dueDate).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD") )
};

const filterTodayTodos = (todos) => {
  return todos.filter( todo => moment(todo.dueDate).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") )
};

const mapStateToProps = state => {
  return {
    pastDueTodos: filterPastDueTodos(state.todos),
    upcomingTodos: filterUpcomingTodos(state.todos),
    todayTodos: filterTodayTodos(state.todos)
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