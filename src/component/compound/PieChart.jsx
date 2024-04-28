import React from "react";
import { Context } from "./Content";
import { PROG_LANGS, LIB_FRAMEWORKS } from "../../data/constant";
import { toWordArray, sortTrimJson, getPieChartData } from "../../common/jsonHelper";
import Section from "../base/Section";
import PieChartSvg from "../chartSvg/PieChartSvg";
import Toggles from "../base/Toggles";

const PieChart = () => {

  const { jobPostJSONs, pieChartData, setPieChartData } = React.useContext(Context);
  const [toggleds, setToggleds] = React.useState();
  const btnTxts = ['Programming Languages', 'Libraries & Framworks','Location Regions'];
  const handleChange = (event, nextToggleds) => {
    setToggleds(nextToggleds);
    let data;
    console.log(nextToggleds);
    switch (nextToggleds) {
      case btnTxts[0]:
        data = getPieChartData(jobPostJSONs, PROG_LANGS);
        break;
      case btnTxts[1]:
        data = getPieChartData(jobPostJSONs, LIB_FRAMEWORKS);
        break;
      case btnTxts[2]:
        const regions = {};
        for (const json of jobPostJSONs) {
          const locations = toWordArray(json['candidate_required_location']);
          for (const location of locations) {
            if (regions.hasOwnProperty(location)) regions[location] += 1;
            else regions[location] = 1;
          }
        }
        data = sortTrimJson(regions, 8);
        break;
      default:
        data = {};
    }
    setPieChartData(data);
  };

  return (
    <Section >
      <Toggles btnTxts={btnTxts} handleChange={handleChange} toggleds={toggleds} />
      <PieChartSvg data={pieChartData} dimension={{ x: 400, y: 400 }} />
    </Section>
  );
}

export default PieChart;