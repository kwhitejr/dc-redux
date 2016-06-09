import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducer';
import App from './components/App';
import {FilterContainer} from './components/Filter';


const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    chambers: ['house', 'senate'],
    crimeFilters: ['theft', 'assault']
  }
});

// const crimeFilters = ['THEFT/LARCENY', 'VEHICLE BREAK-IN/THEFT', 'VANDALISM', 'MOTOR VEHICLE THEFT', 'BURGLARY'];

// const chambers = ['house', 'senate'];

const routes = <Route component={App}>
  <Route path="/" component={FilterContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);