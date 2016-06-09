import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function toggleChamber(state, newChamber) {
  return state.set('chamber', newChamber);
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'TOGGLE_CHAMBER':
    return toggleChamber(state, action.newChamber);
  }
  return state;
}