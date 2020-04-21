import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.primaryText,
  },
}));

const DialogTitle = ({ onClose }) => {
  const classes = useStyles();

  return (
    <>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </>
  );
};

export const ExersiceDialog = ({ image, open, handleClose }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog fullWidth maxWidth="lg" onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose} />
        <img src={image}></img>
      </Dialog>
    </div>
  );
};
