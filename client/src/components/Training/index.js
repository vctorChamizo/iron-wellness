import React from "react";
import { withRouter } from "react-router-dom";

import YouTubeIcon from "@material-ui/icons/YouTube";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { Paper, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${"https://res.cloudinary.com/vctorchzr/image/upload/v1587142858/iron-wellness/components/main/main-4_sp94qq.jpg"})`,
    backgroundPosition: "bottom",
    backgroundSize: "cover",
  },
  link: {
    textDecoration: "none",
  },
  wrapper: {
    backgroundColor: "rgba(0,0,0,0.2)",
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

export const Training = withRouter(({ history }) => {
  const classes = useStyles();

  const handleClick = (path) => {
    history.push(`/${path}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Paper className={classes.paper} onClick={() => handleClick("classes")}>
          <EventNoteIcon className={classes.icon} />
          <Typography variant="h4">Clases</Typography>
        </Paper>
        <a
          className={classes.link}
          href="https://www.youtube.com/channel/UC7GiwW77J9WNv4CnJ9xGNEA/featured"
          target="_blank"
        >
          <Paper className={classes.paper}>
            <YouTubeIcon className={classes.icon} />
            <Typography variant="h4">Clases Virtuales</Typography>
          </Paper>
        </a>

        <Paper
          className={classes.paper}
          onClick={() => handleClick("exersice")}
        >
          <img
            className={classes.icon}
            src="https://res.cloudinary.com/vctorchzr/image/upload/v1587139011/iron-wellness/logos/exersice_tkvafu.svg"
          ></img>
          <Typography variant="h4">Ejercicios</Typography>
        </Paper>
      </div>
    </div>
  );
});
