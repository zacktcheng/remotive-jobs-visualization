import React from "react";
import Section from "../base/Section";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import PieChartSvg from "../chartSvg/PieChartSvg";

const PieChart = () => {

  const [pos, setPos] = React.useState();
  const BtnPosTextMap = {
    left: 'Programming Languages',
    center: 'Libraries / Framworks',
    right: 'Countries / Regions'
  };
  const handleChange = (event, nextPos) => {
    setPos(nextPos);
    switch (nextPos) {
      case 'left':
        break;
      case 'center':
        break;
      case 'right':
        break;
      default:
        //
    }
  };

  return (
    <Section >
      <ToggleButtonGroup
      value={pos}
      exclusive
      onChange={handleChange}
      >
        {Object.keys(BtnPosTextMap).map((elem, index) => (
          <ToggleButton key={index} value={elem} size="small">
            <Typography variant="caption" display="block">{BtnPosTextMap[elem]}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <PieChartSvg data={{ python: 9, java: 20, javascript: 30, go: 8, swift: 12 }} dimension={{ x: 400, y: 400 }} />
    </Section>
  );
}

export default PieChart;