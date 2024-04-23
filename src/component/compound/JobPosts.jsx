import React from "react";
import { Context } from "./Content";
import { JOB_ATTRS } from "../../data/constant";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const JobPosts = () => {
  
  const { jobPostJSONs } = React.useContext(Context);

  return (
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          {JOB_ATTRS.map((elem, index) => (
          <TableCell key={index} align={index > 0 ? 'right' : 'left'}>{elem}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {jobPostJSONs.map((elem, index) => (
          <TableRow key={index}>
            {Object.keys(elem).map((key, index) => (
              <TableCell key={index} align={index > 0 ? 'right': 'left'}>{elem[key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default JobPosts;