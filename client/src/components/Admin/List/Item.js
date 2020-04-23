import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import EventIcon from "@material-ui/icons/Event";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5vh 1.5vw",
  },
  wrapperClass: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "1.5vh",
  },
  wrapperInfo: {
    color: "#555",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "1.5vw",
  },
  icon: {
    marginRight: "0.5vw",
  },
  title: {
    color: theme.palette.primary.main,
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "300",
    fontSize: "1.2rem",
    margin: 0,
    paddingTop: "1vh",
  },
  item: {
    display: "block",
  },
}));

export const Item = ({ children, type, handleRemove }) => {
  const classes = useStyles();

  const ContentUser = ({ children }) => (
    <>
      <ListItemAvatar>
        <Avatar alt="Avatar" src={children.image?.url || ""} />
      </ListItemAvatar>
      <ListItemText
        primary={children.name + " " + children.surname}
        secondary={children.username}
      />
    </>
  );

  const ContentActivity = ({ children }) => (
    <div>
      <p className={classes.title}>{children.name}</p>
      <ListItemText secondary={children.type} />
    </div>
  );

  const ContentClass = ({ children }) => {
    const date = new Date(children.date);

    return (
      <div className={classes.item}>
        <p className={classes.title}>{children.name}</p>
        <div className={classes.wrapperClass}>
          <div className={classes.wrapperInfo}>
            <EventIcon className={classes.icon} />
            {`${date.getDate()}-${String(date.getMonth() + 1).padStart(
              2,
              "0"
            )}-${date.getFullYear()}`}
          </div>
          <div className={classes.wrapperInfo}>
            <QueryBuilderIcon className={classes.icon} />
            {`${String(date.getHours()).padStart(2, "0")}:${String(
              date.getMinutes()
            ).padStart(2, "0")}`}
          </div>
        </div>
      </div>
    );
  };

  const contentSegreggation = (type, children) => {
    switch (type) {
      case "trainer":
      case "user":
        return <ContentUser>{children}</ContentUser>;
      case "activity":
        return <ContentActivity>{children}</ContentActivity>;
      case "class":
        return <ContentClass>{children}</ContentClass>;
    }
  };

  return (
    <Paper>
      <ListItem button className={classes.root}>
        {contentSegreggation(type, children)}
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleRemove(children._id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
};
