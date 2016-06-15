export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function toggleChamber(newChamber) {
  return {
    type: 'TOGGLE_CHAMBER',
    newChamber
  };
}

export function toggleCrime(toggleCrime) {
  return {
    type: 'TOGGLE_CRIME',
    toggleCrime
  };
}

export function changeDistrict(newDistrict) {
  return {
    type: 'CHANGE_DISTRICT',
    newDistrict
  };
}

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

export function setCrimeData(data) {
  return {
    type: 'SET_CRIME_DATA',
    data
  };
}

export function filterByCrimeType(filters) {
  return {
    type: 'FILTER_CRIMES_BY_TYPE',
    filters
  };
}

export function sortCrimesByDistrict() {
  return {
    type: 'SORT_BY_DISTRICT'
  };
}