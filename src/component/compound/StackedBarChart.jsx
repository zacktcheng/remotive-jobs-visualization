import React from "react";
import { Context } from "./Content";
import Section from "../base/Section";
import StackedBarChartSvg from "../chartSvg/StackedBarChartSvg";
import BarChartSvg from "../chartSvg/BarChartSvg";
import Toggles from "../base/Toggles";
import { getExpChartData } from "../../common/jsonHelper";
import BarChart from "./BarChart";

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
      <BarChart toggleds={toggleds} />
    </Section>
  );
}

export default StackedBarChart;