import React from 'react';
import ReactFauxDOM from 'react-faux-dom';

export default React.createClass({
  propTypes: {
    width:  React.PropTypes.number,
    height: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      width: 450,
      height: 300
    };
  },

  structureData(districtNumber) {
    let { data, districtInfo, crimeTypes } = this.props;
    console.log('areachart data', data);
    // console.log('crimeTypes', crimeTypes);

    if (districtNumber) {
      data = data.filter( (glob) => {
        return glob.district == districtNumber;
      });
    }

    const reducedData = data.map(function(a) {
      var prop;
      var _this = this;

      crimeTypes.map(function(k) {
        prop = a.to_timestamp+"|"+k.label;
        if (!_this[prop]) {
          _this[prop] = {
            key: k.label,
            value: 0,
            date: moment(a.to_timestamp).format("YYYY-MM-DD")
          };
          districtCrimeData.push(_this[prop]);
        }
        if (prop === a.to_timestamp+"|"+a.type) {
          _this[prop].value += parseInt(a.count);
        }
      });
    });

    console.log('areachart reduced data',reducedData);

    return reducedData;
  },

  render() {

    const areaChartData = this.structureData();
    // console.log('area chart data',areaChartData);

    const format = d3.time.format("%Y-%m-%d");

    const margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 450 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom,
      delay = 500,
      duration = 750;

    const x = d3.time.scale()
      .range([0, width]);

    const y = d3.scale.linear()
      .range([height, 0]);

    const z = d3.scale.category20c();

    const xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(d3.time.months);

    const yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    const stack = d3.layout.stack()
      .offset("zero")
      .values(function(d) { return d.values; })
      .x(function(d) { return d.date; })
      .y(function(d) { return d.value; });

    const nest = d3.nest()
      .key(function(d) { return d.key; });

    const area = d3.svg.area()
      .interpolate("cardinal")
      .x(function(d) { return x(d.date); })
      .y0(function(d) { return y(d.y0); })
      .y1(function(d) { return y(d.y0 + d.y); });

    let node = ReactFauxDOM.createElement('svg');
    let svg = d3.select(node)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    areaChartData.forEach(function(d) {
      d.date = format.parse(d.date);
      d.value = +d.value;
    });

    let layers = stack(nest.entries(areaChartData));

    x.domain(d3.extent(areaChartData, function(d) { return d.date; }));
    y.domain([0, d3.max(areaChartData, function(d) { return d.y0 + d.y; })]);

      svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class", "layer")
    // .transition()
    // .delay(delay)
    // .duration(duration)
    // .ease("linear")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); });

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    return node.toReact();
  }
});