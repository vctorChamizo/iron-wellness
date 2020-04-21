import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getCenters } from "../../../lib/api/center.api";

import { Loading } from "../Loading";
import { AuthDialog } from "../Auth/AuthDialog";
import { Slider } from "./Slider";
import { Footer } from "../../layouts/Footer";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  backgroundMain: {
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
  backgroundMiddle: {
    height: "90vh",
    padding: "5vh 0",
  },
  wrapperMiddle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "2.5vh 0 5vh 0",
    color: theme.palette.secondary.main,
  },
  divider: {
    margin: "5vh 0",
    width: "60%",
    backgroundColor: theme.palette.primary.main,
  },
  paragraph: {
    margin: "0",
    lineHeight: "2em",
  },
  backgroundLast: {
    backgroundImage: `url(${"https://res.cloudinary.com/vctorchzr/image/upload/v1587054506/iron-wellness/components/main/main-2_pfq7px.jpg"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  wrapperLast: {
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
    padding: "10.5vh 5vw",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 100,
    fontSize: "1.3rem",
  },
  bold: {
    fontWeight: 300,
    color: theme.palette.primary.main,
  },
  trainerParagraph: {
    margin: "10.5vh 10vw 0 0",
    width: "60%",
    lineHeight: "1.5em",
  },
  titleCenters: {
    cursor: "pointer",
    transition: "linear 0.2s",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export const Root = connect((state) => ({ user: state.user }))(
  withRouter(({ user, history }) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [centers, setCenters] = useState([]);

    useEffect(() => {
      getCenters()
        .then(({ data }) => setCenters(data))
        .catch((e) => console.error(e.response?.statusText))
        .finally(setLoading(false));
    }, []);

    const [openDialog, setOpenDialog] = useState(false);
    const [component, setComponent] = useState("Login");

    const handleClick = (path) => {
      user ? history.push(`/${path}`) : setOpenDialog(true);
    };

    return (
      <>
        <Loading open={loading} />
        <section className={classes.backgroundMain}>
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
            <Button
              className={classes.buttonMain}
              onClick={() => handleClick("home")}
            >
              Únete a nosotros!
            </Button>
          </div>
        </section>

        <section className={classes.backgroundMiddle}>
          <div className={classes.wrapperMiddle}>
            <Typography
              variant="h4"
              className={classes.titleCenters}
              onClick={() => history.push("/centers")}
            >
              NUESTROS CENTROS
            </Typography>
            <Divider className={classes.divider} />
            <p className={classes.paragraph}>
              Disfruta en Iron Wellness de los mejores Clubs deportivos y de
              ocio.
              <br />
              Elige tu centro y empieza a disfrutar.
            </p>

            <Divider className={classes.divider} />
          </div>

          <Slider slideData={centers} />
        </section>

        <section className={classes.backgroundLast}>
          <div className={classes.wrapperLast}>
            <Typography variant="h2">ENTRENAMIENTOS</Typography>

            <div className={classes.wrapperSubtitle}>
              <p>
                Desde el primer momento tendrás diferentes sistemas de
                entrenamiento.
              </p>

              <p className={classes.trainerParagraph}>
                Accede a las{" "}
                <span className={classes.bold}>clases virtuales</span>, sigue tu{" "}
                <span className={classes.bold}>plan semanal</span> desde casa o{" "}
                <span className={classes.bold}>apúntate</span> a la siguiente
                clase de tu cernto deportivo.
              </p>
              <Button
                className={classes.buttonMain}
                onClick={() => handleClick("training")}
              >
                Alcanza tus metas!
              </Button>
            </div>
          </div>
        </section>

        <Footer />

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
