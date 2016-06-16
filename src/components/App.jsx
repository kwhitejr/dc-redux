import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import Filter from './Filter';
import District from './District';
import Map from './Map';

import * as actionCreators from '../action_creators';

let senateCrimeData;

export const App = React.createClass({

  componentDidMount: function () {
    this.loadCrimes('senate');
    // this.loadCrimes('house');
  },

  componentDidUpdate: function () {
    // this.props.filterByCrimeType(this.props.crimeFilters);
  },

  loadCrimes: function (chamber) {
    $.ajax({
      url: 'http://localhost:3000/'+chamber+'crimequery',
      method: "GET",
      dataType: "json",
      success: (data) => {
        senateCrimeData = data[0];
        console.log(senateCrimeData);
        this.props.setCrimeData(List.of(data[0]));
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
    allCrimeData: state.get('allCrimeData').toJSON()
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);