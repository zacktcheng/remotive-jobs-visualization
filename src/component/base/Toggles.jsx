import React from "react";
import { Avatar, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { getd3ColorMap } from "../../common/d3Helper";

const Toggles = ({ btnTxts, handleChange, toggleds }) => {

  const isExclusive = !(toggleds instanceof Array);
  const colors = isExclusive ? null : getd3ColorMap(toggleds);
  const tglBtnGrpSx = {};
  const tglBtnSx = { 
    textTransform: 'none'
  };
  const avatarSx = {
    width: 16,
    height: 16,
    mr: 1
  };

  return (
    <ToggleButtonGroup value={toggleds} exclusive={isExclusive} onChange={handleChange} size="small" sx={tglBtnGrpSx}>
    {btnTxts.map((elem, index) => (
      <ToggleButton key={index} value={elem} size="small" sx={tglBtnSx}>
        {colors && <Avatar variant="rounded" sx={{...avatarSx, bgcolor: colors(elem) }} children={' '} />}
        <Typography variant="caption">{elem}</Typography>
      </ToggleButton>
    ))}
    </ToggleButtonGroup>
  );
}

export default Toggles;