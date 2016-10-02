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
    let { data, districtInfo } = this.props;
    // console.log("bar", data);

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
    let { width, height, districtInfo, colors } = this.props;

    let dataTotal = this.structureData();
    let dataDistrict = this.structureData(districtInfo.district_number);
    let matrix = this.matrixData(dataTotal, dataDistrict);

    let barHeight =     20,
          padding =     10,
          leftMargin =  10,
          delay =       500,
          duration =    750;

    let maxCrime = d3.max(dataTotal, (d) => {
      return d.values;
    });

    let xScale = d3.scale.linear()
      .domain([0, maxCrime+50])
      .range([0, width]);

    let node = ReactFauxDOM.createElement('svg');
    let svg = d3.select(node)
    .attr('width', width)
    .attr('height', barHeight*matrix.length);

    let bar = svg.selectAll("g")
      .data(matrix)
      .enter()
      .append("g")
      .attr("transform", function(d, i) { return `translate(0,${i * barHeight})`; });

    bar.append("rect")
        .attr("fill", function(d,i) { return colors[i]; })
      //   .attr("width", 0)
      //   .attr("height", barHeight - 1)
      // .transition()
      // .delay(delay)
      // .duration(duration)
      // .ease("bounce")
        .attr("width", function(d) { return xScale(d.x1); })
        .attr("height", barHeight - 1);

    bar.append("rect")
        .attr("fill", "gray")
      //   .attr("width", 0)
      //   .attr("height", barHeight - 1)
      // .transition()
      // .delay(delay)
      // .duration(duration)
      // .ease("bounce")
        .attr("width", function(d) { return xScale(d.x0); })
        .attr("height", barHeight - 1);

    bar.append("text")
      // .transition()
      // .delay(delay+duration)
        .attr("x", function(d) {
          if (d.x1 < 1000) {
            return xScale(d.x1) + 20;
          } else {
            return xScale(d.x1) - 3;
          }
        })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.x1; });

    return node.toReact();
  }
});

// function render(data) {
//   React.render(React.createElement(BarChartFaux, {
//     data: data
//   }), document.getElementById('mount'));
// }