import React from "react";
import * as d3 from 'd3';
import { appendAxis, getPaddingMarginLength } from "../../common/d3Helper";

const appendLines = (xScale, yScale, margin, data, key, value, selection) => {
  selection
  .append('path')
  .datum(data)
  .attr('fill', 'none')
  .attr('stroke', 'steelblue')
  .attr('stroke-width', 1)
  .attr('d', d3
    .line()
    .x(datum => xScale(datum[key]) + margin.x)
    .y(datum => yScale(datum[value]) + margin.y)
  );
  return selection;
}

const LineChartSvg = ({ data, dimension }) => {
  const ref = React.useRef();
  const attrs = Object.keys(data[0]), key = attrs[0], value = attrs[1];
  const domain = { x: data.map(elem => elem[key]), y: [0, data.map(elem => elem[value]).sort((a, b) => b - a)[0]] };
  const text = { x: key, y: value };
  const { margin, length } = getPaddingMarginLength(dimension);

  React.useEffect(() => {
    let selection = d3.select(ref.current);
    const xScale = d3.scaleBand(domain.x, [0, length.x]).padding(1);
    const yScale = d3.scaleLinear(domain.y, [length.y, 0]);
    selection = appendLines(xScale, yScale, margin, data, key, value, selection);
    selection = appendAxis(selection, 'x', xScale, margin, length, text.x);
    selection = appendAxis(selection, 'y', yScale, margin, length, text.y);
  }, []);

  return <svg width={dimension.x} height={dimension.y} ref={ref} />;
}

export default LineChartSvg;