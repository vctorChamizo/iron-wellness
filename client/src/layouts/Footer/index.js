import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    height: "25vh",
    borderTop: "1vh solid #ff500b",
    display: "flex",
    padding: "2.5vh 0",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  wrapperFlex: {
    marginTop: "5vh",
    width: "50%",
    display: "flex",
    justifyContent: "space-evenly",
  },
  icon: {
    width: "2.5vw",
    cursor: "pointer",
  },
  link: {
    marginTop: "2.5vh",
    textDecoration: "none",
    color: theme.palette.primaryText,
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 100,
    fontSize: "1.2em",
  },
}));

export const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <div className={classes.wrapperFlex}>
        <a href="https://www.linkedin.com/in/victorchamizo/" target="_blank">
          {" "}
          <img
            className={classes.icon}
            src="https://res.cloudinary.com/vctorchzr/image/upload/v1587127728/iron-wellness/logos/linkedin_dcaclz.svg"
          ></img>
        </a>
        <a href="https://github.com/vctorChamizo" target="_blank">
          <img
            className={classes.icon}
            src="https://res.cloudinary.com/vctorchzr/image/upload/v1587127728/iron-wellness/logos/github_s5bznl.svg"
          ></img>
        </a>

        <a href="https://wa.me/650074740" target="_blank">
          <img
            className={classes.icon}
            src="https://res.cloudinary.com/vctorchzr/image/upload/v1587127728/iron-wellness/logos/whatsapp_jwekp2.svg"
          ></img>
        </a>

        <a href="mailto:victor.chamizo96@gmail.com" target="_blank">
          <img
            className={classes.icon}
            src="https://res.cloudinary.com/vctorchzr/image/upload/v1587127728/iron-wellness/logos/main_ppymad.svg"
          ></img>
        </a>
      </div>
      <div className={classes.wrapperFlex}>
        <a
          className={classes.link}
          href="https://github.com/vctorChamizo/iron-wellness"
          target="_blank"
        >
          Conoce el proyecto
        </a>
      </div>
    </footer>
  );
};
