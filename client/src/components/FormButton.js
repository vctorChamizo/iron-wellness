import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const FormButton = ({ message }) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      {message}
    </Button>
  );
};
