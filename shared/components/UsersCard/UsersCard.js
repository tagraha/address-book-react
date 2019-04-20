import React, { Component } from 'react';
import get from 'lodash.get';

class UsersCards extends Component {
  render () {
    const { user } = this.props;
    return (
      <div className="usercard-wrapper">
        <img src={get(user, 'picture.medium')} alt="username" />
        <span>
          <p>{`${get(user, 'name.title')} ${get(user, 'name.first')}`}</p>
          <p>johnDoeUsername</p>
          <p>john@email.com</p>
        </span>
      </div>
    );
  }
}

export default UsersCards;
