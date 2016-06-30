import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import './styles.css';
import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';
// import App from './components/App';

import {AppContainer} from './components/App';
import About from './components/About';

const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
const createStoreWithMiddleWare = applyMiddleware(
  thunk,
  remoteActionMiddleware
)(createStoreDevTools);
const store = createStoreWithMiddleWare(reducer);

store.dispatch({
  type: 'SET_STATE',
  state: {
    chamber: 'senate',
    isFetching: false,
    periodStart: '2015-09-23',
    periodEnd: '2016-03-23',
    crimeFilters: [
      {name: 'Theft', label: 'THEFT/LARCENY', checked: true},
      {name: 'Vehicle Break-in', label: 'VEHICLE BREAK-IN/THEFT', checked: true},
      {name: 'Vandalism', label: 'VANDALISM', checked: true},
      {name: 'Motor Vehicle Theft', label: 'MOTOR VEHICLE THEFT', checked: true},
      {name: 'Burglary', label: 'BURGLARY', checked: true}
    ],
    districtInfo: {
      "legislator_number": 28,
      "legislator_year": "2016",
      "legislator_type": "State",
      "politician_officetype": "Senate",
      "politician_position": "Senator",
      "politician_party": "Democrat",
      "politician_picture": "http://www.capitol.hawaii.gov/Members/Images/RepSenPhotos/galuteria.jpg",
      "politician_firstname": "Galuteria",
      "politician_lastname": "Brickwood",
      "address_street": "Hawaii State Capitol",
      "address_room": "223",
      "contact_phone": "808-586-6740",
      "contact_fax": "808-586-6829",
      "contact_email": "sengaluteria@capitol.hawaii.gov",
      "contact_links": "http://www.capitol.hawaii.gov/memberpage.aspx?member=galuteria&year=2016",
      "district_number": 12,
      "neighborhoods": [
        "Waikiki",
        "Ala Moana",
        "Kaka‘ako",
        "McCully",
        "Mo‘ili‘ili"
      ],
      "politician_committee": [
        "Housing",
        "Tourism and International Affairs",
        "Ways and Means"
      ],
      "chamber": "senate"
    },
    senateCrimeData: [],
    houseCrimeData: [],
    allCrimeData: [],
    crimesFilteredByDistrict: [],
    crimesSortedByDate: [],
    totalCrimesByDate: []
  }
});


const routes = <Route>
  <Route path="/" component={AppContainer} />
    <Route path="about" component={About} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);