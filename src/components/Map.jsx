import React from 'react';
import ReactDOM from 'react-dom';
// import L from 'leaflet';

import config from '../../config';
import senateGeoJSON from '../assets/hssd.geo.json';
import houseGeoJSON from '../assets/hshd.geo.json';

let map;
let geoJsonLayer;
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

  componentDidUpdate: function() {
    // this.props.filterByCrimeType(this.props.crimeFilters);
    this.addGeoJsonToMap();
  },

  createMap: function () {
    const mapElement = ReactDOM.findDOMNode(this).querySelectorAll('#map')[0];
    map = L.map(mapElement, _config.params);

    L.tileLayer(_config.tileLayer.url, _config.tileLayer.params).addTo(map);
  },

  addGeoJsonToMap: function () {
    if (geoJsonLayer) {
      geoJsonLayer.clearLayers();
    }

    var _this = this;

    geoJsonLayer = L.geoJson(this.currentChamberGeoJson(this.props.chamber), {
        onEachFeature: this.onEachFeature,
        // style: this.geoJsonStyle.bind(null, this) // (null, chamber)
        style: {
          "fillColor": "#707070",
          "color": "#ffffff",
          "opacity": 1,
          "weight": 1,
          "fillOpacity": 0.7
        },
        // style: function (feature) {
        //   if (_this.props.crimesFilteredByDistrict) {
        //     const val = _this.props.crimesFilteredByDistrict[feature.properties.objectid].total || undefined;
        //     console.log(val);
        //     const crimeLevels = _config.crimeLevels[this.props.chamber];
        //     const districtColor = _config.colors[this.props.chamber];

        //     switch (val) {
        //       case val >= crimeLevels.level3 : return {fillColor: districtColor.level3};
        //       case val >= crimeLevels.level1 : return {fillColor: districtColor.level1};
        //       case val === undefined : return {fillColor: '#707070'};
        //     }
        //   }
        // }
      })
      .addTo(map);
  },

  currentChamberGeoJson: function(chamber) {
    switch (chamber) {
      case 'senate': return senateGeoJSON;
      case 'house': return houseGeoJSON;
    }
  },

  geoJsonStyle: function (feature) {
    // if (!(this.props.crimesFilteredByDistrict[feature.properties.objectid])) {
    //   feature.isEmpty = true;
      console.log(feature);
      return {
        "fillColor": "#707070",
        "color": "#ffffff",
        "opacity": 1,
        "weight": 1,
        "fillOpacity": 0.7
      };
    // }
    // const totalCrimesInDistrict = this.props.crimesFilteredByDistrict[feature.properties.objectid].total;
    // console.log(totalCrimesInDistrict);
    // feature.isEmpty = false;
    // return {
    //   "fillColor": "#0000ff",
    //   "color": "#ffffff",
    //   "opacity": 1,
    //   "weight": 1,
    //   "fillOpacity": 0.7
    // };
  },

  getFillColor: function () {

    // console.log(totalCrimesInDistrict);
  },

  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.clickFunction
    });
  },

  highlightFeature: function (e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
  },

  resetHighlight: function (e) {
    geoJsonLayer.resetStyle(e.target);
  },

  clickFunction: function (e) {
    var districtNumber = e.target.feature.properties.objectid;
    var chamber = this.props.chamber;

    this.props.getDistrict(districtNumber, chamber);

  },

  render: function () {

    return <div className="map" style={mapStyle}>
      <div id="map"  style={mapStyle}>
      </div>
    </div>
  }
});