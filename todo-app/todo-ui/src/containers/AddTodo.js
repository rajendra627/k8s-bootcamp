import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo } from '../actions';
import * as moment from 'moment';
import priority from '../constants/priority';

export class AddTodo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      priority: priority.LOW,
      dueDate: moment().format("YYYY-MM-DD"),
      tags: [],
    };

    this.onFormSubmit  = this.onFormSubmit.bind(this);

  }

  resetState() {
    return {
      description: '',
      priority: priority.LOW,
      dueDate: moment().format("YYYY-MM-DD"),
      tags: [],
    };
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (!this.state.description.trim()) {
      return
    }
    this.props.addTodo(this.state.description, this.state.priority, this.state.dueDate);
    this.setState(this.resetState());
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            value={this.state.description}
            placeholder="Enter Description for TODO"
            onChange={(event) => {this.setState({description: event.target.value})}}
            required
          />
          <select
            value={this.state.priority}
            onChange={(event) => {this.setState({priority: event.target.value})}}>
            <option value={priority.LOW}>LOW</option>
            <option value={priority.MEDIUM}>MEDIUM</option>
            <option value={priority.HIGH}>HIGH</option>
          </select>
          <input
            value={this.state.dueDate}
            onChange={(event) => {this.setState({dueDate: event.target.value})}}
            type="date"/>
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { addTodo }, dispatch );
}

export default connect(null, mapDispatchToProps)(AddTodo);
