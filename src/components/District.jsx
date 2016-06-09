import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../action_creators';

export default React.createClass({
  mxins: [PureRenderMixin],

  getFilters: function() {
    return this.props.crimeFilters || [];
  },

  render: function() {
    const chambers = ['house', 'senate'];

    return <div className="filter">
      {this.props.crimeFilters.map(entry =>
        <label key={entry.name}>
          <input
            type="checkbox"
            defaultChecked={entry.checked}
            onChange={() => this.props.toggleCrime(entry.name)} />
          {entry.name}
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