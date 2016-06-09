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
        crimeFilters: List.of(
          Map({name: 'theft', checked: true}),
          Map({name: 'assault', checked: true})
        )
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      chamber: 'house',
      crimeFilters: [
        {name: 'theft', checked: true},
        {name: 'assault', checked: true}
      ]
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        chamber: 'house',
        crimeFilters: [
          {name: 'theft', checked: true},
          {name: 'assault', checked: true}
        ]
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      chamber: 'house',
      crimeFilters: [
        {name: 'theft', checked: true},
        {name: 'assault', checked: true}
      ]
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        chamber: 'house',
        crimeFilters: [
          {name: 'theft', checked: true},
          {name: 'assault', checked: true}
        ]
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      chamber: 'house',
      crimeFilters: [
        {name: 'theft', checked: true},
        {name: 'assault', checked: true}
      ]
    }));
  });

  it('handles TOGGLE_CHAMBER', () => {
    const initialState = fromJS({
      chamber: 'house',
      crimeFilters: [
        {name: 'theft', checked: true},
        {name: 'assault', checked: true}
      ]
    });
    const action = {
      type: 'TOGGLE_CHAMBER',
      newChamber: 'senate'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      chamber: 'senate',
      crimeFilters: [
        {name: 'theft', checked: true},
        {name: 'assault', checked: true}
      ]
    }));
  });

  it('handles TOGGLE_CRIME true to false', () => {
    const initialState = fromJS({
      chamber: 'house',
      crimeFilters: [
        {name: 'theft', checked: true},
        {name: 'assault', checked: true}
      ]
    });
    const action = {
      type: 'TOGGLE_CRIME',
      toggleCrime: 'theft'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      chamber: 'house',
      crimeFilters: [
        {name: 'theft', checked: false},
        {name: 'assault', checked: true}
      ]
    }));
  });

  it('handles TOGGLE_CRIME false to true', () => {
    const initialState = fromJS({
      chamber: 'house',
      crimeFilters: [
        {name: 'theft', checked: false},
        {name: 'assault', checked: true}
      ]
    });
    const action = {
      type: 'TOGGLE_CRIME',
      toggleCrime: 'theft'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      chamber: 'house',
      crimeFilters: [
        {name: 'theft', checked: true},
        {name: 'assault', checked: true}
      ]
    }));
  });

});