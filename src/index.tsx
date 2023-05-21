import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
// import { FlagProvider } from '@unleash/proxy-client-react';
import store from './store/store';

import './index.css';
import './custom.scss';

import './bootstrap.scss';

import reportWebVitals from './reportWebVitals';

/*
 * This config is for development proxy server, to use production we need another proxy server
 * for now Unleash can be only used with development Unleash flags
 */
// const config = {
//   url: process.env.REACT_APP_UNLEASH_PROXY_HOSTNAME,
//   clientKey: process.env.REACT_APP_UNLEASH_PROXY_CLIENT_KEYS,
//   refreshInterval: 15,
//   appName: 'Default',
// };
/*
 * To use any flag from unleash you need to add
 * import { useFlag } from '@unleash/proxy-client-react';
 * and then use flag name to retreive from unleash
 * eg.
 * const journey = useFlag('JOURNEY');
 */

ReactDOM.render(
  <React.StrictMode>
    <Router getUserConfirmation={() => {}}>
      <Provider store={store}>
        <ScrollToTop>
          {/* <FlagProvider config={config}> */}
          <App />
          {/* </FlagProvider> */}
        </ScrollToTop>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
