import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {List} from 'immutable';
import {expect} from 'chai';

import Map from '../../src/components/Map';

describe('Map', () => {

  it('renders a map', () => {
    const component = renderIntoDocument(
      <Map />
    );
    const map = scryRenderedDOMComponentsWithTag(component, 'div');

    expect(map.length).to.equal(1);
    expect(map[0]).to.equal();
  });

  it('should invoke callback when a district is checked', () => {
    let checked;
    const toggleCrime = (entry) => checked = entry;
    const component = renderIntoDocument(
      <Map  />
    );
    const checkboxes = scryRenderedDOMComponentsWithTag(component, 'input');

    expect(checkboxes.length).to.equal(2);
    Simulate.change(checkboxes[0]);
    expect(checked).to.equal('theft');

  });

});