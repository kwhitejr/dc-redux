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
      "politician_picture": "http://www.capitol.hawaii.gov/Members/Images/RepSenPhotos/baker.jpg",
      "politician_firstname": "Rosalyn",
      "politician_lastname": "Baker",
      "address_street": "Hawaii State Capitol",
      "address_room": "230",
      "contact_phone": "808-586-6070",
      "contact_fax": "808-586-6071",
      "contact_email": "senbaker@Capitol.hawaii.gov",
      "contact_links": "http://www.capitol.hawaii.gov/memberpage.aspx?member=baker&year=2016",
      "district_number": 6,
      "district_area": [
        "Makena",
        "Wailea",
        "Kihei",
        "Ma‘alaea",
        "Lahaina",
        "Ka‘anapali",
        "Napili",
        "Kapalua"
      ],
      "committees": [
        "Commerce, Consumer Protection, and Health",
        "Economic Development, Environment, and Technology",
        "Public Safety, Intergovernmental, and Military Affairs"
      ]
    },
    senateCrimeData: [],
    houseCrimeData: [],
    allCrimeData: [],
    crimesFilteredByDistrict: [],
    crimesFilteredByDate: []
  }
});


const routes = <Route>
  <Route path="/" component={AppContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);