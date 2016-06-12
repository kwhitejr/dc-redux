import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';

import config from '../../config';
import senateGeoJSON from '../assets/hssd.geo.json';

const _config = {
  params: {
    center: [21.477351, -157.962799],
    zoomControl: false,
    zoom: 10,
    // maxZoom: 19,
    // minZoom: 11,
    scrollWheelZoom: false,
    legends: true,
    infoControl: false,
    attributionControl: true
  },
  tileLayer: {
    url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    params: {
      minZoom: 5,
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.light',
      accessToken: config.accessToken
    }
  },
  colors: {
    house: {
      level1: '#eff3ff',
      level2: '#c6dbef',
      level3: '#9ecae1',
      level4: '#6baed6',
      level5: '#3182bd',
      level6: '#08519c'
    },
    senate: {
      level1: '#fee5d9',
      level2: '#fcbba1',
      level3: '#fc9272',
      level4: '#fb6a4a',
      level5: '#de2d26',
      level6: '#a50f15'
    }
  },
  crimeLevels: {
    house: {
      level1: 1,
      level2: 100,
      level3: 250,
      level4: 500,
      level5: 800,
      level6: 1500
    },
    senate: {
      level1: 1,
      level2: 100,
      level3: 250,
      level4: 500,
      level5: 1000,
      level6: 2500
    }
  }
};

const mapStyle = {
  height: '400px',
  width: '100%'
};

export default React.createClass({

  componentDidMount: function () {
    this.createMap();
  },

  createMap: function () {
    const mapElement = ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
    console.log(typeof(mapElement));
    const map = L.map(mapElement, _config.params);

    L.tileLayer(_config.tileLayer.url, _config.tileLayer.params).addTo(map);
  },

  render: function () {

    return <div className="map" style={mapStyle}>
      <div id="map"  style={mapStyle}>
      </div>
    </div>
  }
});