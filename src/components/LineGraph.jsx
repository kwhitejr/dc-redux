import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';



export default LineGraph = React.createClass({

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
    const selectedDistrictCrimeData = this.getDistrictData();

    console.log(selectedDistrictCrimeData);

    return <div>
      <LineChart />
    </div>;
  }
});

const data = [{
    "Client": "ABC",
    "sale": "202",
    "year": "2000"
}, {
    "Client": "ABC",
    "sale": "215",
    "year": "2002"
}, {
    "Client": "ABC",
    "sale": "179",
    "year": "2004"
}, {
    "Client": "ABC",
    "sale": "199",
    "year": "2006"
}, {
    "Client": "ABC",
    "sale": "134",
    "year": "2008"
}, {
    "Client": "ABC",
    "sale": "176",
    "year": "2010"
}, {
    "Client": "XYZ",
    "sale": "100",
    "year": "2000"
}, {
    "Client": "XYZ",
    "sale": "215",
    "year": "2002"
}, {
    "Client": "XYZ",
    "sale": "179",
    "year": "2004"
}, {
    "Client": "XYZ",
    "sale": "199",
    "year": "2006"
}, {
    "Client": "XYZ",
    "sale": "134",
    "year": "2008"
}, {
    "Client": "XYZ",
    "sale": "176",
    "year": "2013"
}];

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
    data:               React.PropTypes.object,
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
      .interpolate(interpolationType)
      .x((d) => { return xScale(d.date); })
      .y((d) => { return yScale(d.count); });

    let lines = data.points.map((series, id) => {
      return (
        <Line
          path={line(series)}
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
    data:   React.PropTypes.object.isRequired
  },

  getDefaultProps(){
    return {
      width:  600,
      height: 300
    }
  },

  render() {
    let { width, height, data } = this.props;

    let xScale = d3.scale.ordinal()
                   .domain(data.xValues)
                   .range([0, width]);

    let yScale = d3.scale.linear()
                   .domain([data.yMin, data.yMax])
                   .range([height, 10]);

    return (
      <svg width={width} height={height}>
          <DataSeries
            xScale={xScale}
            yScale={yScale}
            data={data}
            width={width}
            height={height}
            />
      </svg>
    );
  }

});

const vis = d3.select("#linegraph"),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
        top: 50,
        right: 20,
        bottom: 50,
        left: 50
    },
    xScale = d3.scale.linear()
      .range([MARGINS.left, WIDTH - MARGINS.right])
      .domain([d3.min(data, function(d) {
        return d.date;
      }), d3.max(data, function(d) {
        return d.date;
      })]),

    yScale = d3.scale.linear()
      .range([HEIGHT - MARGINS.top, MARGINS.bottom])
      .domain([d3.min(data, function(d) {
        return d.count;
      }), d3.max(data, function(d) {
        return d.count;
      })]),

    xAxis = d3.svg.axis()
      .scale(xScale),

    yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");

vis.append("svg:g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
  .call(xAxis);

vis.append("svg:g")
  .attr("class", "axis")
  .attr("transform", "translate(" + (MARGINS.left) + ",0)")
  .call(yAxis);

const lineGen = d3.svg.line()
  .x(function (d) {
    return xScale(d.date);
  })
  .y(function (d) {
    return yScale(d.count);
  })
  .interpolate("basis");

// vis.append("svg:path")
//   .attr('d', lineGen(data))
//   .attr('stroke', 'green')
//   .attr('stroke-width', 2)
//   .attr('fill', 'none');

// vis.append("svg:path")
//   .attr('d', lineGen(data2))
//   .attr('stroke', 'blue')
//   .attr('stroke-width', 2)
//   .attr('fill', 'none');

const dataGroup = d3.nest()
  .key(function (d) {
    return d.type;
  })
  .entries(data2);

dataGroup.forEach(function (d, i) {
  const lSpace = WIDTH/dataGroup.length;
  vis.append("svg:path")
    .attr('d', lineGen(d.values))
    .attr('stroke', function(d, j) {
      return "hsl(" + Math.random() * 360 + ",100%,50%)";
    })
    .attr('stroke-width', 2)
    .attr('id', 'line_' + d.key)
    .attr('fill', 'none');
  vis.append("text")
    .attr("x", (lSpace / 2) + i * lSpace)
    .attr("y", HEIGHT)
    .style("fill", "black")
    .attr("class", "legend")
    .on('click', function() {
      alert(d.key);
    })
    .text(d.key);
});