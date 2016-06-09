import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {compose, createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducer';
// import App from './components/App';

import {AppContainer} from './components/App';

const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
const store = createStoreDevTools(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    chamber: 'house',
    crimeFilters: [
      {name: 'theft', checked: true},
      {name: 'assault', checked: true},
      {name: 'murder', checked: false}
    ]
  }
});

// const crimeFilters = ['THEFT/LARCENY', 'VEHICLE BREAK-IN/THEFT', 'VANDALISM', 'MOTOR VEHICLE THEFT', 'BURGLARY'];

// const chambers = ['house', 'senate'];

const routes = <Route>
  <Route path="/" component={AppContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);