import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/addTodo/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Heading from '../containers/heading/Heading';
import Search from '../containers/search/Search';

const App = () => (
  <div>
    <Heading />
    <Search/>
    <div className="container">
      <AddTodo />
      <VisibleTodoList/>
      <Footer />
    </div>
  </div>
);

export default App