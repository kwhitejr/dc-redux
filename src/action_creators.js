export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function setAllCrimeData(chamber) {
  return {
    type: 'SET_ALL_CRIME_DATA',
    chamber
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

export function setChamber(newChamber) {
  return {
    type: 'SET_CHAMBER',
    newChamber
  };
}

export function toggleCrime(crime) {
  return {
    type: 'TOGGLE_CRIME',
    crime
  };
}

export function setChamberAndCrimeData(chamber) {
  return (dispatch) => {

    dispatch(setChamber(chamber));

    dispatch(setAllCrimeData(chamber));

    dispatch(filterByCrimeType());

    dispatch(sortCrimesByDate());
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

export function requestDistrict() {
  return {
    type: 'REQUEST_DISTRICT',
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

  return (dispatch) => {
    dispatch(requestDistrict());

    fetch('http://159.203.226.209:3000/district', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chamber: chamber,
        districtNumber: districtNumber
      })
    })
    .then(response => response.json())
    .then(json => dispatch(changeDistrict(json)));
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
export function sortCrimesByDistrict(filteredCrimeData) {
  return {
    type: 'SORT_BY_DISTRICT',
    filteredCrimeData
  };
}