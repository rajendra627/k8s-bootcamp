import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSearchFilter } from '../../actions/index';
import TAG_LIST from '../../constants/tagList';
import TagToggle from '../../components/tagToggle/TagToggle';


export class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm: '',
      tags: []
    };

    this.onSearchInputChange  = this.onSearchInputChange.bind(this);
    this.onUpdateFormFilters  = this.onUpdateFormFilters.bind(this);
    this.onToggleChange  = this.onToggleChange.bind(this);
  }

  onUpdateFormFilters(event) {
    event.preventDefault();
    this.props.setSearchFilter({searchTerm: this.state.searchTerm, tags:this.state.tags});
  }

  onToggleChange(tag){
    if(this.state.tags.indexOf(tag) === -1){
      this.setState({tags: [...this.state.tags, tag]});
    }
    else {
      const tags = this.state.tags;
      const index = this.state.tags.indexOf(tag);
      this.setState({tags: [ ...tags.slice(0, index), ...tags.slice(index + 1) ]});
    }
  }

  onSearchInputChange(event){
    const searchTerm = event.target.value;
    this.setState({searchTerm});
    this.props.setSearchFilter({searchTerm: searchTerm, tags:[]});
  }

  render() {
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-6">
            <form onSubmit={this.onUpdateFormFilters}>
              <div data-toggle="buttons">
                {
                  Object.keys(TAG_LIST)
                    .map(tag => <TagToggle key={tag} onToggleChange={() => {this.onToggleChange(TAG_LIST[tag])} } tag={TAG_LIST[tag]}/>)
                }
              </div>
              <button className="btn btn-default" type="submit">
                Update Filters
              </button>
            </form>
          </div>
          <div className="col-xs-6">
            <div className="input-group">
              <input type="text" className="form-control" value={this.state.searchTerm} placeholder="Search" onChange={this.onSearchInputChange}/>
              <span className="input-group-addon">
                <i className="fa fa-search" aria-hidden="true"/>
              </span>
            </div>
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Dropdown
                <span className="caret"/>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li><div>Action</div></li>
                <li><div>Another action</div></li>
                <li><div>Something else here</div></li>
                <li><div>Separated link</div></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators( { setSearchFilter }, dispatch );
}

export default connect(null, mapDispatchToProps)(Search);
