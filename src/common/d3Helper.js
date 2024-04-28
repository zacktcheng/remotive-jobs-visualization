import * as d3 from 'd3';

export const appendAxis = (selection, orientation, scale, margin, length, text = '') => {
  let axisTransform, textTransform, axisGenerator, textAnchor;
  switch (orientation) {
    case 'x':
      axisTransform = `translate(${margin.x}, ${length.x + margin.x})`;
      textTransform = `translate(${length.x + margin.x}, ${margin.x * .5})`;
      axisGenerator = d3.axisBottom;
      textAnchor = 'end';
      break;
    case 'y':
      axisTransform = `translate(${margin.x}, ${margin.y})`;
      textTransform = `translate(${-margin.x}, ${-margin.y * .5})`;
      axisGenerator = d3.axisLeft;
      textAnchor = 'start';
      break;
    default:
      return selection;
  }
  selection
  .append('g')
  .attr('transform', axisTransform)
  .call(
    axisGenerator(scale)
    .tickSize(2.5)
    .tickSizeOuter(0)
  )
  .call(
    g => g
    .append('text')
    .attr('text-anchor', textAnchor)
    .attr('transform', textTransform)
    .attr('fill', 'currentColor')
    .text(text)
  );
  return selection;
}

export const getPaddingMarginLength = (dimension) => {
  const marginRate = 1e-1;
  const padding = marginRate * 3;
  const margin = { x: dimension.x * marginRate, y: dimension.y * marginRate };
  const length = { x: dimension.x - margin.x * 2, y: dimension.y - margin.y * 2 };
  return { padding, margin, length };
}

export const getd3ColorMap = (attrs) => {
  return d3.scaleOrdinal().domain(attrs).range(d3.schemeSet2).unknown('#ccc');
}