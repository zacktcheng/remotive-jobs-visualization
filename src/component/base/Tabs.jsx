import React from "react";
import { Tab } from "@mui/material"; 
import { TabContext, TabList, TabPanel } from '@mui/lab';

const Tabs = ({ titles, children }) => {

  const [tabIndex, setTabIndex] = React.useState(0);
  const tabContextSx = {
    width: '100%'
  };

  const handleChange = (event, value) => {
    setTabIndex(value);
  }

  return (
    <TabContext value={tabIndex} sx={tabContextSx}>
      <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {titles.map((title, index) => <Tab key={index} label={title} value={index} />)}
      </TabList>
      {children.map((child, index) => <TabPanel key={index} value={index}>{child}</TabPanel>)}
    </TabContext>
  );
}

export default Tabs;