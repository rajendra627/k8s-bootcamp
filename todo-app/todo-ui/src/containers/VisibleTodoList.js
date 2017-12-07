import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../actions';
import TodoList from '../components/todoList/TodoList';
import * as moment from 'moment'

const getVisibleTodos = (todos, filter) => {
  console.log(filter);
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.done);
    case 'SHOW_ACTIVE':
      console.log('show active');
      return todos.filter(t => !t.done);
    case 'SHOW_ALL':
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
    pastDueTodos: filterPastDueTodos( getVisibleTodos(state.todos, state.visibilityFilter) ),
    upcomingTodos: filterUpcomingTodos( getVisibleTodos(state.todos, state.visibilityFilter) ),
    todayTodos: filterTodayTodos( getVisibleTodos(state.todos, state.visibilityFilter) )
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