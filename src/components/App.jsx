import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import Header from './Header';
import Filter from './Filter';
import District from './District';
import Map from './Map';
import Dashboard from './Dashboard';

import { Circle } from 'better-react-spinkit';

import * as actionCreators from '../action_creators';

let senateCrimeData;
let houseCrimeData;

export const App = React.createClass({

  getInitialState: function () {
    return {
      isFetching: false
    }
  },

  componentDidMount: function () {
    this.loadSenateCrimes();
    this.loadHouseCrimes();
  },

  componentDidUpdate: function () {
    // this.props.filterByCrimeType(this.props.crimeFilters);
  },

  loadSenateCrimes: function () {

    this.setState({
      isFetching: true
    })
    $.ajax({
      url: 'http://159.203.226.209:3000/senatecrimequery',
      method: "GET",
      dataType: "json",
      success: (data) => {
        senateCrimeData = data[0];
        this.props.setWhatever('senateCrimeData', senateCrimeData);
        this.props.setAllCrimeData('senate');
        // console.log("senate crime", this.props.senateCrimeData);
        // console.log("all crime", this.props.allCrimeData);
        this.props.filterByCrimeType();
        this.props.sortCrimesByDate();
        this.setState({
          isFetching: false
        })
      },
      failure: function (err) {
        console.log(err);
      }
    });
  },

  loadHouseCrimes: function () {
    $.ajax({
      url: 'http://159.203.226.209:3000/housecrimequery',
      method: "GET",
      dataType: "json",
      success: (data) => {
        houseCrimeData = data[0];
        this.props.setWhatever('houseCrimeData', houseCrimeData);
      },
      failure: function (err) {
        console.log(err);
      }
    });
  },

  render: function() {
    return <div>
      <Header />
      <div className="row fullWidth">
        <div className="small-3 large-3 columns leftsidebar" >
          <div>
            <Filter {...this.props} />
            <hr />
            <District {...this.props} />
          </div>
        </div>
        <div className="small-9 large-9 columns">
          {this.state.isFetching
            ? <div>
                <h2>Booting up the map...</h2>
                <Circle size={50} color="gray"/>
              </div>
            : <Map {...this.props} />
          }
          <Dashboard {...this.props} />
        </div>
      </div>
    </div>
  }
});

function mapStateToProps(state) {
  return {
    chamber: state.get('chamber'),
    isFetching: state.get('isFetching'),
    periodStart: state.get('periodStart'),
    periodEnd: state.get('periodEnd'),
    crimeFilters: state.get('crimeFilters').toJSON(),
    districtInfo: state.get('districtInfo').toJSON(),
    allCrimeData: state.get('allCrimeData'),
    crimesFilteredByDistrict: state.get('crimesFilteredByDistrict').toJSON(),
    crimesSortedByDate: state.get('crimesSortedByDate').toJSON(),
    totalCrimesByDate: state.get('totalCrimesByDate').toJSON(),
    d3colors: state.get('d3colors').toJSON()
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);


/*

*/