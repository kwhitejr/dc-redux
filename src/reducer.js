import {Map, List} from 'immutable';
import moment from 'moment';

function setState(state, newState) {
  return state.merge(newState);
}

/*** Refactor store setters ***/
function setAllCrimeData(state, chamber) {
  const senateCrimeData = state.get('senateCrimeData');
  const houseCrimeData = state.get('houseCrimeData');

  switch (chamber) {
    case 'senate':
      return state.set('allCrimeData', senateCrimeData);
    case 'house':
      return state.set('allCrimeData', houseCrimeData);
    default:
      return state.set('allCrimeData', []);
  }
  // return state.set('allCrimeData', data);
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

function setChamber(state, newChamber) {
  return state.set('chamber', newChamber);
}

function toggleCrime(state, crime) {
  const crimeToToggle = getCrime(state, crime);
  const updatedItem = state.get('crimeFilters')
    .get(crimeToToggle)
    .update('checked', status => status === true ? false : true);

  return state.update('crimeFilters', crimeFilters => crimeFilters.set(crimeToToggle, updatedItem));
}

function requestDistrict(state) {
  return state.set('isFetching', true);
}

function getDistrict(state, districtNumber, chamber) {
  console.log('getDistrict triggered');
}

function changeDistrict(state, newDistrictInfo) {
  const newState = Object.assign({}, state, {
    districtInfo: Map(newDistrictInfo),
    isFetching: false
  });

  return state.merge(newState);
}

//need to refactor this to separate the filter and sort functions
function filterByCrimeType(state) {
  const crimeData = state.get('allCrimeData');
  const checkedCrimes = [];
  const filters = state.get('crimeFilters').toJSON();

  filters
    .filter(function (crime) {
      return crime.checked === true;
    })
    .forEach(function (crime) {
      checkedCrimes.push(crime.label);
    });


  const allCrimeDataFiltered = crimeData.filter(function (crimeGlob) {
    return checkedCrimes.indexOf(crimeGlob.type) > -1;
  });

  /*** Reducer, sort by district ***/
  const reducedArray = allCrimeDataFiltered.reduce(function(prev, curr) {
    if (!prev[curr.district]) {
      prev[curr.district] = {
        total: parseInt(curr.count)
      };
      prev[curr.district][curr.type] = parseInt(curr.count);
    } else {
      if (!prev[curr.district][curr.type]) {
        prev[curr.district][curr.type] = parseInt(curr.count);
      } else {
        prev[curr.district][curr.type] += parseInt(curr.count);
      }
      prev[curr.district].total += parseInt(curr.count);
    }
    return prev;
  }, {});

  return state.set('crimesFilteredByDistrict', Map(reducedArray));

}

function sortCrimesByDate(state) {
  const crimeData = state.get('allCrimeData');
  const checkedCrimes = [];
  const filters = state.get('crimeFilters').toJSON();

  filters
    .filter(function (crime) {
      return crime.checked === true;
    })
    .forEach(function (crime) {
      checkedCrimes.push(crime.label);
    });


  const allCrimeDataFiltered = crimeData
    .filter(function (crimeGlob) {
      return checkedCrimes.indexOf(crimeGlob.type) > -1;
    })
    .map(function (crimeGlob)  {
      crimeGlob["date"] = moment(crimeGlob.to_timestamp).format("YYYY-MM-DD");
      return crimeGlob;
    });

  // console.log(allCrimeDataFiltered);

  const reducedArray = allCrimeDataFiltered.reduce(function(prev, curr) {
    if (!prev[curr.to_timestamp]) {
      prev[curr.to_timestamp] = {
        total: parseInt(curr.count)
      };
      prev[curr.to_timestamp][curr.type] = parseInt(curr.count);
    } else {
      if (!prev[curr.to_timestamp][curr.type]) {
        prev[curr.to_timestamp][curr.type] = parseInt(curr.count);
      } else {
        prev[curr.to_timestamp][curr.type] += parseInt(curr.count);
      }
      prev[curr.to_timestamp].total += parseInt(curr.count);
    }
    return prev;
  }, {});


  let dates = [];
  for (var i in reducedArray) {
    const newKey = moment(i).format("YYYY-MM-DD");
    dates.push(newKey);
  }

  const periodStart = dates[0];
  const periodEnd = dates[dates.length-1];

  const newState = Object.assign({}, state, {
    crimesSortedByDate: allCrimeDataFiltered,
    totalCrimesByDate: reducedArray,
    periodStart: periodStart,
    periodEnd: periodEnd
  });

  return state.merge(newState);
}

function sortCrimesByDistrict(state, filteredCrimeData) {
  const reducedArray = filteredCrimeData.reduce(function(prev, curr) {
    if (!prev[curr.district]) {
      prev[curr.district] = {
        total: parseInt(curr.count)
      };
    } else {
      prev[curr.district].total += parseInt(curr.count);
    }
    return prev;
  }, {});

  return state.set('crimesSortedByDistrict', Map(reducedArray));
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'SET_ALL_CRIME_DATA':
    return setAllCrimeData(state, action.chamber);
  case 'SET_SENATE_CRIME_DATA':
    return setSenateCrimeData(state, action.data);
  case 'SET_HOUSE_CRIME_DATA':
    return setHouseCrimeData(state, action.data);

    // this should be a Set_Chamber
  case 'SET_CHAMBER':
    return setChamber(state, action.newChamber);

  case 'TOGGLE_CRIME':
    return toggleCrime(state, action.crime);
  case 'REQUEST_DISTRICT':
    return requestDistrict(state);
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