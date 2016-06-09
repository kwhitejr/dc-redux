import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {List} from 'immutable';
import {expect} from 'chai';

import {District} from '../../src/components/District';

describe('District', () => {

  it('renders district data', () => {
    const component = renderIntoDocument(
      <District crimeFilters={[
        {name: 'theft', checked: true},
        {name: 'assault', checked: true}]} />
    );
    const checkboxes = scryRenderedDOMComponentsWithTag(component, 'label');

    expect(checkboxes.length).to.equal(2);
    expect(checkboxes[0].textContent).to.equal('theft');
    expect(checkboxes[1].textContent).to.equal('assault');
  });

});