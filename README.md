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

## Demo
<a target="_blank" href="https://address-book-react.herokuapp.com/">https://address-book-react.herokuapp.com/</a>


### changelog
<a href="https://github.com/tagraha/address-book-react/blob/master/CHANGELOG.md">Changelog</a>

Q: are we using React Suspense or React Lazy feature?
A: No, it's a great feature though. Unfortunately, React Suspense is not support for Server Side Rendering at the moment
you can refer to this doc https://reactjs.org/docs/code-splitting.html

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

at this point make `.env` file on your root directory. you can copy it from `.env_example` file. after that you can continue run npm script below to start development environtment.

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

The DemoApp
-----------
Notice the `/shared` folder. that's where the DemoApp is located; inside `/container` folder. For the folder name, why is it called `shared`? because it will be used for compiling 2 bundles. `Server side` and `Client side`. `shared` folder is containing redux, components, container, and helper/utils. now let's take a look for `container` folder, shall we?

The main DemoApp is located in `/container/DemoApp/index.js`; we can define our initial metadata, css & js files there. and we can define all the website `route` there. it'll looks like something like this 
```javascript
<div className="main-app-container">
  <Switch>
    <Route exact path="/" component={PageHome} />
    <Route exact path="/setting" component={PageSetting} />
    <Route exact path="/about" component={PageAbout} />
    <Route component={PageError404} />
  </Switch>
</div>
```

Notice that the default website route (`/`) is rendering `PageHome` Component. here's the content of PageHome Component
```javascript
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

          <UsersCard />

        </div>
      </Fragment>
    );
  }
}

export default PageHome
```

there are no state and props on  `PageHome` component because it's a container level file. the container shouldnt have any state or props in order to avoid unnecessary re-rendering/re-painting the whole page if there's any trivial state/props change.

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
