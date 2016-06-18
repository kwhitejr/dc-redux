import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

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
        this.props.setAllCrimeData(senateCrimeData);
        this.props.setSenateCrimeData(senateCrimeData);
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
      <section>
        <Filter {...this.props} />
        <District {...this.props} />
        <Map {...this.props} />
      </section>
    </div>
  }
});

function mapStateToProps(state) {
  return {
    chamber: state.get('chamber'),
    crimeFilters: state.get('crimeFilters').toJSON(),
    districtInfo: state.get('districtInfo').toJSON(),
    allCrimeData: state.get('allCrimeData')
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);