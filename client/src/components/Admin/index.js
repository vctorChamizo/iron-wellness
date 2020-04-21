import "date-fns";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { User } from "./Components/User";
import { Trainer } from "./Components/Trainer";
import { Class } from "./Components/Class";
import { Activity } from "./Components/Activity";
import { Menu } from "./Drawer/index";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export const Admin = connect((state) => ({ user: state.user }))(
  withRouter(({ user, history, dispatch }) => {
    const classes = useStyles();

    const [component, setComponent] = useState("users");

    const ComponentSegreggation = (component) => {
      switch (component) {
        case "trainers":
          return <Trainer dispatch={dispatch} />;
        case "activities":
          return <Activity dispatch={dispatch} />;
        case "classes":
          return <Class dispatch={dispatch} />;
        case "users":
          return <User dispatch={dispatch} />;
      }
    };

    return (
      <div className={classes.root}>
        <Menu
          setComponent={setComponent}
          user={user}
          history={history}
          dispatch={dispatch}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            {ComponentSegreggation(component)}
          </Grid>
        </Grid>
      </div>
    );
  })
);
