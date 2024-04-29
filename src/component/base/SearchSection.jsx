import React from "react";
import { Context } from "../compound/Content";
import Section from "./Section";
import { filterJobPostJSONs, getTags, toWordArray, getDefaultExpChartData, getDefaultRoleChartData } from "../../common/jsonHelper";
import { getJobPostJSONs } from "../../common/restClient";
import { Box, Button, InputBase } from "@mui/material";
import { REMOTIVE_API_URL_DEV } from "../../data/constant";
import SearchIcon from "@mui/icons-material/Search";

const SearchSection = () => {

  const {
    setJobPostJSONs,
    setTags,
    setBarChartData,
    setStackedBarChartData,
    setLineChartData,
    setPieChartData
  } = React.useContext(Context);
  const defaultExpChartData = getDefaultExpChartData();
  const defaultRoleChartData = getDefaultRoleChartData();
  const [input, setInput] = React.useState('');
  const sectionSx = {};
  const inputBoxSx = {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    border: '1px solid grey',
    boxShaow: `inset 0 0 0.3rem 0.1rem grey`
  };
  const inputProps = {
    style: {
      padding: 0,
      color: 'grey'
    }
  };
  const inputBaseSx = {
    fontSize: '.75rem'
  };
  const btnBoxSx = {
    display: 'flex',
  };
  const handleInput = (event) => setInput(event.target.value);
  const handleClear = () => {
    setJobPostJSONs([]);
    setTags([]);
    setBarChartData(defaultRoleChartData);
    setStackedBarChartData(defaultRoleChartData);
    setLineChartData(defaultExpChartData);
    setPieChartData([]);
  }
  const handleSearch = async () => {
    try {
      handleClear();
      const jobPostJSONs = await getJobPostJSONs(REMOTIVE_API_URL_DEV);
      const keywords = toWordArray(input);
      const filteredJobPostJONs = filterJobPostJSONs(jobPostJSONs, keywords);
      setJobPostJSONs(filteredJobPostJONs);
      setTags(getTags(filteredJobPostJONs));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Section sectionSx={sectionSx}>
      <Box sx={inputBoxSx}>
        <SearchIcon htmlColor="grey" />
        <InputBase inputProps={inputProps} size="small" fullWidth sx={inputBaseSx} placeholder="type in keywords split by white spaces" onChange={handleInput}></InputBase>
      </Box>
      <Box sx={btnBoxSx}>
        <Button variant="contained" onClick={handleSearch} size="small" disableElevation disableRipple sx={{m: .5}}>Search</Button>
        <Button variant="contained" onClick={handleClear} size="small" disableElevation disableRipple sx={{m: .5}}>Clear</Button>
      </Box>
    </Section>
  );
}

export default SearchSection;