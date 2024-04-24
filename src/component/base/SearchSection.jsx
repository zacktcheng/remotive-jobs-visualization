import React from "react";
import { Context } from "../compound/Content";
import Section from "./Section";
import { filterJobPostJSONs, getTags } from "../../common/jsonHelper";
import { getJobPostJSONs } from "../../common/restClient";
import { Box, Button, InputBase } from "@mui/material";
import { REMOTIVE_API_URL_DEV } from "../../data/constant";
import SearchIcon from "@mui/icons-material/Search";

const SearchSection = () => {

  const { setJobPostJSONs, setInclusion, setExclusion } = React.useContext(Context);
  const [input, setInput] = React.useState('');
  const sectionSx = {};
  const boxSx = {
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
  const handleInput = (event) => setInput(event.target.value);
  const handleSearch = async () => {
    try {
      sessionStorage.clear();
      const jobPostJSONs = await getJobPostJSONs(REMOTIVE_API_URL_DEV);
      const keywords = input.trim().split(' ');
      const filteredJobPostJONs = filterJobPostJSONs(jobPostJSONs, keywords);
      setJobPostJSONs(filteredJobPostJONs);
      const tags = getTags(filteredJobPostJONs);
      setInclusion([]);
      setExclusion(tags);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Section sectionSx={sectionSx}>
      <Box sx={boxSx}>
        <SearchIcon htmlColor="grey" />
        <InputBase inputProps={inputProps} size="small" fullWidth sx={inputBaseSx} placeholder="type in keywords split by white spaces" onChange={handleInput}></InputBase>
      </Box>
      <Button variant="contained" onClick={handleSearch} size="small" disableElevation disableRipple>Search</Button>
    </Section>
  );
}

export default SearchSection;