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
        Github:
        <a
          href="https://github.com/tagraha/address-book-react"
          target="_blank"
          rel="noopener noreferrer" /** https://support.performancefoundry.com/article/186-noopener-noreferrer-on-my-links */
        >
            https://github.com/tagraha/address-book-react
        </a>
      </p>
    </div>
  );
}

export default AboutRoute;
