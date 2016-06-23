import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Header from './Header';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {

    return <div>
      <Header />
      <div className="about">
        <div className="row media-object">
          <div className="media-object-section">
            <div className="thumbnail">
              <img src="assets/team-min.jpg" height="300" width="450" title="Left to right: Chaz Leong, Theo Tran, Kevin White, Jesse Copeland (instructor)"/>
            </div>
          </div>
          <div className="media-object-section main-section">
            <h4>Meet the team!</h4>
            <p><a href="http://chazleong.com/">Chaz Leong</a>, <a href="http://theotrance.com/">Theo Tran</a>, <a href="http://kwhitejr.com">Kevin White</a>, and Fred Im (not pictured) graduated from DevLeague Coding Bootcamp in April, 2016.  Our capstone project, <i>Disctrict Crimes</i>, is intended to visualize public data in order to help the citizens of Hawaii understand troubled areas and to reach the local legislators who are best placed to effect change.</p><br />
            <p><i>District Crimes Redux</i> is a complete revision of the original project that incorporates React Redux, Webpack, ImmutableJS, MongoDB, and much more.  Further, <i>District Crimes Redux</i> fully embraces test-driven development with Mocha/Chai testing for redux reducers and React components.</p>
          </div>
        </div>
        <div className="row media-object">
          <div className="media-object-section main-section">
            <h4>What is Dead <a href="http://gameofthrones.wikia.com/wiki/House_Greyjoy">May Never Die</a></h4>
            <p>The original <i>District Crimes</i> (pictured right) was a labor of love and intense learning.  The project came together in fits and starts and, while we were extremely proud of the final product, by necessity it did not incorporate all best practices.</p><br />
            <p>After a troubled deployment that saw many broken components and long load times, I decided to rebuild the project with better tech and methodologies.  Much of our original logic was spot-on; we just needed improved implementation.  Primarily this means offloading state and most functionality to the Redux store and incorporating top-to-bottom TDD.</p>
          </div>
          <div className="media-object-section">
            <div className="thumbnail">
              <img src="assets/districtcrimes_og.png" height="300" width="450" title="Screen capture of the original District Crimes!"/>
            </div>
          </div>
        </div>
        <div className="row media-object">
          <div className="media-object-section">
            <div className="thumbnail">
              <img src="assets/team-min.jpg" height="300" width="450" title="Left to right: Chaz Leong, Theo Tran, Kevin White, Jesse Copeland (instructor)"/>
            </div>
          </div>
          <div className="media-object-section main-section">
            <h4>Looking to the Future</h4>
            <p>Now that <i>District Crimes Redux</i> is on solid footing, we look forward to incorporating many of the stretch goals that did not make it into the original and/or broke upon deployment.  At the top of this list is the Info Dashboard that will present the user with a variety of data visualizations based upon the selected district's crime statistics.</p><br />
            <p>Also high on our priority list is (1) search functionality for political districts; (2) regular updates to the crime database; (3) working with Code For Hawaii in order to open up data on the sister islands and to have the island police departments report more accurate data.  Please check back periodically to view our on-going improvements!</p>
          </div>
          <h4><a href="/">Back to the Main Page</a></h4>
        </div>
      </div>
    </div>;
  }
});