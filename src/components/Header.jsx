import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  // mixins: [PureRenderMixin],

  render: function() {

    return <div>
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">District Crimes</li>
            <li><input type="search" placeholder="Search" /></li>
            <li><button type="button" className="button disabled">Search</button></li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="dropdown menu" data-dropdown-menu>
            <li><a href="#">Help</a></li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>
      </div>
    </div>;
  }
});
