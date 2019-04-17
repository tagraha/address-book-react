import React from 'react';
import Helmet from 'react-helmet';

import config from '../../../../config';

function PageHome() {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <h2>{config('welcomeMessage')}</h2>

      <p>this is the homepage</p>
      <i class="material-icons">
      settings
      </i>
    </div>
  );
}

export default PageHome;
