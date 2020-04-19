import React from "react";

import { Item } from "./Item";

import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export const ListItem = ({ children }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {children.map((e, i) => (
        <Item key={i}>{e}</Item>
      ))}
    </List>
  );
};
