import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "1vh solid #ff500b",
  },
  divider: {
    margin: "2.5vh 0",
    width: "20%",
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    margin: "0",
    marginTop: "2.5vh",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "500",
    fontSize: "1.3rem",
  },
  city: {
    margin: "0",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "100",
  },
  community: {
    margin: "0",
    marginTop: "2.5vh",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "100",
    fontSize: "1.1rem",
    textTransform: "uppercase",
  },
}));

export const CardCenter = ({ center }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={center.image?.url || " "}
        title={center.name}
      />
      <CardContent className={classes.content}>
        <p className={classes.title}>{center.name}</p>
        <Divider className={classes.divider} />
        <p className={classes.city}>{center.city}</p>
        <p className={classes.community}>{center.community}</p>
      </CardContent>
    </Card>
  );
};
