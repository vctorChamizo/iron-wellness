import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AuthDialog } from "../Auth/AuthDialog";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${"https://res.cloudinary.com/vctorchzr/image/upload/v1587054507/iron-wellness/components/main/main-1_rzmtvi.jpg"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  wrapperTitle: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: "20vh 0 30vh 10vw",
    fontSize: "2.5rem",
  },
  wrapperCenters: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "2.5vh 2.5vw",
  },
  wrapper: {
    margin: "5vh 2.5vw",
  },
  homeTitle: {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "100",
    fontSize: "2.8rem",
    margin: "0",
  },
  spanTitle: {
    fontStyle: "italic",
  },
  wrapperSubtitle: {
    marginTop: "2.5vh",
  },
  buttonMain: {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "100",
    fontSize: "1.8rem",
    marginTop: "5vh",
    padding: "1vh 1vw",
    color: theme.palette.primaryText,
    backgroundColor: "rgba(255, 80, 11, 0.6)",
    "&:hover": {
      backgroundColor: "rgba(255, 80, 11, 0.6)",
      color: theme.palette.primaryText,
    },
  },
}));

export const Root = connect((state) => ({ user: state.user }))(
  withRouter(({ user, history }) => {
    const classes = useStyles();

    const [openDialog, setOpenDialog] = useState(false);
    const [component, setComponent] = useState("Login");

    const handleClick = () => {
      console.log("USER", user);
      user ? history.push("/home") : setOpenDialog(true);
    };

    return (
      <>
        <section className={classes.background}>
          <div className={classes.wrapperTitle}>
            <p className={classes.homeTitle}>
              <span className={classes.spanTitle}>mywellness!</span> HOME
            </p>
            <Typography variant="h2">TU GYM EN CASA</Typography>

            <div className={classes.wrapperSubtitle}>
              <Typography variant="subtitle1">
                Mantente en forma, gestiona tus clases, entrenamientos
              </Typography>
              <Typography variant="subtitle1">
                virtuales e información de interés.
              </Typography>
            </div>
            <Button className={classes.buttonMain} onClick={handleClick}>
              Únete a nosotros!
            </Button>
          </div>
        </section>
        <AuthDialog
          open={openDialog}
          component={component}
          setComponent={setComponent}
          setOpenDialog={setOpenDialog}
        />
      </>
    );
  })
);
