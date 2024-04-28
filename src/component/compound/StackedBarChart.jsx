import React from "react";
import { Context } from "./Content";
import Section from "../base/Section";
import StackedBarChartSvg from "../chartSvg/StackedBarChartSvg";
import BarChartSvg from "../chartSvg/BarChartSvg";
import Toggles from "../base/Toggles";
import { getExpChartData } from "../../common/jsonHelper";

const StackedBarChart = () => {

  const { tags, jobPostJSONs, stackedBarChartData, setStackedBarChartData } = React.useContext(Context);
  const [toggleds, setToggleds] = React.useState(() => []);
  const handleChange = (event, nextToggleds) => {
    setToggleds(nextToggleds);
    setStackedBarChartData(getExpChartData(jobPostJSONs, nextToggleds));
  }

  return (
    <Section >
      <Toggles btnTxts={tags} handleChange={handleChange} toggleds={toggleds} />
      <StackedBarChartSvg data={stackedBarChartData} dimension={{ x: 400, y: 400 }} />
      <BarChartSvg data={[{ language: 'F#', value: 1 }, { language: 'Java', value: 40 }, {language: 'Python', value: 60}]} dimension={{ x: 400, y: 400}} />
    </Section>
  );
}

export default StackedBarChart;