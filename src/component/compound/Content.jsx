import React from "react";
import { Grid } from "@mui/material";
import ControlPanel from "./ControlPanel";
import Visualizations from "./Visualizations";
import { getDefaultExpChartData, getDefaultRoleChartData } from "../../common/jsonHelper";

export const Context = React.createContext();

const Content = () => {

  const defaultExpChartData = getDefaultExpChartData();
  const defaultRoleChartData = getDefaultRoleChartData();
  const [jobPostJSONs, setJobPostJSONs] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [barChartData, setBarChartData] = React.useState(defaultRoleChartData);
  const [stackedBarChartData, setStackedBarChartData] = React.useState(defaultRoleChartData);
  const [lineChartData, setLineChartData] = React.useState(defaultExpChartData);
  const [pieChartData, setPieChartData] = React.useState([]);
  const contextProviderValues = {
    jobPostJSONs, setJobPostJSONs,
    tags, setTags,
    barChartData, setBarChartData,
    stackedBarChartData, setStackedBarChartData,
    lineChartData, setLineChartData,
    pieChartData, setPieChartData
  };

  return (
    <Context.Provider value={contextProviderValues}>
      <Grid container spacing={1}>
        <Grid item xs='auto'><ControlPanel /></Grid>
        <Grid item xs><Visualizations /></Grid>
      </Grid>
    </Context.Provider>
  );
}

export default Content;