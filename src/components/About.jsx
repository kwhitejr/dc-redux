import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {

    return <div className="about">
      <div class="media-object">
        <div class="media-object-section">
          <div class="thumbnail">
            <img src="https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg" />
          </div>
        </div>
        <div class="media-object-section main-section">
          <h4>Dreams feel real while we're in them.</h4>
          <p>I'm going to improvise. Listen, there's something you should know about me... about inception. An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you.</p>
        </div>
      </div>
    </div>;
  }
});