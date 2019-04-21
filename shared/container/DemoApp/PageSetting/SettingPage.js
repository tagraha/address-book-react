/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
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
      <React.Fragment>
        <Helmet>
          <title>Setting</title>
        </Helmet>

        <div className="row center-xs">
          <div className="col-xs-6">
            <div className="box">
              <h1>
                Setting Page
              </h1>
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
          </div>
        </div>
      </React.Fragment>
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
