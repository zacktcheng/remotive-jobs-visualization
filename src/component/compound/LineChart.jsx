import React from "react";
import Section from "../base/Section";
import LineChartSvg from "../chartSvg/LineChartSvg";

const LineChart = () => {
  return (
    <Section >
      <LineChartSvg data={[
        { seniority: 'Junior', value: 135.98 }, { seniority: 'Mid level', value: 147.49 }, { seniority: 'Senior', value: 200}
      ]} dimension={{ x: 400, y: 400 }} />
    </Section>
  );
}

export default LineChart;