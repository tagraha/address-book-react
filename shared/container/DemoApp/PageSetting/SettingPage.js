/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { loadInitialUsers, onNationalitiesChange } from './../../../redux/modules/users';
class SettingPage extends Component {
  constructor(props) {
    super(props);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.toggleNationatiesCheckbox = this.toggleNationatiesCheckbox.bind(this);
    this.updateUsersList = this.updateUsersList.bind(this);
  }

  handleCheckboxChange(evt) {
    const { value, checked } = evt.target;
    this.toggleNationatiesCheckbox(value, checked).then(() => {
      this.updateUsersList();
    });
  }

  async toggleNationatiesCheckbox(value, checked) {
    await this.props.onNationalitiesChange(value, checked);
  }

  async updateUsersList() {
    return new Promise((resolve) => {
      this.props.loadInitialUsers();
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Setting</title>
        </Helmet>
        <h3>
          Setting Page
        </h3>
        <Link to="/">Back to Users List</Link>
        <br/>
        {this.props.config.nationalities.map((value) => {
          return (
            <React.Fragment key={value.countryCode}>
              <input
                onChange={this.handleCheckboxChange}
                type="checkbox"
                id={value.countryCode}
                checked={value.isChecked}
                value={value.countryCode}
              />
              <label className="label-inline" htmlFor={value.countryCode}>{value.countryCode}</label>
              <br/>
            </React.Fragment>
          )
        })}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  config: state.users.config
});

const mapActionsToProps = {
  loadInitialUsers: loadInitialUsers,
  onNationalitiesChange: onNationalitiesChange
};

export default compose(
  connect(mapStateToProps, mapActionsToProps)
)(SettingPage);
