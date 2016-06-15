import {Map, List} from 'immutable';

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

function changeDistrict(state, newDistrictInfo) {
  return state.set('districtInfo', Map(newDistrictInfo));
}

function setCrimeData(state, data) {
  return state.set('allCrimeData', data);
}

function filterByCrimeType(state, filters) {
  const crimeData = state.get('allCrimeData').toJSON();
  const allCrimeData = crimeData[0];
  console.log(filters);
  const checkedCrimes = [];

  filters
    .filter(function (crime) {
      return crime.checked === true;
    })
    .forEach(function (crime) {
      checkedCrimes.push(crime.label);
    });


  const filteredCrime = allCrimeData.filter(function (crimeGlob) {
    return checkedCrimes.indexOf(crimeGlob.type) > -1;
  });

  /*** Reducer, sort by district ***/
  var initialValue = {};

  var reducer = function(newObj, crimeGlob) {
    // total crimes
    if (!newObj[crimeGlob.district]) {
      newObj[crimeGlob.district] = {
        total: parseInt(crimeGlob.count)
      };
    } else {
      newObj[crimeGlob.district].total += parseInt(crimeGlob.count);
    }
    return newObj;
  };
  var result = filteredCrime.reduce(reducer, initialValue);

  console.log(result);

  return state.set('crimesFilteredByDistrict', Map(result));

}

// function sortCrimesByDistrict(state) {
//   const filteredCrime = filterByCrimeType(state);
//   console.log(filteredCrime);
// }

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
  case 'SET_CRIME_DATA':
    return setCrimeData(state, action.data);
  case 'FILTER_CRIMES_BY_TYPE':
    return filterByCrimeType(state, action.filters);
  case 'SORT_BY_DISTRICT':
    return sortCrimesByDistrict(state);
  }
  return state;
}