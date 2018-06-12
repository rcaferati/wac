import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Root from './containers/root';
import reducer from './reducers/reducers';

const store = createStore(reducer, window.__PRELOADED_STATE__);

delete window.__PRELOADED_STATE__;

render(
  <Provider
    store={store}
  >
    <Root />
  </Provider>,
  document.getElementById('app-root'),
);
