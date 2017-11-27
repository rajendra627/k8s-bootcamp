import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './components/App';
import todoApp from './reducers';

import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();