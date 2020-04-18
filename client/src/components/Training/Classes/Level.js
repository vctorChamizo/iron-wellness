import React, { useState, useEffect } from "react";

import { ListClasses } from "./ListClasses";

import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  wrapperLevel: {
    width: "33%",
    padding: "2.5vh 2.5vw",
  },
  divider: {
    margin: "2.5vh 0",
    width: "80%",
    backgroundColor: theme.palette.primary.main,
  },
}));

export const Level = ({ title, list }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapperLevel}>
      <p>{title}</p>
      <Divider className={classes.divider} />
      <ListClasses classesList={list} />
    </div>
  );
};
