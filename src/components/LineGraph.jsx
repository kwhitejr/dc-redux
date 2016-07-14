import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';

const Line = React.createClass({

  propTypes: {
    path:         React.PropTypes.string.isRequired,
    stroke:       React.PropTypes.string,
    fill:         React.PropTypes.string,
    strokeWidth:  React.PropTypes.number
  },

  getDefaultProps() {
    return {
      stroke:       'blue',
      fill:         'none',
      strokeWidth:  5
    };
  },

  render() {
    let { path, stroke, fill, strokeWidth } = this.props;
    return (
      <path
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        />
    );
  }
});

const DataSeries = React.createClass({

  propTypes: {
    colors:             React.PropTypes.array,
    data:               React.PropTypes.array,
    interpolationType:  React.PropTypes.string,
    xScale:             React.PropTypes.func,
    yScale:             React.PropTypes.func
  },

  getDefaultProps() {
    return {
      data:               [],
      interpolationType:  'cardinal',
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
    let { data, colors, xScale, yScale, interpolationType } = this.props;

    let line = d3.svg.line()
      // .interpolate(interpolationType)
      .x((d) => { return xScale(new Date(d.to_timestamp)); })
      .y((d) => { return yScale(d.count); });

    let dataGroup = d3.nest()
      .key(function(d) {
        return d.type;
      })
      .entries(data);

    let lines = dataGroup.map((series, id) => {
      return (
        <Line
          path={line(series.values)}
          stroke={colors[id]}
          key={id}
        />
      );
    });

    return (
      <g>
        <g>{lines}</g>
      </g>
    );
  }

});

export default React.createClass({

  propTypes: {
    width:  React.PropTypes.number,
    height: React.PropTypes.number,
    data:   React.PropTypes.array.isRequired
  },

  getDefaultProps(){
    return {
      width:  500,
      height: 400
    }
  },

  render() {
    let { width, height, data } = this.props;

    let xScale = d3.time.scale()
        .domain([new Date('2015-09-24T00:00:00.000Z'), new Date('2016-03-24T00:00:00.000Z')])
        .range([0, width]);

    let maxCrime = d3.max(data, function(d) {
            return parseInt(d.count); //fuck youuuuuuu
          });
    let yScale = d3.scale.linear()
        .domain([0, maxCrime])
        .range([height, 0]);

    let xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    let yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    return (
      <div className="graph">
        <svg width={width} height={height}>
            <DataSeries
              xScale={xScale}
              yScale={yScale}
              data={data}
              width={width}
              height={height}
            />
        </svg>
      </div>
    );
  }

});