import React from 'react';
import VisibleTodoList from '../containers/VisibleTodoList';
import Heading from '../containers/heading/Heading';
import Search from '../containers/search/Search';

const App = () => (
  <div>
    <Heading />
    <Search/>
    <div className="container">
      <VisibleTodoList/>
    </div>
  </div>
);

export default App