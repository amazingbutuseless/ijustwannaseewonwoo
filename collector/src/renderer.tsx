import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import { Provider } from 'react-redux';
import Store from './store';

import App from './App';

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

export default hot(module)(App);
