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
    const politicalParty = districtInfo.politician_party;

    return <div className="district">
      <h4>District Information</h4>
      <div className="text-center">
        <i><p>Now previewing {districtInfo.politician_officetype} District {districtInfo.district_number}</p></i>
        <img className="thumbnail" id="photo" src={districtInfo.politician_picture} height="151" width="121" />
      </div>
      <p>{districtInfo.politician_position} {districtInfo.politician_firstname} {districtInfo.politician_lastname}</p>
      <p>E-mail: <a href={mailto}>{districtInfo.contact_email}</a></p>
      <p>Tel: {districtInfo.contact_phone}</p>
    </div>;
  }
});