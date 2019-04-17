[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![Build Status](https://travis-ci.org/tagraha/address-book-react.svg?branch=master)](https://travis-ci.org/tagraha/address-book-react)
[![CircleCI](https://circleci.com/gh/tagraha/address-book-react.svg?style=svg)](https://circleci.com/gh/tagraha/address-book-react)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

<a 
target="_blank"
href="https://david-dm.org/tagraha/address-book-react">
  <img src="https://david-dm.org/tagraha/address-book-react.svg" alt="Dependency Status" />
</a>
<a 
target="_blank"
href="https://david-dm.org/tagraha/address-book-react?type=dev">
  <img src="https://david-dm.org/tagraha/address-book-react/dev-status.svg" alt="Dev Dependency Status" />
</a>

Heads up
--------
We are using react ^16.3.0. You might want to read this ([React v16.3.0: New lifecycles and context API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html)) before starting playing around with this boilerplate.

Installation
------------
```bash
git clone git@github.com:tagraha/address-book-react.git
cd address-book-react
npm install
```

at this point make `.env` file on your root directory. you can copy it from `.env_example` file.

```bash
npm run develop
```

open up your browser and navigate to `localhost:1337`

Production script command
-------------------------
```bash
npm run build
npm start
```

-------------

The App
-------
Navigate to `shared/container/DemoApp` and start exploring the code

Configuration
-------------
you can configure like disabling SSR mode, renaming service worker file etc with `value.js` file. here's the the quick look of the file

```javascript

const values = {
  clientConfigFilter: {
    // This is here as an example showing that you can expose variables
    // that were potentially provivded by the environment
    welcomeMessage: true,
    // We only need to expose the enabled flag of the service worker.
    serviceWorker: {
      enabled: true,
    },
    // We need to expose all the polyfill.io settings.
    polyfillIO: true,
    // We need to expose all the htmlPage settings.
    htmlPage: true,
  },

  // The host on which the server should run.
  host: EnvVars.string('HOST', 'localhost'),

  // The port on which the server should run.
  port: EnvVars.number('PORT', 1337),

  // The port on which the client bundle development server should run.
  clientDevServerPort: EnvVars.number('CLIENT_DEV_PORT', 7331),
  welcomeMessage: EnvVars.string('WELCOME_MSG', 'Hello world!'),

  // Disable server side rendering?
  disableSSR: false,
  browserCacheMaxAge: '365d',
}
```
