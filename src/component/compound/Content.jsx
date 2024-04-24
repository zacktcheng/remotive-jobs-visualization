import React from "react";
import { Grid } from "@mui/material";
import ControlPanel from "./ControlPanel";
import Visualizations from "./Visualizations";

export const Context = React.createContext();

const Content = () => {

  const [jobPostJSONs, setJobPostJSONs] = React.useState([]);
  const [inclusion, setInclusion] = React.useState([]);
  const [exclusion, setExclusion] = React.useState([]);
  const [barChartData, setBarChartData] = React.useState([]);
  const [sBarChartData, setSBarChartData] = React.useState([]);
  const [lineChartData, setLineChartData] = React.useState([]);
  const [pieChartData, setPieChartData] = React.useState([]);
  const contextProviderValues = {
    jobPostJSONs, setJobPostJSONs,
    inclusion, setInclusion,
    exclusion, setExclusion
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