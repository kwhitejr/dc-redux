import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  getFilters: function() {
    return this.props.crimeFilters || [];
  },

  render: function() {
    const chambers = ['house', 'senate'];

    return <div className="filter">
      <h4>Filter By Crime Type</h4>
      {this.props.crimeFilters.map(entry =>
        <label key={entry.name}>
          <input
            type="checkbox"
            defaultChecked={entry.checked}
            onChange={() => this.props.toggleAndFilter(entry.name)} />
          {entry.name}
        </label>
      )}
      <div className="button-group">
      {chambers.map(entry =>
        <button className="button"
                key={entry}
                onClick={() => this.props.setChamberAndCrimeData(entry)} >
          {entry}
        </button>
      )}
      </div>
    </div>;
  }
});

// function mapStateToProps(state) {
//   return {
//     chamber: state.get('chamber'),
//     crimeFilters: state.get('crimeFilters').toJSON()
//   };
// }

// export const FilterContainer = connect(mapStateToProps, actionCreators)(Filter);