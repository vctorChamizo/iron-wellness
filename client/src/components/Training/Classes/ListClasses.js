import React from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Paper from "@material-ui/core/Paper";
import EventIcon from "@material-ui/icons/Event";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5vh 5vw 0 1.5vw",
  },
  wrapperInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  iconAdd: {
    position: "fixed",
  },
}));

export const ListClasses = withRouter(({ history, classesList }) => {
  const classes = useStyles();

  const handleClickRedirectClass = (id) => () => history.push(`/class/${id}`);

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {classesList.map((value) => {
          const date = new Date(value.date);

          return (
            <Paper
              key={value._id}
              className={classes.paper}
              onClick={handleClickRedirectClass(value._id)}
            >
              <ListItem className={classes.item} button>
                <p className={classes.title}>{value.name}</p>

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
              </ListItem>
            </Paper>
          );
        })}
      </List>
    </div>
  );
});
