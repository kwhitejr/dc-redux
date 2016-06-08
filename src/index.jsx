import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';

const crimeFilters = ['THEFT/LARCENY', 'VEHICLE BREAK-IN/THEFT', 'VANDALISM', 'MOTOR VEHICLE THEFT', 'BURGLARY'];

const chambers = ['house', 'senate'];

ReactDOM.render(
  <Filter crimeFilters={crimeFilters}
          chambers={chambers} />,
  document.getElementById('app')
);