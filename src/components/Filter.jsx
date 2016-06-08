import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mxins: [PureRenderMixin],

  getFilters: function() {
    return this.props.crimeFilters || [];
  },

  getChambers: function() {
    return this.props.chambers || [];
  },

  render: function() {
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
      {this.getChambers().map(entry =>
        <button key={entry}
                onClick={() => this.props.toggleChamber(entry)} >
          {entry}
        </button>
      )}
    </div>;
  }
});