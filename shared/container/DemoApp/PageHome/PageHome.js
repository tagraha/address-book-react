import React, { PureComponent, Fragment } from 'react';
import Helmet from 'react-helmet';

import UsersCard from '../../../components/UsersCard/UsersCard';
import FilterInput from '../../../components/FilterInput/FilterInput';
import config from '../../../../config';

class PageHome extends PureComponent {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <div className="homepage-wrapper">
          <div className="fixed-wrapper">
            <div className="search-wrapper">
              <FilterInput />
            </div>
          </div>

          <div className="users-list">
            <div className="row around-xs">
              <UsersCard />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PageHome;
