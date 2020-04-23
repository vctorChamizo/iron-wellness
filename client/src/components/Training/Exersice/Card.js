import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  media: {
    height: "100%",
  },
  card: {
    width: "17.5vw",
    height: "30vh",
    cursor: "pointer",
  },
  title: {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "300",
    fontSize: "1.2rem",
    paddingLeft: "1vw",
  },
}));

export const CardExersice = ({ exersice }) => {
  const classes = useStyles();

  const formatDay = (day) => {
    switch (day) {
      case 1:
        return "LUNES";
      case 2:
        return "MARTES";
      case 3:
        return "MIERCOLES";
      case 4:
        return "JUEVES";
      case 5:
        return "VIERNES";
      case 6:
        return "SABADO";
      case 7:
        return "DOMINGO";
    }
  };

  return (
    <Card className={classes.card}>
      <p className={classes.title}>{formatDay(exersice.day)}</p>
      <CardMedia
        className={classes.media}
        image={exersice.image?.url || " "}
        title={formatDay(exersice.day)}
      />
    </Card>
  );
};
