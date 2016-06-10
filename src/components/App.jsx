import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import Filter from './Filter';
import District from './District';

import * as actionCreators from '../action_creators';

export const App = React.createClass({
  render: function() {
    return <div>
      <section>
        <Filter {...this.props} />
        <District {...this.props} />
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