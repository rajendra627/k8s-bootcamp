import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/addTodo/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Heading from '../containers/heading/Heading';

const App = () => (
  <div>
    <Heading />
    <div className="container">
      <AddTodo />
      <VisibleTodoList/>
      <Footer />
    </div>
  </div>
);

export default App