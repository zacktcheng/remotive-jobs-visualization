import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";

const Section = ({ title, subheader, sectionSx, children }) => {
  
  const cardSx = {
    ...sectionSx,
    overflow: 'auto'
  };

  return (
    <Card variant='outlined' sx={cardSx}>
      {title && <CardHeader title={title} subheader={subheader} />}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default Section;