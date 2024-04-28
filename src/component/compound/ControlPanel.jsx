import React from "react";
import SearchSection from "../base/SearchSection";
import Section from "../base/Section";

const ControlPanel = () => {

  const ctrlPanelSx = {};

  return (
    <Section title={'Search Controls'} subheader={'Start a new job search from here!'} sectionSx={ctrlPanelSx}>
      <SearchSection />
    </Section>
  );
}

export default ControlPanel;