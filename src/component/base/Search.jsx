import React from "react";
import { Context } from "../compound/Content";
import { filterJobPostJSONs, getTags, toWordArray, getDefaultExpChartData, getDefaultRoleChartData } from "../../common/jsonHelper";
import { getJobPostJSONs } from "../../common/restClient";
import { Box, Button, ButtonGroup, Grid, InputBase } from "@mui/material";
import { REMOTIVE_API_URL_DEV } from "../../data/constant";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {

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
  const inputBoxSx = {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 1,
    border: '1px solid grey'
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
    <Grid container spacing={1}>
      <Grid xs={8}>
        <Box sx={inputBoxSx}>
          <SearchIcon color="primary" />
          <InputBase inputProps={inputProps} size="small" fullWidth sx={inputBaseSx} placeholder="Type in keywords split by white spaces" onChange={handleInput}></InputBase>
        </Box>
      </Grid>
      <Grid xs="auto">
        <ButtonGroup size="small" aria-label="Small button group" disableElevation disableRipple>
          <Button variant="outlined" onClick={handleSearch} size="small">Search</Button>
          <Button variant="outlined" color="secondary" onClick={handleClear} size="small">Clear</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default Search;