import React from "react";
import { Context } from "./Content";
import Section from "../base/Section";
import StackedBarChartSvg from "../chartSvg/StackedBarChartSvg";
import Toggles from "../base/Toggles";
import { getRoleChartData } from "../../common/jsonHelper";
import BarChart from "./BarChart";

const StackedBarChart = () => {

  const { tags, jobPostJSONs, stackedBarChartData, setStackedBarChartData } = React.useContext(Context);
  const [toggleds, setToggleds] = React.useState(() => []);
  const handleChange = (event, nextToggleds) => {
    setToggleds(nextToggleds);
    setStackedBarChartData(getRoleChartData(jobPostJSONs, nextToggleds));
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