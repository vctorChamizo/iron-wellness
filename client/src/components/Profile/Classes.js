import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import EventIcon from "@material-ui/icons/Event";

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
  wrapperClass: {
    width: "25%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "1.5vh",
  },
  wrapperInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: "0.5vw",
  },
}));

export const Classes = ({ classesList, history }) => {
  const classes = useStyles();

  const handleClick = (id) => () => history.push(`/class/${id}`);

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Clases
      </Typography>

      <List className={classes.list}>
        {classesList.map((value) => {
          let date = new Date(value.date);

          return (
            <Paper key={value} className={classes.paper}>
              <ListItem
                className={classes.item}
                key={value._id}
                button
                onClick={handleClick(value._id)}
              >
                <Typography variant="h5" gutterBottom>
                  {value.name}
                </Typography>
                <div className={classes.wrapperClass}>
                  <div className={classes.wrapperInfo}>
                    <EventIcon className={classes.icon} />
                    {"  "}
                    {`${date.getDate()}-${String(date.getMonth() + 1).padStart(
                      2,
                      "0"
                    )}-${date.getFullYear()}`}
                  </div>
                  <div className={classes.wrapperInfo}>
                    <QueryBuilderIcon className={classes.icon} />
                    {"  "}
                    {`${String(date.getHours()).padStart(2, "0")}:${String(
                      date.getMinutes()
                    ).padStart(2, "0")}`}
                  </div>
                </div>

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
