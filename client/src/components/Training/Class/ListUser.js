import React from "react";

import { ItemUser } from "./ItemUser";

import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export const ListUser = ({ children }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {children.map((e, i) => (
        <ItemUser key={i}>{e}</ItemUser>
      ))}
    </List>
  );
};
