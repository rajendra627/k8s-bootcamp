import * as actions from '../index';
import actionTypes from '../actionTypes';
import priority from '../../constants/priority';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const description = 'Finish docs';
    const toDopriority = priority.LOW;
    const dueDate = '2017-10-2';
    const expectedAction = {
      id: 0,
      type: actionTypes.ADD_TODO,
      description: description,
      priority: toDopriority,
      dueDate: dueDate
    };
    expect(actions.addTodo(description, toDopriority, dueDate)).toEqual(expectedAction)
  });

  it('should create an action to toggle a todo', () => {
    const id = 0;
    const expectedAction = {
      id: 0,
      type: actionTypes.TOGGLE_TODO,
    };
    expect(actions.toggleTodo(id)).toEqual(expectedAction)
  });

  it('should create an action to set the visibility filter', () => {
    const filter = 'SHOW_ALL';
    const expectedAction = {
      filter,
      type: actionTypes.SET_VISIBILITY_FILTER
    };

    expect(actions.setVisibilityFilter(filter)).toEqual(expectedAction)
  });
});