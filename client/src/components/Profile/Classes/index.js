import React from "react";

import { Level } from "./Level";

import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  wrapperClassesMain: {
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
  title: {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "300",
    fontSize: "1.5rem",
    margin: 0,
    marginBottom: "1.5vh",
    color: theme.palette.primary.main,
    textTransform: "uppercase",
  },
  divider: {
    marginBottom: "2.5vh",
  },
}));

export const Classes = ({ classesList }) => {
  const classes = useStyles();

  const begginer = [];
  const medium = [];
  const professional = [];

  if (classesList.length > 0)
    classesList.forEach((e) => {
      if (e.level == "BEGGINER") begginer.push(e);
      else if (e.level == "MEDIUM") medium.push(e);
      else professional.push(e);
    });

  return (
    <>
      <section className={classes.wrapperClassesMain}>
        <div className={classes.wrapperTitleExersice}>
          <p className={classes.title}>CLASES</p>
          <Divider className={classes.divider} />
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
