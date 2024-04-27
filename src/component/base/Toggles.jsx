import React from "react";
import { Avatar, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

const Toggles = ({ btnTxts, handleChange, toggleds }) => {

  const isExclusive = !(toggleds instanceof Array)
  const tglBtnGrpSx = {};
  const tglBtnSx = { 
    textTransform: 'none'
  };

  return (
    <ToggleButtonGroup value={toggleds} exclusive={isExclusive} onChange={handleChange} size="small" sx={tglBtnGrpSx}>
    {btnTxts.map((elem, index) => (
      <ToggleButton key={index} value={elem} size="small" sx={tglBtnSx}>
        <Avatar variant="rounded" sx={{ width: 16, height: 16, bgcolor: 'red' }} children={' '} />
        <Typography variant="caption">{elem}</Typography>
      </ToggleButton>
    ))}
    </ToggleButtonGroup>
  );
}

export default Toggles;