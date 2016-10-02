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

    // console.log("donut chart reduced", nestedData);
    return nestedData;
  },

  render() {

    let { width, height, districtInfo, colors } = this.props;
    let dataTotal = this.structureData();
    let dataDistrict = this.structureData(districtInfo.district_number);

    const radius = Math.min(width, height) / 2;
    let pie = d3.layout.pie()
      .value(function(d) { return d.values; })
      .sort(null);

    let arc = d3.svg.arc()
      .innerRadius(radius - 100)
      .outerRadius(radius - 20);

    let node = ReactFauxDOM.createElement('svg');
    let svg = d3.select(node)
      .attr('width', width)
      .attr('height', height)
      .append("g")
      .attr("transform", `translate(${width/2},${height/2})`);

    let path = svg.datum(dataDistrict).selectAll("path")
      .data(pie)
      .enter().append("path")
      .attr("fill", function(d, i) { return colors[i]; })
      .attr("d", arc)
      .each(function(d) { this._current = d; });

    var timeout = setTimeout(function() {
      d3.select("input[value=\"dataSelectedDistrict\"]").property("checked", true).each(change);
    }, 2000);

    function change() {
      var data = [];
      if (this.value == "dataDistrict") {
        data = dataDistrict;
      } else {
        data = dataTotal;
      }
      donutChart.datum(data).selectAll("path")
        .data(pie);
      path = path.data(pie); // compute the new angles
      path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
    }

    function arcTween(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
        return arc(i(t));
      };
    }

    return node.toReact();
  }

});