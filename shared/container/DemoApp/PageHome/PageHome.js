import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';

import {
  loadInitialUsers,
  loadUsers,
  onFilterChange,
  removeFilterKeyword,
} from './../../../redux/modules/users';

import UsersCard from '../../../components/UsersCard/UsersCard';
import config from '../../../../config';

class PageHome extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !this.props.isLoading) {
      this.props.loadUsers();
    }
  }

  handleOnFilter(evt) {
    const { value } = evt.target;
    const { users, filteredUsers } = this.props;
    let filterResults = [];

    if (value.trim().length <= 0) {
      return this.props.removeFilterKeyword();
    }

    filterResults = this.filteredUser(users, value);
    return this.props.onFilterChange(filterResults, value);
  }

  filteredUser(usersData, keyword) {
    const userKeyword = new RegExp(keyword, "g");
    const filteredResults = [];
    usersData.filter((el) => {
      const usersDataFullName = el.name.first.concat(' ' + el.name.last);
      const match = userKeyword.test(usersDataFullName);
      if (match) {
        filteredResults.push(el);
      }
    });

    return filteredResults;
  }

  render() {
    const { users, filteredUsers, filterKeyword } = this.props;
    return (
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <div className="row center-xs">
          <div className="col-xs-6">
            <div className="box">

              <div className="row start-xs">
                <div className="col-xs-12">
                  <div className="box">
                    <h2>{config('welcomeMessage')}</h2>
                    <input value={filterKeyword} type="text" placeholder="filter" onChange={this.handleOnFilter.bind(this)} />
                    <Link to="/setting">setting</Link>
                    {users && !filteredUsers.isShown && users.map((value) => (
                      <UsersCard user={value} key={value.email} />
                    ))}

                    {filteredUsers.isShown && filteredUsers.results.map((value) => (
                      <UsersCard user={value} key={value.email} />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isError: state.users.data.isError,
  isLoading: state.users.data.isLoading,
  filteredUsers: state.users.filteredUsers,
  filterKeyword: state.users.filterKeyword,
  users: state.users.data.results,
});

const mapActionsToProps = {
  loadInitialUsers,
  loadUsers,
  onFilterChange,
  removeFilterKeyword,
};

PageHome.propTypes = {};

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withJob({
    work: (
      { match, users, loadInitialUsers }, // eslint-disable-line
    ) => {
      // naive caching
      if (users.length > 0) {
        return false
      }
      // Execute the redux-thunk powered action that returns a Promise and
      // fetches the users.
      return loadInitialUsers()
      // dont need to trigger the work. unless you need re-render the page with new data
      // ex: navigating from (current page) /article/news-1 to /article/news-2
      // we need to update with news-2 data on the same page/component right? then we need
      // to trigger the work and pass news-2 parameter; update redux state tree.
      shouldWorkAgain: (prevProps, nextProps) => {
        // eslint-disable-line
        return false;
      }
    }
  }),
)(PageHome);
