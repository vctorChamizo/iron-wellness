import "date-fns";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Edit } from "./Edit";
import { Classes } from "./Classes/index";
import { Calendar } from "./Calendar";
import { Menu } from "./Drawer/index";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    width: "100%",
    padding: "5vh 5vw",
  },
}));

export const Profile = connect((state) => ({ user: state.user }))(
  withRouter(({ user, history, dispatch }) => {
    const classes = useStyles();

    const [component, setComponent] = useState("classes");

    return (
      <div className={classes.root}>
        <Menu setComponent={setComponent} history={history} />
        <div className={classes.container}>
          {component === "classes" ? (
            <Classes classesList={user.classes || []} />
          ) : component === "profile" ? (
            <Edit user={user} dispatch={dispatch} />
          ) : (
            <Calendar events={user?.classes || []} history={history} />
          )}
        </div>
      </div>
    );
  })
);
