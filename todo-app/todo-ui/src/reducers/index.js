import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import searchFilter from './searchFilter';

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  searchFilter
});

export default todoApp;