import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';

const crimeFilters = ['THEFT/LARCENY', 'VEHICLE BREAK-IN/THEFT', 'VANDALISM', 'MOTOR VEHICLE THEFT', 'BURGLARY'];

ReactDOM.render(
  <Filter crimeFilters={crimeFilters} />,
  document.getElementById('app')
);