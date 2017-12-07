import actionTypes from '../actions/actionTypes'
import filter from '../constants/filter';

const visibilityFilter = (state = filter.SHOW_ALL, action) => {
  switch (action.type) {
    case actionTypes.SET_VISIBILITY_FILTER:
      console.log('CALLED WITH', action.filter);
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;