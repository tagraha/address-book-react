import React from 'react';
import Helmet from 'react-helmet';

function AboutRoute() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Helmet>
        <title>About</title>
      </Helmet>

      <p>
        Produced with{' '}
        <span role="img" aria-label="heart">
          ❤️
        </span>
        <br />
        <span>Tirta Nugraha (dev.nugrata@gmail.com)</span>
      </p>
    </div>
  );
}

export default AboutRoute;
