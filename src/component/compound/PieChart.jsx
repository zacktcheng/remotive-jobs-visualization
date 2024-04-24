import React from "react";
import { Context } from "./Content";
import { PROG_LANGS, LIB_FRAMEWORKS } from "../../data/constant";
import { toWordArray, sortTrimJSONs, getHighFreqJSONs } from "../../common/jsonHelper";
import Section from "../base/Section";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import PieChartSvg from "../chartSvg/PieChartSvg";

const PieChart = () => {

  const { jobPostJSONs, pieChartData, setPieChartData } = React.useContext(Context);
  const [pos, setPos] = React.useState();
  const BtnPosTextMap = {
    left: 'Programming Languages',
    center: 'Libraries & Framworks',
    right: 'Location Regions'
  };
  const handleChange = (event, nextPos) => {
    setPos(nextPos);
    let data;
    switch (nextPos) {
      case 'left':
        data = getHighFreqJSONs(jobPostJSONs, PROG_LANGS);
        break;
      case 'center':
        data = getHighFreqJSONs(jobPostJSONs, LIB_FRAMEWORKS);
        break;
      case 'right':
        const regions = {};
        for (const json of jobPostJSONs) {
          const locations = toWordArray(json['candidate_required_location']);
          for (const location of locations) {
            if (regions.hasOwnProperty(location)) regions[location] += 1;
            else regions[location] = 1;
          }
        }
        data = sortTrimJSONs(regions, 8);
        break;
      default:
        data = {};
    }
    setPieChartData(data);
  };

  return (
    <Section >
      <ToggleButtonGroup value={pos} exclusive onChange={handleChange}>
      {Object.keys(BtnPosTextMap).map((elem, index) => (
        <ToggleButton key={index} value={elem} size="small">
          <Typography variant="caption" display="block">{BtnPosTextMap[elem]}</Typography>
        </ToggleButton>
      ))}
      </ToggleButtonGroup>
      <PieChartSvg data={pieChartData} dimension={{ x: 400, y: 400 }} />
    </Section>
  );
}

export default PieChart;