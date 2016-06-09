import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../action_creators';

export const Filter = React.createClass({
  mxins: [PureRenderMixin],

  getFilters: function() {
    return this.props.crimeFilters || [];
  },

  render: function() {
    const chambers = ['house', 'senate'];

    return <div className="filter">
      {this.getFilters().map(entry =>
        <label key={entry}>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={() => this.props.toggleFilter(entry)} />
          {entry}
        </label>
      )}
      {chambers.map(entry =>
        <button key={entry}
                onClick={() => this.props.toggleChamber(entry)} >
          {entry}
        </button>
      )}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    chambers: state.get('chambers'),
    crimeFilters: state.get('crimeFilters')
  };
}

export const FilterContainer = connect(mapStateToProps, actionCreators)(Filter);