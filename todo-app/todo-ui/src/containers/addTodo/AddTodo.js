import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as moment from 'moment';
import priority from '../../constants/priority';
import { createTodo } from '../../actions/index';
import './addTodo.css';

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

  resetInput() {
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
    this.props.createTodo({
      description: this.state.description,
      priority: this.state.priority,
      dueDate: this.state.dueDate
    });
    this.setState(this.resetInput());
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-inline row">
            <div className="form-group col-md-5">
              <label>Description:</label>
              <input
                id="todo-description"
                value={this.state.description}
                placeholder="Enter To Do"
                onChange={(event) => {this.setState({description: event.target.value})}}
                required
                className="form-control"
              />
            </div>
            <div className="form-group col-md-4">
              <label>Tags:</label>
              <select
                className="form-control"
                value={this.state.priority}
                onChange={(event) => {this.setState({priority: event.target.value})}}>
                <option value={priority.LOW}>LOW</option>
                <option value={priority.MEDIUM}>MEDIUM</option>
                <option value={priority.HIGH}>HIGH</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>Due:</label>
              <input
                value={this.state.dueDate}
                onChange={(event) => {this.setState({dueDate: event.target.value})}}
                type="date"
                className="form-control"/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 text-center add-todo-actions">
              <button className="btn btn-primary" type="submit">
                Done
              </button>
              <button className="btn btn-default" type="button">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { createTodo }, dispatch );
}

export default connect(null, mapDispatchToProps)(AddTodo);
