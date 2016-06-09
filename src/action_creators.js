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