import React from 'react';
import { NavLink } from 'react-router-dom';

class TopNav extends React.Component {
  render() {
    return (
      <div className="topnav fixed">
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/setting" activeClassName="active">setting</NavLink>
        <NavLink to="/about" activeClassName="active">about</NavLink>
      </div>
    );
  }
};

export default TopNav;
