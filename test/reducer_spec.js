import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        chambers: List.of('house', 'senate'),
        crimeFilters: List.of('theft','assault')
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      chambers: ['house', 'senate'],
      crimeFilters: ['theft', 'assault']
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        chambers: ['house', 'senate'],
        crimeFilters: ['theft', 'assault']
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      chambers: ['house', 'senate'],
      crimeFilters: ['theft', 'assault']
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        chambers: ['house', 'senate'],
        crimeFilters: ['theft', 'assault']
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      chambers: ['house', 'senate'],
      crimeFilters: ['theft', 'assault']
    }));
  });

});