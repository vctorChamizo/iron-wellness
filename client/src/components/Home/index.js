import React from "react";
import { withRouter } from "react-router-dom";

import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PersonIcon from "@material-ui/icons/Person";
import { Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${"https://res.cloudinary.com/vctorchzr/image/upload/v1587136601/iron-wellness/components/main/main-3_ppfh3r.jpg"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  wrapper: {
    backgroundColor: "rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "87vh",
  },
  paper: {
    backgroundColor: "rgba(79, 82, 88, 0.5)",
    padding: "10vh 5vw",
    margin: "0 2.5vw",
    color: theme.palette.primaryText,
    textAlign: "center",
    cursor: "pointer",
    "&:hover": {
      padding: "11vh 6vw",
      margin: "0 1.5vw",
    },
  },
  icon: {
    width: "20vh",
    height: "30vh",
  },
}));

export const Home = withRouter(({ history }) => {
  const classes = useStyles();

  const handleClick = (path) => {
    history.push(`/${path}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Paper className={classes.paper} onClick={() => handleClick("profile")}>
          <PersonIcon className={classes.icon} />
          <Typography variant="h4">Perfil</Typography>
        </Paper>
        <Paper
          className={classes.paper}
          onClick={() => handleClick("training")}
        >
          <FitnessCenterIcon className={classes.icon} />
          <Typography variant="h4">Entranamiento</Typography>
        </Paper>
        <Paper
          className={classes.paper}
          onClick={() => handleClick("nutrition")}
        >
          <FavoriteBorderIcon className={classes.icon} />
          <Typography variant="h4">Nutrición</Typography>
        </Paper>
      </div>
    </div>
  );
});
