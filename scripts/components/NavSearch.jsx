import React, { Component, PropTypes } from 'react';
import { KEY_ENTER } from '../constants/KeyCodes';

class NavSearch extends Component {

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.charCode === KEY_ENTER) {
      const searchText = this.searchField.value.trim().toLowerCase();
      if (searchText) this.props.handleSearch(searchText);
    }
  }

  render() {
    return (
      <div className="nav-search">
        <form>
          <i className="icon ion-search" />
          <input
            ref={(ref) => { this.searchField = ref; }}
            className="nav-search-input"
            placeholder="SEARCH"
            type="text"
            onKeyPress={this.handleKeyPress}
          />
        </form>
      </div>
    );
  }
}

NavSearch.propTypes = {
  handleSearch: PropTypes.func.isRequired
};

export default NavSearch;
