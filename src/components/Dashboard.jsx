import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    const districtInfo = this.props.districtInfo;
    const mailto = "mailto:" + districtInfo.contact_email;
    const politicalParty = districtInfo.politician_party.slice(0,1) + '.';

    return <div className="dashboard">
      <h1>Dashboard: {districtInfo.politician_officetype} District {districtInfo.district_number}</h1>
      <h3>Dropdown with District Choices</h3>
      <img className="thumbnail" id="dashboard-photo" src={districtInfo.politician_picture} height="300" width="240" />
      <p>{districtInfo.politician_position} {districtInfo.politician_firstname} {districtInfo.politician_lastname} ({politicalParty})</p>
      <p>E-mail: <a href={mailto}>{districtInfo.contact_email}</a></p>
      <p>Tel: {districtInfo.contact_phone}</p>
    </div>;
  }
});