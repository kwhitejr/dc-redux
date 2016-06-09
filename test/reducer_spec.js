import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        chamber: 'house',
        crimeFilters: List.of('theft','assault')
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      chamber: 'house',
      crimeFilters: ['theft', 'assault']
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        chamber: 'house',
        crimeFilters: ['theft', 'assault']
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      chamber: 'house',
      crimeFilters: ['theft', 'assault']
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        chamber: 'house',
        crimeFilters: ['theft', 'assault']
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      chamber: 'house',
      crimeFilters: ['theft', 'assault']
    }));
  });

  it('handles TOGGLE_CHAMBER', () => {
    const initialState = fromJS({
      chamber: 'house',
      crimeFilters: ['theft', 'assault']
    });
    const action = {
      type: 'TOGGLE_CHAMBER',
      newChamber: 'senate'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      chamber: 'senate',
      crimeFilters: ['theft', 'assault']
    }));
  });

});