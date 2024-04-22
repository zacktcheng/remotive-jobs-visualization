import React from "react";
import Section from "../base/Section";
import { Chip, Grid } from "@mui/material";
import { Context } from "../compound/Content";

const FilterSection = () => {

  const { inclusion, setInclusion, exclusion, setExclusion } = React.useContext(Context);

  const handleExclude = (tag) => {
    setInclusion([...inclusion].filter(elem => elem !== tag));
    setExclusion([...exclusion, tag]);
  }

  const handleInclude = (tag) => {
    setInclusion([...inclusion, tag]);
    setExclusion([...exclusion].filter(elem => elem !== tag));
  }

  const filterSectionSx = {};
  const fitlterSectionHeaderSx = {
    '& .MuiCardHeader-title': {
      fontSize: '.75rem'
    }
  };

  return (
    <Section sectionSx={filterSectionSx}>
      <Section title={'Included tags'} sectionSx={fitlterSectionHeaderSx}>
        <Grid container spacing={.5}>
          {inclusion.map((tag, index) => (
          <Grid item key={index}>
            <Chip label={tag} size="small" onDelete={() => handleExclude(tag)} />
          </Grid>
          ))}
        </Grid>
      </Section>
      <Section title={'Excluded tags'} sectionSx={fitlterSectionHeaderSx}>
        <Grid container spacing={.5}>
          {exclusion.map((tag, index) => (
          <Grid item key={index}>
            <Chip label={tag} size="small" onDelete={() => handleInclude(tag)} />
          </Grid>
          ))}
        </Grid>
      </Section>
    </Section>
  );
}

export default FilterSection;