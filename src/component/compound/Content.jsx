import React from "react";
import Section from "../base/Section";
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
  const sectionSx = {
    border: 'none'
  };

  return (
    <Context.Provider value={contextProviderValues}>
      <Section sectionSx={sectionSx}>
        <ControlPanel />
        <Visualizations />
      </Section>
    </Context.Provider>
  );
}

export default Content;