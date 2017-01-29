import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import Main from './container/index.js';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Main);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./container/index.js', () => {
    const newMain = require('./container/index.js').default;
    render(newMain);
  });
}