import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import TodayIcon from "@material-ui/icons/Today";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: "2.5vh",
  },
}));

export const ItemList = ({ type, handleClick }) => {
  const classes = useStyles();

  const handleIcon = (type) => {
    switch (type) {
      case "users":
        return <PeopleAltIcon />;
      case "trainers":
        return <AccessibilityNewIcon />;
      case "activities":
        return <FitnessCenterIcon />;
      case "classes":
        return <TodayIcon />;
      case "logout":
        return <ExitToAppIcon />;
    }
  };

  const handleTitle = (type) => {
    switch (type) {
      case "users":
        return "Usuarios";
      case "trainers":
        return "Entrenadores";
      case "activities":
        return "Actividades";
      case "classes":
        return "Clases";
      case "logout":
        return "Cerrar Sesion";
    }
  };

  return (
    <ListItem className={classes.item} button onClick={() => handleClick(type)}>
      <ListItemIcon>{handleIcon(type)}</ListItemIcon>
      <ListItemText primary={handleTitle(type)} />
    </ListItem>
  );
};
