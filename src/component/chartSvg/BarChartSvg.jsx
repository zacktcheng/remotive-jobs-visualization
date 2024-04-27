import React from "react";
import * as d3 from "d3";
import { appendAxis, getPaddingMarginLength } from "../../common/d3Helper";

const appendBars = (xScale, yScale, height, margin, data, key, value, selection) => {
  selection
  .selectAll()
  .data(data)
  .join('rect')
    .attr('x', datum => xScale(datum[key]) + margin.x)
    .attr('y', datum => yScale(datum[value]) + margin.y)
    .attr('width', xScale.bandwidth())
    .attr('height', datum => height - yScale(datum[value]))
    .attr('fill', 'steelblue');
  
  return selection;
}

const BarChartSvg = ({ data, dimension }) => {
  const ref = React.useRef();
  const attrs = Object.keys(data[0]), key = attrs[0], value = attrs[1];
  const domain = { x: data.map(elem => elem[key]), y: [0, data.map(elem => elem[value]).sort((a, b) => b - a)[0]] };
  const text = { x: key, y: value };
  const { padding, margin, length } = getPaddingMarginLength(dimension);

  React.useEffect(() => {
    let selection = d3.select(ref.current);
    selection.selectAll('*').remove();
    const xScale = d3.scaleBand(domain.x, [0, length.x]).padding(padding);
    const yScale = d3.scaleLinear(domain.y, [length.y, 0]);
    selection = appendBars(xScale, yScale, length.y, margin, data, key, value, selection);
    selection = appendAxis(selection, 'x', xScale, margin, length, text.x);
    selection = appendAxis(selection, 'y', yScale, margin, length, text.y);
  }, [data, dimension]);

  return <svg width={dimension.x} height={dimension.y} ref={ref} />;
}

export default BarChartSvg;