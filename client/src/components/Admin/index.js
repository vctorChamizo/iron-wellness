import "date-fns";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Profile } from "./Components/Profile";
import { User } from "./Components/User";
import { Trainer } from "./Components/Trainer";
import { Class } from "./Components/Class";
import { Exersice } from "./Components/Exersice";
import { Center } from "./Components/Center";
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

    const [component, setComponent] = useState("classes");

    const ComponentSegreggation = (component) => {
      switch (component) {
        case "profile":
          return <Profile />;
        case "users":
          return <User />;
        case "trainer":
          return <Trainer />;
        case "exersice":
          return <Exersice />;
        case "centers":
          return <Center />;
        case "classes":
          return <Class />;
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
          <Grid item xs={12} sm={10}>
            {ComponentSegreggation(component)}
          </Grid>
        </Grid>
      </div>
    );
  })
);
