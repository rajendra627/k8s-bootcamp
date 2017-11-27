import * as actions from '../index';
import actionTypes from '../actionTypes';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const description = 'Finish docs';
    const priority = 'LOW';
    const dueDate = '2017-10-2';
    const expectedAction = {
      id: 0,
      type: actionTypes.ADD_TODO,
      description: description,
      priority: priority,
      dueDate: dueDate
    };
    expect(actions.addTodo(description, priority, dueDate)).toEqual(expectedAction)
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