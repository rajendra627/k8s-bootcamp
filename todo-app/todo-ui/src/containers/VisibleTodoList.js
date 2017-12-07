import { connect } from 'react-redux';
import { toggleTodo, deleteTodo } from '../actions';
import TodoList from '../components/todoList/TodoList';
import * as moment from 'moment'
import TODO_SECTION from '../constants/todoSections';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.done);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.done);
    case 'SHOW_ALL':
    default:
      return todos
  }
};

const filterTodoInSections = (todos, section) => {
  switch(section) {
    case TODO_SECTION.UPCOMING:
      return todos.filter( todo => moment(todo.dueDate).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD") );

    case TODO_SECTION.TODAY:
      return todos.filter( todo => moment(todo.dueDate).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") );

    case TODO_SECTION.PAST_DUE:
      return todos.filter( todo => moment(todo.dueDate).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD") );

    default:
      return todos
  }
};


const mapStateToProps = state => {
  return {
    pastDueTodos: filterTodoInSections( getVisibleTodos(state.todos, state.visibilityFilter), TODO_SECTION.PAST_DUE ) ,
    upcomingTodos: filterTodoInSections( getVisibleTodos(state.todos, state.visibilityFilter), TODO_SECTION.UPCOMING ),
    todayTodos: filterTodoInSections( getVisibleTodos(state.todos, state.visibilityFilter), TODO_SECTION.TODAY )
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