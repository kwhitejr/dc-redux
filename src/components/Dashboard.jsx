import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';

import {BarChart} from './graphs/BarChart';

export default React.createClass({

  // mixins: [PureRenderMixin],

  getDistrictData: function () {
    const { districtInfo, crimesSortedByDate } = this.props;

    return crimesSortedByDate
      .filter((glob) => {
        return glob.district === districtInfo.district_number;
      })
      .sort((a,b) => {
        if (a.date < b.date) {
          return -1;
        } else {
          return 1;
        }
      });
  },

  render: function() {
    const { districtInfo, crimesSortedByDate, allCrimeData } = this.props;
    const mailto = "mailto:" + districtInfo.contact_email;
    const politicalParty = districtInfo.politician_party.slice(0,1) + '.';
    const selectedDistrictCrimeData = this.getDistrictData();

    return <div className="dashboard">
      <h1>Dashboard: {districtInfo.politician_officetype} District {districtInfo.district_number}</h1>
      <BarChart data={allCrimeData}
                districtInfo={districtInfo} />
    </div>;
  }
});

