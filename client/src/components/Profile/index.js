import "date-fns";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Edit } from "./Edit";
import { Classes } from "./Classes";
import { Calendar } from "./Calendar";
import { Drawer } from "./Drawer/index";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    margin: "5vh 0",
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "45%",
  },
  list: {
    width: 250,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

export const Profile = connect((state) => ({ user: state.user }))(
  withRouter(({ user, history, dispatch }) => {
    const classes = useStyles();

    const [component, setComponent] = useState("classes");

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={2}>
          <Drawer setComponent={setComponent} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <div className={classes.wrapper}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={classes.large}
            />
            <FormButton message="Cambiar" />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          {component === "classes" ? (
            <Classes setComponent={setComponent} />
          ) : component === "profile" ? (
            <Edit setComponent={setComponent} />
          ) : (
            <Calendar setComponent={setComponent} />
          )}
        </Grid>
      </Grid>
    );
  })
);
