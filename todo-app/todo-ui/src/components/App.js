import React from 'react';
import VisibleTodoList from '../containers/VisibleTodoList';
import Heading from '../containers/heading/Heading';
import Search from '../containers/search/Search';
import ErrorAlert from '../components/errorAlert/ErrorAlert';

const App = () => (
  <div>
    <Heading />
    <Search/>
    <div className="container">
      <VisibleTodoList/>
    </div>
    <ErrorAlert/>
  </div>
);

export default App