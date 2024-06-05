import React from "react";
import { Card, Stack, Typography } from "@mui/material";

const Section = ({ title, description, sectionSx, children }) => {
  
  const cardSx = {
    overflow: 'auto',
    p: 1,
    ...sectionSx
  };

  return (
    <Card variant='outlined' sx={cardSx}>
      {title && <Typography variant="h6" noWrap>{title}</Typography>}
      {description && <Typography variant="subtitle2" gutterBottom={false}>{description}</Typography>}
      <Stack spacing={title ? .5 : 1}>{children}</Stack>
    </Card>
  );
}

export default Section;