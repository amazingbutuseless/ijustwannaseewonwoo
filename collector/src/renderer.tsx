import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { hot } from 'react-hot-loader';

import { Provider } from 'react-redux';
import Store from './app/store';

import App from './App';

if (process.platform === 'win32') {
  document.documentElement.style.setProperty('--titleBarHeight', '0');
}

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter basename="#">
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);

export default hot(module)(App);
