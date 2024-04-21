import React from "react";
import Section from "../base/Section";
import { Chip, Grid } from "@mui/material";
import { Context } from "../compound/Content";

const FilterSection = () => {

  const { inclusion, setInclusion, exclusion, setExclusion } = React.useContext(Context);

  const handleDelete = (tag, isExcluding) => {
    if (isExcluding) {
      if (inclusion.indexOf(tag) !== -1) {
        const index = inclusion.indexOf(tag);
        setInclusion(inclusion.slice(0, index).concat(inclusion.slice(index + 1, inclusion.length)));
      }
      if (exclusion.indexOf(tag) === -1) {
        const index = exclusion.indexOf(tag);
        setExclusion([...exclusion, tag]);
      }
    } else {
      if (inclusion.indexOf(tag) === -1) {
        const index = inclusion.indexOf(tag);
        setInclusion([...inclusion, tag]);
      }
      if (exclusion.indexOf(tag) !== -1) {
        const index = exclusion.indexOf(tag);
        setExclusion(exclusion.slice(0, index).concat(exclusion.slice(index + 1, exclusion.length)));
      }
    }
  }

  const filterSectionSx = {};
  const inclusionSx = {};
  const exclusionSx = {};

  return (
    <Section sectionSx={filterSectionSx}>
      <Section title={'Included tags'} sectionSx={inclusionSx}>
        <Grid container spacing={.5}>
          {inclusion.map((tag, index) => (
          <Grid item key={index}>
            <Chip label={tag} size="small" onDelete={() => handleDelete(tag, false)} />
          </Grid>
          ))}
        </Grid>
      </Section>
      <Section title={'Excluded tags'} sectionSx={exclusionSx}>
        <Grid container spacing={.5}>
          {inclusion.map((tag, index) => (
          <Grid item key={index}>
            <Chip label={tag} size="small" onDelete={() => handleDelete(tag, true)} />
          </Grid>
          ))}
        </Grid>
      </Section>
    </Section>
  );
}

export default FilterSection;