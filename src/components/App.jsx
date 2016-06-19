import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import Header from './Header';
import Filter from './Filter';
import District from './District';
import Map from './Map';

import * as actionCreators from '../action_creators';

let senateCrimeData;
let houseCrimeData;

export const App = React.createClass({

  componentDidMount: function () {
    this.loadSenateCrimes();
    this.loadHouseCrimes();
  },

  componentDidUpdate: function () {
    // this.props.filterByCrimeType(this.props.crimeFilters);
  },

  loadSenateCrimes: function () {
    $.ajax({
      url: 'http://localhost:3000/senatecrimequery',
      method: "GET",
      dataType: "json",
      success: (data) => {
        senateCrimeData = data[0];
        this.props.setSenateCrimeData(senateCrimeData);
        this.props.setAllCrimeData('senate');
        this.props.filterByCrimeType();
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
          <Map {...this.props} />
        </div>
      </div>
    </div>
  }
});

function mapStateToProps(state) {
  return {
    chamber: state.get('chamber'),
    crimeFilters: state.get('crimeFilters').toJSON(),
    districtInfo: state.get('districtInfo').toJSON(),
    allCrimeData: state.get('allCrimeData'),
    crimesFilteredByDistrict: state.get('crimesFilteredByDistrict').toJSON(),
    crimesFilteredByDate: state.get('crimesFilteredByDate')
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);