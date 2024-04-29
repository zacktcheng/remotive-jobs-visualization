import React from "react";
import { Context } from "./Content";
import DraggableDialog from "../base/DraggableDialog";
import BarChartSvg from "../chartSvg/BarChartSvg";
import BarChartIcon from '@mui/icons-material/BarChart';
import Toggles from "../base/Toggles";
import { getRoleChartData } from "../../common/jsonHelper";

const BarChart = ({ toggleds }) => {

  const { jobPostJSONs, barChartData, setBarChartData } = React.useContext(Context);
  const [subToggled, setSubToggled] = React.useState();
  const handleChange = (event, nextSubToggled) => {
    setSubToggled(nextSubToggled);
    setBarChartData(getRoleChartData(jobPostJSONs, [nextSubToggled]));
  }
  const openable = toggleds && toggleds instanceof Array && toggleds.length > 0;

  return (
    <DraggableDialog title={'Detail'} icon={<BarChartIcon />} openable={openable}>
      <Toggles btnTxts={toggleds} handleChange={handleChange} toggleds={subToggled} />
      <BarChartSvg data={barChartData} dimension={{ x: 400, y: 400 }} />
    </DraggableDialog>
  );
}

export default BarChart;