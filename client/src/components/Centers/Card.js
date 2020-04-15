import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  card: {
    width: "25vw",
    height: "55vh",
  },
  content: {
    textAlign: "center",
  },
}));

export const CardCenter = ({ center }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={center.image?.url || " "}
        title="Paella dish"
      />
      <CardContent className={classes.content}>
        <Typography variant="h4">{center.name}</Typography>
        <Typography variant="body2" display="block">
          {center.city}
        </Typography>
        <Typography variant="overline" display="block">
          {center.community}
        </Typography>
      </CardContent>
    </Card>
  );
};
