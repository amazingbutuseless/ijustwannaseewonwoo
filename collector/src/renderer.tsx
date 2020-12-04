import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from "react-hot-loader";

import App from './App';

ReactDOM.render(<App />, document.querySelector('#app'));

export default hot(module)(App);
