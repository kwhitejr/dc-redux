import {Map} from 'immutable';
import fetch from 'isomorphic-fetch';

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

function getDistrict(state, districtNumber, chamber) {
  console.log('getDistrict triggered');
}

function changeDistrict(state, newDistrict) {
  const chamber = state.get('chamber');
  console.log('changeDistrict triggered');
  console.log(newDistrict);
  // fetch('http://localhost:3000/district', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     chamber: chamber,
  //     newDistrict: newDistrict
  //   }),
  // })
  // .then(response => {
  //   console.log(response);
  //   response.json();
  // })
  // .then(json => {
  //   console.log(json);
  //   state.set('districtInfo', Map(json));
  // });

  // dispatch({
  //   type: 'CHANGE_DISTRICT',
  //   url: 'http://localhost:3000/district',
  //   method: 'POST',
  //   body: {
  //     chamber: chamber,
  //     newDistrict: newDistrict
  //   },
  //   cb: response => console.log('finished!', response)
  // });

  // const chamber = state.get('chamber');
  // const updatedItem = districtData[chamber]
  //   .filter(district => {
  //     return district.district_number === newDistrict;
  //   })
  //   .pop();

  // console.log(updatedItem);
  return state.set('districtInfo', Map(newDistrict));
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'TOGGLE_CHAMBER':
    return toggleChamber(state, action.newChamber);
  case 'TOGGLE_CRIME':
    return toggleCrime(state, action.toggleCrime);
  case 'GET_DISTRICT':
    return getDistrict(state, action.districtNumber, action.chamber);
  case 'CHANGE_DISTRICT':
    return changeDistrict(state, action.newDistrict);
  }
  return state;
}