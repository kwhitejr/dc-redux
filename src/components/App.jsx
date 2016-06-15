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
    this.loadSenateCrimes();
  },

  loadSenateCrimes: function () {
    $.ajax({
      url: 'http://localhost:3000/senatecrimequery',
      method: "GET",
      dataType: "json",
      success: (data) => {
        senateCrimeData = data;
        console.log(senateCrimeData);
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
    districtInfo: state.get('districtInfo').toJSON()
  };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);