import React from "react";
import { Grid } from "@mui/material";
import ControlPanel from "./ControlPanel";
import Visualizations from "./Visualizations";
import { SENIORITIES } from "../../data/constant";

export const Context = React.createContext();

const Content = () => {

  const [jobPostJSONs, setJobPostJSONs] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [inclusion, setInclusion] = React.useState([]);
  const [exclusion, setExclusion] = React.useState([]);
  const [barChartData, setBarChartData] = React.useState([]);
  const [stackedBarChartData, setStackedBarChartData] = React.useState(SENIORITIES.map(elem => { return { seniority: elem, value: 0 } }));
  const [lineChartData, setLineChartData] = React.useState([]);
  const [pieChartData, setPieChartData] = React.useState([]);
  const contextProviderValues = {
    jobPostJSONs, setJobPostJSONs,
    tags, setTags,
    inclusion, setInclusion,
    exclusion, setExclusion,
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