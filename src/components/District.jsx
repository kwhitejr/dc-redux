import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  getDistrictInfo: function() {
    return this.props.districtInfo || {};
  },

  render: function() {
    const mailto = "mailto:" + this.getDistrictInfo().contact_email;
    const districtInfo = this.getDistrictInfo();
    const politicalParty = districtInfo.politician_party.slice(0,1) + '.';

    return <div className="district">
      {this.props.isFetching
        ? <h3>Loading District...</h3>
        : <div>
            <h4>District Information</h4>
            <div className="text-center">
              <i><p>Now previewing {districtInfo.politician_officetype} District {districtInfo.district_number}</p></i>
              <img className="thumbnail" id="photo" src={districtInfo.politician_picture} height="151" width="121" />
            </div>
            <p>{districtInfo.politician_position} {districtInfo.politician_firstname} {districtInfo.politician_lastname} ({politicalParty})</p>
            <p>E-mail: <a href={mailto}>{districtInfo.contact_email}</a></p>
            <p>Tel: {districtInfo.contact_phone}</p>
            <button className="button alert expanded disabled" id="learn-more">learn more about this district</button>
          </div>
      }
    </div>;
  }
});