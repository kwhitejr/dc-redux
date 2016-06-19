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
    zoom: 10.5,
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
  height: '600px',
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
      style: function (feature) {
        const districtNumber = feature.properties.objectid.toString();
        const districtCrimeTotal = _this.props.crimesFilteredByDistrict[districtNumber] ? _this.props.crimesFilteredByDistrict[districtNumber].total : 0;
        // console.log('crime in district: ',districtNumber,' ', districtCrimeTotal);

        const colorObj = _config.colors[_this.props.chamber];
        const levelsObj = _config.crimeLevels[_this.props.chamber];

        var districtFillColor;

        switch (true) {
          case (districtCrimeTotal >= levelsObj["level6"]):
            districtFillColor = colorObj["level6"];
            break;
          case districtCrimeTotal >= levelsObj["level5"]:
            districtFillColor = colorObj["level5"];
            break;
          case districtCrimeTotal >= levelsObj["level4"]:
            districtFillColor = colorObj["level4"];
            break;
          case districtCrimeTotal >= levelsObj["level3"]:
            districtFillColor = colorObj["level3"];
            break;
          case districtCrimeTotal >= levelsObj["level2"]:
            districtFillColor = colorObj["level2"];
            break;
          case districtCrimeTotal >= levelsObj["level1"]:
            districtFillColor = colorObj["level1"];
            break;
          default:
            districtFillColor = "#707070";
        }

        return {
          "fillColor": districtFillColor,
          "color": "#ffffff",
          "opacity": 1,
          "weight": 1,
          "fillOpacity": 0.7
        };
      }

    })
    .addTo(map);
  },

  currentChamberGeoJson: function(chamber) {
    switch (chamber) {
      case 'senate': return senateGeoJSON;
      case 'house': return houseGeoJSON;
    }
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
        color: '#72587F',
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