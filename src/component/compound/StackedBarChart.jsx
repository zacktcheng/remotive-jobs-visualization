import React from "react";
import Section from "../base/Section";
import StackedBarChartSvg from "../chartSvg/StackedBarChartSvg";
import BarChartSvg from "../chartSvg/BarChartSvg";

const StackedBarChart = () => {
  return (
    <Section >
      <StackedBarChartSvg data={[{ role: 'Junior', algo: 10, design: 2, comm: 2 }, { role: 'Mid level', algo: 15, design: 6, comm: 5 }, { role: 'Senior', algo: 4, design: 12, comm: 8 }, { role: 'Arch', algo: 1, design: 8, comm: 20 }]} dimension={{ x: 400, y: 400 }} />
      <BarChartSvg data={[{ language: 'F#', value: 1 }, { language: 'Java', value: 40 }, {language: 'Python', value: 60}]} dimension={{ x: 400, y: 400}} />
    </Section>
  );
}

export default StackedBarChart;