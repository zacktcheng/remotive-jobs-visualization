import React from "react";
import * as d3 from 'd3';
import { appendAxis, getPaddingMarginLength } from "../../common/d3Helper";

const getYDomain = (data, key) => {
  let gloMax = 0;
  for (const row of data) {
    let locMax = 0;
    const attrs = Object.keys(row);
    for (const attr of attrs) {
      if (attr !== key && typeof row[attr] === 'number') locMax += row[attr];
    }
    gloMax = Math.max(locMax, gloMax);
  }
  return gloMax;
}

const appendStackedBars = (xScale, yScale, margin, data, key, selection) => {
  const attrs = Object.keys(data[0]).slice(1);
  const stackedData = d3.stack().keys(attrs)(data);
  const colors = d3.scaleOrdinal().domain(attrs).range(d3.schemeSet2).unknown('#ccc');
  
  selection
  .selectAll()
  .data(stackedData)
  .enter().append('g')
    .attr('fill', datum => colors(datum.key))
    .selectAll('rect')
    .data(datum => datum)
    .enter().append('rect')
      .attr('x', datum => xScale(datum.data[key]) + margin.x)
      .attr('y', datum => yScale(datum[1]) + margin.y)
      .attr('width', xScale.bandwidth())
      .attr('height', datum => yScale(datum[0]) - yScale(datum[1]));

  return selection;
}

const StackedBarChartSvg = ({ data, dimension }) => {
  const ref = React.useRef();
  const key = Object.keys(data[0])[0];
  const domain = { x: data.map(elem => elem[key]), y: [0, getYDomain(data, key)] };
  const text = { x: key, y: 'frequency' };
  const { padding, margin, length } = getPaddingMarginLength(dimension);

  React.useEffect(() => {
    let selection = d3.select(ref.current);
    selection.selectAll('*').remove();
    const xScale = d3.scaleBand(domain.x, [0, length.x]).padding(padding);
    const yScale = d3.scaleLinear(domain.y, [length.y, 0]);
    selection = appendStackedBars(xScale, yScale, margin, data, key, selection);
    selection = appendAxis(selection, 'x', xScale, margin, length, text.x);
    selection = appendAxis(selection, 'y', yScale, margin, length, text.y);
  },[data, dimension]);

  return <svg width={dimension.x} height={dimension.y} ref={ref} />;
}

export default StackedBarChartSvg;