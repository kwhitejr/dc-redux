import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';

export default React.createClass({

  mixins: [PureRenderMixin],

  getDistrictData: function () {
    const { districtInfo, crimesSortedByDate } = this.props;

    return crimesSortedByDate
      .filter((glob) => {
        return glob.district === districtInfo.district_number;
      })
      .sort((a,b) => {
        if (a.date < b.date) {
          return -1;
        } else {
          return 1;
        }
      });
  },

  render: function() {
    const { districtInfo, crimesSortedByDate } = this.props;
    const mailto = "mailto:" + districtInfo.contact_email;
    const politicalParty = districtInfo.politician_party.slice(0,1) + '.';
    const selectedDistrictCrimeData = this.getDistrictData();

    return <div className="dashboard">
      <h1>Dashboard: {districtInfo.politician_officetype} District {districtInfo.district_number}</h1>
      <LineChart
        data={selectedDistrictCrimeData} />
    </div>;
  }
});

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
      strokeWidth:  3
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
    colors:             React.PropTypes.func,
    data:               React.PropTypes.array,
    interpolationType:  React.PropTypes.string,
    xScale:             React.PropTypes.func,
    yScale:             React.PropTypes.func
  },

  getDefaultProps() {
    return {
      data:               [],
      interpolationType:  'basis',
      colors:             d3.scale.category10()
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
          stroke={colors(id)}
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

const LineChart = React.createClass({

  propTypes: {
    width:  React.PropTypes.number,
    height: React.PropTypes.number,
    data:   React.PropTypes.array.isRequired
  },

  getDefaultProps(){
    return {
      width:  600,
      height: 300
    }
  },

  render() {
    let { width, height, data } = this.props;

    let xScale = d3.time.scale()
                    .domain([new Date('2015-09-24T00:00:00.000Z'), new Date('2016-03-24T00:00:00.000Z')])
                    .range([0, width]);

    let yScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) {
                        return d.count;
                      })])
                    .range([height, 50]);

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