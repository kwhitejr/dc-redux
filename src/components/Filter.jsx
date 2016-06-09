import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../action_creators';

export const Filter = React.createClass({
  mxins: [PureRenderMixin],

  render: function() {
    const filters =['theft', 'assault'];
    const chambers = ['house', 'senate'];

    return <div className="filter">
      {filters.map(crime =>
        <label key={crime}>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={() => this.props.toggleFilter(crime)} />
          {crime}
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