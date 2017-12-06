import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../actions';
import TodoList from '../components/todoList/TodoList';
import * as moment from 'moment'

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
    onDelete : (id) => { dispatch(deleteTodo(id)) }
  }
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;