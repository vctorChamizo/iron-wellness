import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import TodayIcon from "@material-ui/icons/Today";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: "2.5vh",
  },
}));

export const ItemList = ({ type, handleClick }) => {
  const classes = useStyles();

  const handleIcon = (type) => {
    switch (type) {
      case "profile":
        return <AccountBoxIcon />;
      case "classes":
        return <FitnessCenterIcon />;
      case "calendar":
        return <TodayIcon />;
      case "logout":
        return <ExitToAppIcon />;
    }
  };

  const handleTitle = (type) => {
    switch (type) {
      case "profile":
        return "Perfil";
      case "classes":
        return "Clases";
      case "calendar":
        return "Calendario";
      case "logout":
        return "CerrarSesion";
    }
  };

  return (
    <ListItem className={classes.item} button onClick={() => handleClick(type)}>
      <ListItemIcon>{handleIcon(type)}</ListItemIcon>
      <ListItemText primary={handleTitle(type)} />
    </ListItem>
  );
};
