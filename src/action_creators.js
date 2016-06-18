export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function setAllCrimeData(data) {
  return {
    type: 'SET_ALL_CRIME_DATA',
    data
  };
}

export function setSenateCrimeData(data) {
  return {
    type: 'SET_SENATE_CRIME_DATA',
    data
  };
}

export function setHouseCrimeData(data) {
  return {
    type: 'SET_HOUSE_CRIME_DATA',
    data
  };
}

export function toggleChamber(newChamber) {
  return {
    type: 'TOGGLE_CHAMBER',
    newChamber
  };
}

export function toggleCrime(crime) {
  return {
    type: 'TOGGLE_CRIME',
    crime
  };
}

// refactor to use promises... (?)
export function toggleAndFilter(crime) {

  return (dispatch) => {

    dispatch(toggleCrime(crime));

    dispatch(filterByCrimeType());

    dispatch(sortCrimesByDate());
  };
}

export function changeDistrict(newDistrict) {
  return {
    type: 'CHANGE_DISTRICT',
    newDistrict
  };
}

// refactor this to use thunk --> 'fetchDistrict'
export function getDistrict(districtNumber, chamber) {
  return {
    type: 'GET_DISTRICT',
    url: 'http://localhost:3000/district',
    method: 'POST',
    body: {
      chamber: chamber,
      districtNumber: districtNumber
    },
    cb: (response, dispatch) => dispatch(changeDistrict(response)),
    districtNumber,
    chamber
  };
}

export function filterByCrimeType() {
    return {
      type: 'FILTER_CRIMES_BY_TYPE'
    };
}

export function sortCrimesByDate() {
    return {
      type: 'SORT_BY_DATE'
    };
}

// Currently not used; see filterByCrimeType
export function sortCrimesByDistrict(filteredCrimes) {
  return {
    type: 'SORT_BY_DISTRICT',
    filteredCrimes
  };
}