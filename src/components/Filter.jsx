import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

export const Filter = React.createClass({
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

function mapStateToProps(state) {
  return {
    chambers: state.get('chambers'),
    crimeFilters: state.get('crimeFilters')
  };
}

export const FilterContainer = connect(mapStateToProps)(Filter);