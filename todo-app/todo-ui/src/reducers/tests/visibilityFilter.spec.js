import visibilityFilter from '../visibilityFilter';
import actionTypes from '../../actions/actionTypes';

describe('Visibilty Reducer', () => {
  it('Should handle undefined initial state', () => {
    const finalState = 'SHOW_ALL';
    const initialState = undefined;
    const action = {
      type: 'INIT',
    };
    const actualState = visibilityFilter(initialState, action);

    expect(actualState).toEqual(finalState);
  });

  it('Should handle showing all', ()=>{
    const finalState = 'SHOW_ALL';
    const initialState = undefined;
    const action = {
      type: actionTypes.SET_VISIBILITY_FILTER,
      filter: 'SHOW_ALL'
    };

    const actualState = visibilityFilter(initialState, action);

    expect(actualState).toEqual(finalState);
  });

  it('Should handle filtering by active state', ()=>{
    const finalState = 'SHOW_ACTIVE';
    const initialState = undefined;
    const action = {
      type: actionTypes.SET_VISIBILITY_FILTER,
      filter: 'SHOW_ACTIVE'
    };

    const actualState = visibilityFilter(initialState, action);

    expect(actualState).toEqual(finalState);
  });

  it('Should handle filtering by completed state', ()=>{
    const finalState = 'SHOW_COMPLETED';
    const initialState = undefined;
    const action = {
      type: actionTypes.SET_VISIBILITY_FILTER,
      filter: 'SHOW_COMPLETED'
    };

    const actualState = visibilityFilter(initialState, action);

    expect(actualState).toEqual(finalState);
  })
});