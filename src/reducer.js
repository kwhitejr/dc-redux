import {Map} from 'immutable';

import districtData from '../district-data.json';

function setState(state, newState) {
  return state.merge(newState);
}

function getCrime(state, name) {
  return state.get('crimeFilters').findIndex(
    (crime) => crime.get('name') === name
  );
}

function toggleChamber(state, newChamber) {
  return state.set('chamber', newChamber);
}

function toggleCrime(state, toggleCrime) {
  const crimeToToggle = getCrime(state, toggleCrime);
  const updatedItem = state.get('crimeFilters')
    .get(crimeToToggle)
    .update('checked', status => status === true ? false : true);

  return state.update('crimeFilters', crimeFilters => crimeFilters.set(crimeToToggle, updatedItem));
}

function changeDistrict(state, newDistrict) {
  const chamber = state.get('chamber');
  const updatedItem = districtData[chamber].filter(district => {
    return district.district_number === newDistrict;
  });

  console.log(updatedItem[0]);
  return state.set('districtInfo', Map(updatedItem[0]));
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'TOGGLE_CHAMBER':
    return toggleChamber(state, action.newChamber);
  case 'TOGGLE_CRIME':
    return toggleCrime(state, action.toggleCrime);
  case 'CHANGE_DISTRICT':
    return changeDistrict(state, action.newDistrict);
  }
  return state;
}