import React, { useState, useEffect } from "react";

import { Loading } from "../../PopUp/Loading/index";
import { Calendar } from "./Calendar";
import { Level } from "./Level";

import { getClasses } from "../../../../lib/api/class.api";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${"https://res.cloudinary.com/vctorchzr/image/upload/v1587221136/iron-wellness/components/classes/classes-main_r4pies.jpg"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  wrapperTitle: {
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#fff",
    padding: "30vh 0 40vh 10vw",
  },
  wrapperClassesMain: {
    backgroundColor: theme.palette.contrast.main,
    padding: "5vh 2.5vw 5vh 5vh",
  },
  title: {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "300",
    fontSize: "3rem",
    margin: 0,
    marginBottom: "1.5vh",
    color: theme.palette.primary.main,
  },
  wrapperCalendar: {
    padding: "5vh 5vw",
  },
  wrapperClasses: {
    padding: "2.5vh 2.vw",
    display: "flex",
    justifyContent: "spce-between",
    alignItems: "flex-start",
  },
}));

export const Classes = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [dataClasses, setDataClasses] = useState([]);

  const begginer = [];
  const medium = [];
  const professional = [];

  useEffect(() => {
    getClasses()
      .then(({ data }) => setDataClasses(data))
      .finally(setLoading(false));
  }, []);

  if (dataClasses.length > 0)
    dataClasses.forEach((e) => {
      if (e.level == "BEGGINER") begginer.push(e);
      else if (e.level == "MEDIUM") medium.push(e);
      else professional.push(e);
    });

  return (
    <>
      <Loading open={loading} />
      <section className={classes.background}>
        <div className={classes.wrapperTitle}>
          <Typography variant="h2" component="h2">
            CLASES
          </Typography>
          <Typography variant="subtitle1">
            Encuentra la clase que más te guste y reserva tu plaza.
          </Typography>
          <Typography variant="subtitle1">
            Podrás gestionarlas desde tu perfil.
          </Typography>
        </div>
      </section>

      <section className={classes.wrapperClassesMain}>
        <div className={classes.wrapperTitleExersice}>
          <p className={classes.title}>VISUALIZA TUS CLASES</p>
          <Divider />
        </div>
        <div className={classes.wrapperCalendar}>
          <Calendar events={dataClasses} history={history} />
        </div>
      </section>
      <section className={classes.wrapperClassesMain}>
        <div className={classes.wrapperTitleExersice}>
          <p className={classes.title}>SELECCIONA POR NIVELES</p>
          <Divider />
        </div>

        <div className={classes.wrapperClasses}>
          <Level title="PRINCIPIANTE" list={begginer}></Level>
          <Level title="MEDIO" list={medium}></Level>
          <Level title="PROFESIONAL" list={professional}></Level>
        </div>
      </section>
    </>
  );
};
