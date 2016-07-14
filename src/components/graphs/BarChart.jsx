import React from 'react';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


export const BarChart = React.createClass({

  propTypes: {
    width:  React.PropTypes.number,
    height: React.PropTypes.number,
    data:   React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      width: 450,
      height: 300
    };
  },

  structureData(districtNumber) {
    let { data, districtInfo } = this.props;

    if (districtNumber) {
      data = data.filter( (glob) => {
        return glob.district == districtNumber;
      });
    }

    const nestedData = d3.nest()
      .key(function(d) {
        return d.type;
      })
      .rollup(function (v) {
        return d3.sum(v, function(d) {return parseInt(d.count);} );
      })
      .entries(data)
      .sort((a, b) => {
        var nameA = a.key.toLowerCase(), nameB = b.key.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0;
      });

    return nestedData;
  },

  matrixData(total, district) {
    let matrix = [];

    for (var i=0; i<total.length; i++) {
      var obj = {};
      obj['y'] = i;
      obj['x0'] = district[i].values;
      obj['x1'] = total[i].values;
      matrix.push(obj);
    }

    return matrix;

  },

  render() {
    let { width, height, districtInfo } = this.props;
    const dataTotal = this.structureData();
    const dataDistrict = this.structureData(districtInfo.district_number);

    const matrix = this.matrixData(dataTotal, dataDistrict);

    let maxCrime = d3.max(dataTotal, (d) => {return d.values});

    let xScale = d3.scale.linear()
      .domain([0, maxCrime+50])
      .range([0, width]);

    return (
      <div>
        <svg
          width={width}
          height={height} >
            <DataSeries
              xScale={xScale}
              matrix={matrix} />
        </svg>
      </div>
    );
  }
});

const DataSeries = React.createClass({
  propTypes: {
    barHeight:          React.PropTypes.number,
    colors:             React.PropTypes.array,
    matrix:             React.PropTypes.array,
    xScale:             React.PropTypes.func
  },

  getDefaultProps() {
    return {
      barHeight:          20,
      matrix:             [],
      // interpolationType:  'cardinal',
      colors:             [
                            '#b2182b',
                            '#ef8a62',
                            '#fddbc7',
                            '#d1e5f0',
                            '#67a9cf',
                            '#2166ac'
                          ]
    };
  },

  render() {
    let { barHeight, matrix, colors, xScale } = this.props;
    let barsTotal = matrix.map( (datum, index) => {

        let x = datum.x1 < 1000 ? xScale(datum.x1) + 20 : xScale(datum.x1) - 3;

        const barSettings = {
          datum: datum,
          width: xScale(datum.x1),
          height: barHeight-1,
          fill: colors[index],

        };

        const textSettings = {
          x: x,
          y: barHeight / 2,
          dy: ".35em",
        };

        return (
          <g key={index} transform={`translate(0, ${index*barHeight})`} >
            <Bar {...barSettings} />
            <text {...textSettings}>{datum.x1}</text>
          </g>
        );
      });

    let barsDistrict = matrix.map( (datum, index) => {

        const barSettings = {
          key: index,
          width: xScale(datum.x0),
          height: barHeight-1,
          fill: 'gray',
          transform: `translate(0, ${index*barHeight})`
        };

        return (
          <Bar {...barSettings} />
        );
      });

    return (
      <g>
        <g>{barsTotal}</g>
        <g>{barsDistrict}</g>
      </g>
    );
  }

});

const Bar = React.createClass({
  propTypes: {
    width:              React.PropTypes.number,
    height:             React.PropTypes.number,
    colors:             React.PropTypes.array,
    matrix:             React.PropTypes.array,
    xScale:             React.PropTypes.func
  },

  getDefaultProps() {
    return {
      matrix:               [],
    };
  },

  render() {
    return (
      <rect {...this.props} />
    );
  }
});
