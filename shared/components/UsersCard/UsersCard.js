import React, { Component, Fragment } from 'react';
import Highlighter from "react-highlight-words";
import get from 'lodash.get';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';

import UserModal from '../../components/UserModal/UserModal';

import {
  loadInitialUsers,
  loadUsers,
  updateFilterKeyword,
  onFilterChange,
  removeFilterKeyword,
} from '../../redux/modules/users';
import { debug } from 'util';

class UsersCards extends Component {
  constructor(props) {
    super(props);
    this.handleOnScroll = this.handleOnScroll.bind(this);

    this.state = {
      isModalDetailOpen: false,
      userDetail: {
        name: {
          first: '',
          last: ''
        },
        phone: '',
        cell: '',
        location: {
          city: '',
          postcode: '',
          state: '',
          street: '',
        }
      },
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((nextProps.users !== this.props.users) || (this.state.isModalDetailOpen !== nextState.isModalDetailOpen)) {
      return true;
    };

    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  async handleOnScroll() {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !this.props.isLoading) {
      await this.props.loadUsers();

      if (this.props.filterKeyword.trim().length > 0) {
        this.props.onFilterChange(this.props.filterKeyword);
      }
    }
  }

  handleOnModalOpen(data) {
    this.setState(() => {
      return {
        isModalDetailOpen: true,
        userDetail: data,
      };
    });
  }

  closeModal() {
    this.setState(() => {
      return { isModalDetailOpen: false };
    });
  }

  render () {
    const { filterKeyword, users } = this.props;
    return (
      <Fragment>
        <UserModal
          isModalOpen={this.state.isModalDetailOpen}
          userData={this.state.userDetail}
          closeModal={this.closeModal.bind(this)}
        />

        <div className="users-list">
          <div className="row around-xs">
            {users && users.map((value) => (
              <div className="col-xs-12 col-md-6" key={Math.random()}>
                <div className="box">
                  <div className="usercard-wrapper">
                    <img src={get(value, 'picture.medium')} alt="username" />
                    <span className="usercard-body">
                      <p>{`${get(value, 'name.title')}`}</p>
                      <a style={{ cursor: 'pointer' }} onClick={this.handleOnModalOpen.bind(this, value)}>
                        <Highlighter
                          highlightClassName="highlight-char"
                          searchWords={[filterKeyword]}
                          autoEscape={true}
                          textToHighlight={`${get(value, 'name.first')} ${get(value, 'name.last')}`}
                        />
                      </a>
                      <p>{get(value, 'location.state')}</p>
                      <p>{get(value, 'email')}</p>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isError: state.users.data.isError,
  isLoading: state.users.data.isLoading,
  filterKeyword: state.users.filterKeyword,
  users: state.users.filteredUsers.isShown ? state.users.filteredUsers.results : state.users.data.results,
});

const mapActionsToProps = {
  loadInitialUsers,
  loadUsers,
  onFilterChange,
  removeFilterKeyword,
  updateFilterKeyword,
};

UsersCards.propTypes = {};

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
)(UsersCards);
