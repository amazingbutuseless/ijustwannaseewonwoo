import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { hot } from 'react-hot-loader';

import { Provider } from 'react-redux';
import Store from './store';

import App from './App';

ReactDOM.render(
  <Provider store={Store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.querySelector('#root')
);

export default hot(module)(App);
