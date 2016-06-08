import React from 'react';

export default React.createClass({
  getFilters: function() {
    return this.props.crimeFilters || [];
  },

  render: function() {
    return <div className="filter">
      {this.getFilters().map(entry =>
        <label key={entry}>
          <input
            type="checkbox"
            defaultChecked={true} />
            {entry}
        </label>
      )}
    </div>;
  }
});