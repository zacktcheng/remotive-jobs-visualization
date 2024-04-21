import React from "react";
import Tabs from "../base/Tabs";
import Section from "../base/Section";
import JobPosts from "./JobPosts";
import StackedBarChart from "./StackedBarChart";
import LineChart from "./LineChart"
import PieChart from "./PieChart";

const Visualizations = () => {

  const tabTitles = ['Job Posts', 'Stacked Bar Chart', 'Line Chart', 'Pie Chart'];
  const visSx = {};

  return (
    <Section title={'Visualization'} subheader={'Render filtered data'} sectionSx={visSx}>
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