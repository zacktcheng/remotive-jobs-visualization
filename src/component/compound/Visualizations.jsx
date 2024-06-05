import React from "react";
import Tabs from "../base/Tabs";
import Section from "../base/Section";
import JobPosts from "./JobPosts";
import StackedBarChart from "./StackedBarChart";
import LineChart from "./LineChart"
import PieChart from "./PieChart";

const Visualizations = () => {

  const tabTitles = ['Job Posts', 'Stacked Bar Chart', 'Line Chart', 'Pie Chart'];

  return (
    <Section title={'Visualization'} description={'Render filtered data'}>
      <Tabs titles={tabTitles}>
        <JobPosts />
        <StackedBarChart />
        <LineChart />
        <PieChart />
      </Tabs>
    </Section>
  );
}

export default Visualizations;