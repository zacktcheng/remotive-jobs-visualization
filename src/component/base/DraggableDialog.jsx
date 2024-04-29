import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, Paper } from "@mui/material";
import Section from "./Section";
import Draggable from 'react-draggable';

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const DraggableDialog = ({ title, icon, openable, children }) => {

  const [open, setOpen] = React.useState(false);
  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" size="small" onClick={handleClick} startIcon={icon} disabled={!openable}>{title}</Button>
      <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" />
        <DialogContent><Section>{children}</Section></DialogContent>
      </Dialog>
    </>
  );
}

export default DraggableDialog;
