import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store, { history } from './stores';
import App from './App';


const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <App />
      </div>
    </Router>
  </Provider>,
  target,
);
