import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/App';
import todoApp from './reducers';

import registerServiceWorker from './registerServiceWorker';
import { fetchTodos } from './actions/index';

let store = createStore(
  todoApp,
  applyMiddleware(thunk)
);

store
  .dispatch(fetchTodos())
  .then(() => console.log(store.getState()));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


registerServiceWorker();