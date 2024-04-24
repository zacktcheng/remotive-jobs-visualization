import React from "react";
import * as d3 from 'd3';
import { getPaddingMarginLength } from "../../common/d3Helper";

const appendPie = (dimension, piedData, arcGenerator, selection) => {
  const colors = d3.scaleOrdinal().range(d3.schemeSet3);
  selection
  .selectAll()
  .data(piedData)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', datum => colors(datum.data[0]))
    .attr('stroke', 'black')
    .attr('transform', `translate(${dimension.x / 2}, ${dimension.y / 2})`);
  
  return selection;
}

const appendAnnotation = (dimension, piedData, arcGenerator, selection) => {
  const total = piedData.reduce((accu, curr) => accu + curr.value, 0);
  selection
  .selectAll()
  .data(piedData)
  .enter()
  .append('text')
  .text(datum => datum.data[0] + ': ' + (1e+2 * datum.data[1] / total).toFixed(2) + '%')
  .attr('transform', datum => `translate(${dimension.x / 2 + arcGenerator.centroid(datum)[0] * 1.25}, ${dimension.y / 2 + arcGenerator.centroid(datum)[1] * 1.25})`)
  .style('text-anchor', 'middle')
  .style('font-size', 8)
  .style('fill', 'black');

  return selection;
}

const PieChartSvg = ({ data, dimension }) => {
  const ref = React.useRef();
  const piedData = (d3.pie().value(datum => datum[1]))(Object.entries(data));
  const { length } = getPaddingMarginLength(dimension);
  const arcGenerator = d3.arc().innerRadius(0).outerRadius(length.x / 2);

  React.useEffect(() => {
    let selection = d3.select(ref.current);
    selection = appendPie(dimension, piedData, arcGenerator, selection);
    selection = appendAnnotation(dimension, piedData, arcGenerator, selection);
  }, [data, dimension]);
  
  return <svg width={dimension.x} height={dimension.y} ref={ref} />;
}

export default PieChartSvg;