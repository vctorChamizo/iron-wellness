import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
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
  wrapperClass: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5vh 1.5vw 0 1.5vw",
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
}));

export const Item = ({ children, type }) => {
  const classes = useStyles();

  const ContentUser = ({ children }) => (
    <>
      <ListItem button>
        <ListItemAvatar>
          <Avatar alt="Avatar" src={children.image?.url || ""} />
        </ListItemAvatar>
        <ListItemText
          primary={children.name + " " + children.surname}
          secondary={children.username}
        />
      </ListItem>
    </>
  );

  const ContentExersice = ({ children }) => <></>;

  const ContentClass = ({ children }) => {
    const date = new Date(children.date);

    return (
      <ListItem className={classes.item} button>
        <p className={classes.title}>{children.name}</p>

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
            {`${String(date.getHours() - 2).padStart(2, "0")}:${String(
              date.getMinutes()
            ).padStart(2, "0")}`}
          </div>
        </div>
      </ListItem>
    );
  };

  const ContentCenter = ({ children }) => (
    <>
      <ListItem button>
        <ListItemAvatar>
          <Avatar alt="Avatar" src={children?.image.url} />
        </ListItemAvatar>
        <ListItemText primary={children.name} secondary={children.city} />
      </ListItem>
    </>
  );

  const contentSegreggation = (type, children) => {
    switch (type) {
      case "trainer":
      case "user":
        return <ContentUser>{children}</ContentUser>;
      case "exersice":
        return <ContentExersice>{children}</ContentExersice>;
      case "center":
        return <ContentCenter>{children}</ContentCenter>;
      case "class":
        return <ContentClass>{children}</ContentClass>;
    }
  };

  return <Paper>{contentSegreggation(type, children)}</Paper>;
};
