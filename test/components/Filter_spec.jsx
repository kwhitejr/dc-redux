import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';

import Filter from '../../src/components/Filter';

describe('Filter', () => {

  it('renders a series of checkboxes', () => {
    const component = renderIntoDocument(
      <Filter crimeFilters={["Theft", "Assault"]} />
    );
    const checkboxes = scryRenderedDOMComponentsWithTag(component, 'label');

    expect(checkboxes.length).to.equal(2);
    expect(checkboxes[0].textContent).to.equal('Theft');
    expect(checkboxes[1].textContent).to.equal('Assault');
  });

  it('should invoke callback when checked', () => {
    let checked;
    const toggleFilter = (entry) => checked = entry;
    const component = renderIntoDocument(
      <Filter crimeFilters={["Theft", "Assault"]}
              toggleFilter={toggleFilter} />
    );
    const checkboxes = scryRenderedDOMComponentsWithTag(component, 'input');

    expect(checkboxes.length).to.equal(2);
    Simulate.change(checkboxes[0]);
    expect(checked).to.equal('Theft');

  });

});