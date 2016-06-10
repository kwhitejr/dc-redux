import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {List} from 'immutable';
import {expect} from 'chai';

import District from '../../src/components/District';

describe('District', () => {

  it('renders district data', () => {
    const component = renderIntoDocument(
      <District districtInfo={
        {
          "politician_officetype": "Senate",
          "politician_position": "Senator",
          "politician_party": "Democrat",
          "politician_picture": "http://www.capitol.hawaii.gov/Members/Images/RepSenPhotos/baker.jpg",
          "politician_firstname": "Rosalyn",
          "politician_lastname": "Baker",
          "address_street": "Hawaii State Capitol",
          "address_room": "230",
          "contact_phone": "808-586-6070",
          "contact_fax": "808-586-6071",
          "contact_email": "senbaker@Capitol.hawaii.gov",
          "contact_links": "http://www.capitol.hawaii.gov/memberpage.aspx?member=baker&year=2016",
          "district_number": 6
        }
      } />
    );
    const information = scryRenderedDOMComponentsWithTag(component, 'p');

    expect(information.length).to.equal(4);
    expect(information[0].textContent).to.equal('Senator Rosalyn Baker');
    expect(information[1].textContent).to.equal('Senate District 6');
  });

});