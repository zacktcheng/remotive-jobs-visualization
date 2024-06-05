import React from "react";
import Search from "../base/Search";
import Section from "../base/Section";

const ControlPanel = () => {

  return (
    <Section title={'Query Job Posts'} description={'Start a new job search from here!'}>
      <Search />
    </Section>
  );
}

export default ControlPanel;