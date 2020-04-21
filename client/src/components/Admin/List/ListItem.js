import React from "react";

import { Item } from "./Item";

import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  item: {
    margin: "1.5vh 1.5vw",
  },
});

export const ListItem = ({ children, type, handleRemove }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {children.map((e, i) => (
        <div key={i} className={classes.item}>
          <Item type={type} handleRemove={handleRemove}>
            {e}
          </Item>
        </div>
      ))}
    </List>
  );
};
