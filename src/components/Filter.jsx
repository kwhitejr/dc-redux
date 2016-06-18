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
      {this.props.crimeFilters.map(entry =>
        <label key={entry.name}>
          <input
            type="checkbox"
            defaultChecked={entry.checked}
            onChange={() => this.props.toggleAndFilter(entry.name)} />
          {entry.name}
        </label>
      )}
      {chambers.map(entry =>
        <button key={entry}
                onClick={() => this.props.toggleChamberAndCrimeData(entry)} >
          {entry}
        </button>
      )}
      <button onClick={() => this.props.sortCrimesByDate()}>Filter Crimes By Date
      </button>
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