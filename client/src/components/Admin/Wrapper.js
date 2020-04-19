import React from "react";

import { ListItem } from "./List/ListItem";
import { Form } from "./Forms/index";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5vh 2.5vw",
  },
  container: {
    display: "flex",
  },
  wrapperMain: {
    margin: "2.5vh 2.5vw",
    width: "50%",
  },
  wrapperForm: {
    margin: "0 2.5vw",
    width: "50%",
  },
  paper: {
    padding: "1.5vh 1.5vw",
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

export const Wrapper = ({ list, object, setObject, type }) => {
  const classes = useStyles();

  console.log(type);

  const formayTitle = (type) => {
    switch (type) {
      case "trainer":
        return "ENTRENADORES";
      case "exersice":
        return "EJERCICIOS";
      case "center":
        return "CENTROS";
      case "class":
        return "CLASES";
      case "user":
        return "USUARIOS";
    }
  };

  return (
    <div className={classes.root}>
      <p className={classes.title}>{formayTitle(type)}</p>
      <Divider className={classes.divider} />
      <div className={classes.container}>
        <div className={classes.wrapperMain}>
          <Paper className={classes.paper}>
            <ListItem>{list}</ListItem>
          </Paper>
        </div>
        <div className={classes.wrapperForm}>
          <Form type={type} object={object} setOnject={setObject} />
        </div>
      </div>
    </div>
  );
};
