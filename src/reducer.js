import {Map, List} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

/*** Refactor store setters ***/
function setAllCrimeData(state, data) {
  return state.set('allCrimeData', data);
}

function setSenateCrimeData(state, data) {
  return state.set('senateCrimeData', data);
}

function setHouseCrimeData(state, data) {
  return state.set('houseCrimeData', data);
}
/******************************/

function getCrime(state, name) {
  return state.get('crimeFilters').findIndex(
    (crime) => crime.get('name') === name
  );
}

function toggleChamber(state, newChamber) {
  return state.set('chamber', newChamber);
}

function toggleCrime(state, crime) {
  const crimeToToggle = getCrime(state, crime);
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

//need to refactor this to separate the filter and sort functions
function filterByCrimeType(state) {
  const crimeData = state.get('allCrimeData').toJSON();
  const allCrimeData = crimeData[0];
  const checkedCrimes = [];
  const filters = state.get('crimeFilters').toJSON();
  console.log(filters);

  filters
    .filter(function (crime) {
      return crime.checked === true;
    })
    .forEach(function (crime) {
      checkedCrimes.push(crime.label);
    });


  const allCrimeDataFiltered = allCrimeData.filter(function (crimeGlob) {
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
  var result = allCrimeDataFiltered.reduce(reducer, initialValue);

  console.log(result);

  return state.set('crimesFilteredByDistrict', Map(result));

}

function sortCrimesByDate(state) {
  const crimeData = state.get('allCrimeData').toJSON();
  const allCrimeData = crimeData[0];
  const checkedCrimes = [];
  const filters = state.get('crimeFilters').toJSON();
  console.log(filters);

  filters
    .filter(function (crime) {
      return crime.checked === true;
    })
    .forEach(function (crime) {
      checkedCrimes.push(crime.label);
    });


  const allCrimeDataFiltered = allCrimeData.filter(function (crimeGlob) {
    return checkedCrimes.indexOf(crimeGlob.type) > -1;
  });

  var initialValue = {};

  var reducer = function(newObj, crimeGlob) {
    if (!newObj[crimeGlob.to_timestamp]) {
      newObj[crimeGlob.to_timestamp] = {
        total: parseInt(crimeGlob.count)
      };
    } else {
      newObj[crimeGlob.to_timestamp].total += parseInt(crimeGlob.count);
    }
    return newObj;
  };
  var result = allCrimeDataFiltered.reduce(reducer, initialValue);

  console.log(result);

  return state.set('crimesFilteredByDate', Map(result));
}

function sortCrimesByDistrict(state, filteredCrimes) {
  var initialValue = {};

  var reducer = function(newObj, crimeGlob) {
    if (!newObj[crimeGlob.district]) {
      newObj[crimeGlob.district] = {
        total: parseInt(crimeGlob.count)
      };
    } else {
      newObj[crimeGlob.district].total += parseInt(crimeGlob.count);
    }
    return newObj;
  };
  var result = filteredCrimes.reduce(reducer, initialValue);

  console.log(result);

  return state.set('crimesFilteredByDistrict', Map(result));
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'SET_ALL_CRIME_DATA':
    return setAllCrimeData(state, action.data);
  case 'SET_SENATE_CRIME_DATA':
    return setSenateCrimeData(state, action.data);
  case 'SET_HOUSE_CRIME_DATA':
    return setHouseCrimeData(state, action.data);

    // this should be a Set_Chamber
  case 'TOGGLE_CHAMBER':
    return toggleChamber(state, action.newChamber);

  case 'TOGGLE_CRIME':
    return toggleCrime(state, action.crime);
  case 'GET_DISTRICT':
    return getDistrict(state, action.districtNumber, action.chamber);
  case 'CHANGE_DISTRICT':
    return changeDistrict(state, action.newDistrict);
  case 'FILTER_CRIMES_BY_TYPE':
    return filterByCrimeType(state);

  case 'SORT_BY_DISTRICT':
    return sortCrimesByDistrict(state, action.filteredCrimes);
  case 'SORT_BY_DATE':
    return sortCrimesByDate(state);
  }
  return state;
}