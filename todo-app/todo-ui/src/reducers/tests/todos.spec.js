import todos from '../todos';
import actionTypes from '../../actions/actionTypes';
import priority from '../../constants/priority';
describe('Todos Reducer', ()=>{
  it('Should handle undefined initial state', () => {
    const finalState = [];
    const initialState = undefined;
    const action = {
      type: 'INIT',
    };
    const actualState = todos(initialState, action);

    expect(actualState).toEqual(finalState);
  });

  it('Should handle adding a todo', () => {
    const initialState = undefined;
    const todo = {
      id: 1,
      description: 'todo',
      priority: priority.HIGH,
      dueDate: '2017-12-10',
      completed: false
    };
    const finalState = [todo];
    const action ={
      type: actionTypes.ADD_TODO,
      ...todo
    };
    const actualState = todos(initialState, action);

    expect(actualState).toEqual(finalState);
  });

  it('Should handle toggling the status/completion of a todo', () => {
    const initalTodo = {
      id: 1,
      description: 'todo',
      priority: priority.HIGH,
      dueDate: '2017-12-10',
      completed: false
    };
    const completedTodo = {
      id: 1,
      description: 'todo',
      priority: priority.HIGH,
      dueDate: '2017-12-10',
      completed: true
    };
    const initialState = [initalTodo];
    const finalState = [completedTodo];
    const action ={
      type: actionTypes.TOGGLE_TODO,
      id: 1
    };
    const actualState = todos(initialState, action);

    expect(actualState).toEqual(finalState);
  });
});