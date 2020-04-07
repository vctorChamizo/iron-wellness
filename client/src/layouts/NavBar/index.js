import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

import { ScrollTop } from "./ScrollTop";

ScrollTop.propTypes = {
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  hidden: {
    visibility: "collapse",
  },
}));

export const NavBar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top" className={classes.hidden} />
      <ScrollTop {...props} />
    </div>
  );
};
