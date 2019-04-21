import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

let debounce;

import {
  updateFilterKeyword,
  onFilterChange,
  removeFilterKeyword,
} from '../../redux/modules/users';

class FilterInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleOnFilter = this.handleOnFilter.bind(this);
  }

  handleOnFilter(evt) {
    const { value } = evt.target;
    const { users, filteredUsers } = this.props;
    let filterResults = [];

    window.scrollTo(0, 0);
    clearTimeout(debounce);

    this.props.updateFilterKeyword(value);

    debounce = setTimeout(() => {
      if (value.trim().length <= 0) {
        return this.props.removeFilterKeyword();
      }

      return this.props.onFilterChange(value);
    }, 700);
  }

  render() {
    return (
      <React.Fragment>
      <label htmlFor="filter-input">Filter</label>
      <input
        id="filter-input"
        value={this.props.filterKeyword}
        type="text"
        placeholder="filter by name.. type 'le' for example (debounced for 700ms)"
        onChange={this.handleOnFilter}
      />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  filteredUsers: state.users.filteredUsers,
  filterKeyword: state.users.filterKeyword,
  users: state.users.data.results,
});

const mapActionsToProps = {
  onFilterChange,
  removeFilterKeyword,
  updateFilterKeyword,
};

export default compose(
  connect(mapStateToProps, mapActionsToProps)
)(FilterInput);
