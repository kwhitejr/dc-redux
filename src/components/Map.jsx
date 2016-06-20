import React from 'react';
import ReactDOM from 'react-dom';
// import L from 'leaflet';

import config from '../../config';
import senateGeoJSON from '../assets/hssd.geo.json';
import houseGeoJSON from '../assets/hshd.geo.json';

let map;
let geoJsonLayer;
let legend;

const _config = {
  params: {
    center: [21.477351, -157.962799],
    zoomControl: false,
    zoom: 11,
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
  height: '700px',
  width: '100%'
};

export default React.createClass({

  componentDidMount: function () {
    this.createMap();
  },

  componentDidUpdate: function() {
    // this.props.filterByCrimeType(this.props.crimeFilters);
    this.addGeoJsonToMap();
    this.addLegendToMap();
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

        const districtFillColor = _this.getFillColor(districtCrimeTotal);

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

  getFillColor: function(d) {
    const colorObj = _config.colors[this.props.chamber];
    const levelsObj = _config.crimeLevels[this.props.chamber];
    return d > levelsObj["level6"] ? colorObj["level6"] :
           d > levelsObj["level5"] ? colorObj["level5"] :
           d > levelsObj["level4"] ? colorObj["level4"] :
           d > levelsObj["level3"] ? colorObj["level3"] :
           d > levelsObj["level2"] ? colorObj["level2"] :
           d > levelsObj["level1"] ? colorObj["level1"] :
                                               '#707070';
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

  addLegendToMap: function () {
    // bottom right legend panel
    if (legend) {
      map.removeControl(legend);
    }

    var _this = this;
    const levelsObj = _config.crimeLevels[this.props.chamber];

    legend = L.control({position: 'topright'});
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'legend'),
        grades = [
          0,
          levelsObj.level1,
          levelsObj.level2,
          levelsObj.level3,
          levelsObj.level4,
          levelsObj.level5,
          levelsObj.level6
        ];
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + _this.getFillColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      div.innerHTML += '<p>Total Crimes Per District</p>'
      return div;
    };
    legend.addTo(map);
  },

  render: function () {

    return <div className="map" style={mapStyle}>
      <div id="map"  style={mapStyle}>
      </div>
    </div>
  }
});