import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import Header from './Header';
import Filter from './Filter';
import District from './District';
import Map from './Map';
import Dashboard from './Dashboard';

import { DoubleBounce } from 'better-react-spinkit';

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
      url: 'http://localhost:3000/senatecrimequery',
      method: "GET",
      dataType: "json",
      success: (data) => {
        senateCrimeData = data[0];
        this.props.setSenateCrimeData(senateCrimeData);
        this.props.setAllCrimeData('senate');
        this.props.filterByCrimeType();
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
      url: 'http://localhost:3000/housecrimequery',
      method: "GET",
      dataType: "json",
      success: (data) => {
        houseCrimeData = data[0];
        this.props.setHouseCrimeData(houseCrimeData);
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
        <div className="small-3 large-3 columns leftsidebar">
          <Filter {...this.props} />
          <hr />
          <District {...this.props} />
        </div>
        <div className="small-9 large-9 columns">
          {this.state.isFetching
            ? <DoubleBounce size={50} />
            : <Map {...this.props} />
          }
        </div>
      </div>
      <div className="row fullWidth">
        <div className="small-12 column">
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
    crimeFilters: state.get('crimeFilters').toJSON(),
    districtInfo: state.get('districtInfo').toJSON(),
    allCrimeData: state.get('allCrimeData'),
    crimesFilteredByDistrict: state.get('crimesFilteredByDistrict').toJSON(),
    crimesFilteredByDate: state.get('crimesFilteredByDate')
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);