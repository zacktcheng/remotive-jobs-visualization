import React from "react";
import { Context } from "./Content";
import Section from "../base/Section";
import LineChartSvg from "../chartSvg/LineChartSvg";
import { getExpChartData } from "../../common/jsonHelper";
import Toggles from "../base/Toggles";

const LineChart = () => {

  const { tags, jobPostJSONs, lineChartData, setLineChartData } = React.useContext(Context);
  const [toggled, setToggled] = React.useState();
  const handleChange = (event, nextToggled) => {
    setToggled(nextToggled);
    setLineChartData(getExpChartData(jobPostJSONs, [nextToggled]));
  }

  return (
    <Section >
      <Toggles btnTxts={tags} handleChange={handleChange} toggleds={toggled} />
      <LineChartSvg data={lineChartData} dimension={{ x: 400, y: 400 }} />
    </Section>
  );
}

export default LineChart;