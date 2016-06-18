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

    return <div className="district">
      <img id="photo" src={districtInfo.politician_picture} height="151" width="121" />
      <p>{districtInfo.politician_position} {districtInfo.politician_firstname} {districtInfo.politician_lastname}</p>
      <p>{districtInfo.politician_officetype} District {districtInfo.district_number}</p>
      <p>E-mail: <a href={mailto}>{districtInfo.contact_email}</a></p>
      <p>Tel: {districtInfo.contact_phone}</p>
    </div>;
  }
});