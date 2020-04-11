import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "5vh 5vw",
  },
  list: {
    width: "100%",
  },
  item: {
    display: "block",
  },
  paper: {
    margin: "2.5vh 0%",
  },
}));

export const Classes = () => {
  const classes = useStyles();

  const handleClick = (value) => () => {};

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Clases
      </Typography>

      <List className={classes.list}>
        {[0, 1].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <Paper className={classes.paper}>
              <ListItem
                className={classes.item}
                key={value}
                role={undefined}
                button
                onClick={handleClick(value)}
              >
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />

                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          );
        })}
      </List>
    </div>
  );
};
