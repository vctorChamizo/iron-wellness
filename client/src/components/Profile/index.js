import "date-fns";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Edit } from "./Edit";
import { Classes } from "./Classes";
import { Calendar } from "./Calendar";
import { Menu } from "./Drawer/index";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export const Profile = connect((state) => ({ user: state.user }))(
  withRouter(({ user, history, dispatch }) => {
    const classes = useStyles();

    const [component, setComponent] = useState("classes");

    return (
      <div className={classes.root}>
        <Menu
          setComponent={setComponent}
          user={user}
          history={history}
          dispatch={dispatch}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={10}>
            {component === "classes" ? (
              <Classes setComponent={setComponent} />
            ) : component === "profile" ? (
              <Edit setComponent={setComponent} user={user} />
            ) : (
              <Calendar setComponent={setComponent} />
            )}
          </Grid>
        </Grid>
      </div>
    );
  })
);
