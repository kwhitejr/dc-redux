import React from 'react';
import {List} from 'immutable';

const crimeFilters = List.of('THEFT/LARCENY', 'VEHICLE BREAK-IN/THEFT', 'VANDALISM', 'MOTOR VEHICLE THEFT', 'BURGLARY');

const chambers = List.of('house', 'senate');

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {crimeFilters: crimeFilters, chambers: chambers});
  }
});