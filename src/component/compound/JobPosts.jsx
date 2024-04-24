import React from "react";
import { Context } from "./Content";
import { REMOTIVE_WEB_URL_DEV } from "../../data/constant";
import { Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const JobPosts = () => {
  
  const { jobPostJSONs } = React.useContext(Context);
  const columns = ['id', 'title', 'tags', 'date', 'location'];

  return (
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          {columns.map((elem, index) => {
            return (
              <TableCell key={index} align="center">
                {elem[0].toLocaleUpperCase() + elem.slice(1)}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {jobPostJSONs.map((elem, index) => (
          <TableRow key={index}>
            {columns.map((column, index) => {
              if (column === 'date') column = 'publication_date';
              if (column === 'location') column = 'candidate_required_location';
              let child = elem[column];
              if (column === 'id') {
                child = (
                  <Link
                  href={`${REMOTIVE_WEB_URL_DEV}/${elem.title.toLowerCase().replaceAll(' ', '-')}-${elem[column]}`}
                  target="_blank"
                  >{child}
                  </Link>);
              }
              return <TableCell key={index} align="center">{child}</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default JobPosts;