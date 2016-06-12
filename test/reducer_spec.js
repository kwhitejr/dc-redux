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

  it('handles CHANGE_DISTRICT', () => {
    const initialState = fromJS({
      chamber: 'senate',
      districtInfo: {
        legislator_number: 28,
        legislator_year: "2016",
        legislator_type: "State",
        politician_officetype: "Senate",
        politician_position: "Senator",
        politician_party: "Democrat",
        politician_picture: "http://www.capitol.hawaii.gov/Members/Images/RepSenPhotos/baker.jpg",
        politician_firstname: "Rosalyn",
        politician_lastname: "Baker",
        address_street: "Hawaii State Capitol",
        address_room: "230",
        contact_phone: "808-586-6070",
        contact_fax: "808-586-6071",
        contact_email: "senbaker@Capitol.hawaii.gov",
        contact_links: "http://www.capitol.hawaii.gov/memberpage.aspx?member=baker&year=2016",
        district_number: 6,
        district_area: [
          "Makena",
          "Wailea",
          "Kihei",
          "Ma‘alaea",
          "Lahaina",
          "Ka‘anapali",
          "Napili",
          "Kapalua"
        ],
        committees: [
          "Commerce, Consumer Protection, and Health",
          "Economic Development, Environment, and Technology",
          "Public Safety, Intergovernmental, and Military Affairs"
        ]
      }
    });
    const action = {
      type: 'CHANGE_DISTRICT',
      newDistrict: {
        legislator_number: 28,
        legislator_year: "2016",
        legislator_type: "State",
        politician_officetype: "Senate",
        politician_position: "Senator",
        politician_party: "Democrat",
        politician_picture: "http://www.capitol.hawaii.gov/Members/Images/RepSenPhotos/chun_oakland.jpg",
        politician_firstname: "Suzanne",
        politician_lastname: "Chun Oakland",
        address_street: "Hawaii State Capitol",
        address_room: "226",
        contact_phone: "808-586-6130",
        contact_fax: "808-586-6131",
        contact_email: "senchunoakland@capitol.hawaii.gov",
        contact_links: "http://www.capitol.hawaii.gov/memberpage.aspx?member=chunoakland&year=2016",
        district_number: 13,
        neighborhoods: [
          "Liliha",
          "Palama",
          "Iwilei",
          "Kalihi",
          "Nu‘uanu",
          "Pacific Heights",
          "Pauoa",
          "Lower Tantalus",
          "Downtown"
        ],
        politician_committee: [
          "Human Services",
          "Education",
          "Transportation and Energy",
          "Ways and Means"
        ]
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      chamber: 'senate',
      districtInfo: {
        legislator_number: 28,
        legislator_year: "2016",
        legislator_type: "State",
        politician_officetype: "Senate",
        politician_position: "Senator",
        politician_party: "Democrat",
        politician_picture: "http://www.capitol.hawaii.gov/Members/Images/RepSenPhotos/chun_oakland.jpg",
        politician_firstname: "Suzanne",
        politician_lastname: "Chun Oakland",
        address_street: "Hawaii State Capitol",
        address_room: "226",
        contact_phone: "808-586-6130",
        contact_fax: "808-586-6131",
        contact_email: "senchunoakland@capitol.hawaii.gov",
        contact_links: "http://www.capitol.hawaii.gov/memberpage.aspx?member=chunoakland&year=2016",
        district_number: 13,
        neighborhoods: [
          "Liliha",
          "Palama",
          "Iwilei",
          "Kalihi",
          "Nu‘uanu",
          "Pacific Heights",
          "Pauoa",
          "Lower Tantalus",
          "Downtown"
        ],
        politician_committee: [
          "Human Services",
          "Education",
          "Transportation and Energy",
          "Ways and Means"
        ]
      }
    }));
  });

});