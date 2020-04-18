import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Loading } from "../../Loading";
import { ListUser } from "./ListUser";

import { getClass } from "../../../../lib/api/class.api";

import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import EventIcon from "@material-ui/icons/Event";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5vh 5vw",
  },
  title: {
    margin: 0,
    marginBottom: "2.5vh",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "300",
    fontSize: "3rem",
    color: theme.palette.primary.main,
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    height: "45vh",
    width: "33%",
    margin: "2.5vh 2.5vw",
    padding: "2.5vh 2.5vw",
  },
  paperUsers: {
    overflowY: "scroll",
    height: "45vh",
    width: "33%",
    margin: "2.5vh 2.5vw",
    padding: "2.5vh 2.5vw",
  },
  wrapperClass: {
    width: "70%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "1.5vh",
  },
  wrapperInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: "0.5vw",
  },
  containerInfo: {
    padding: "2.5vh 0 5vh 0",
    display: "flex",
    justifyContent: "center",
  },
  subtitle: {
    margin: 0,
    marginBottom: "2.5vh",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "300",
    color: theme.palette.primary.main,
    textAlign: "center",
  },
}));

export const Class = () => {
  const classes = useStyles();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [dataClass, setDataClass] = useState({});
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getClass(id)
      .then(({ data }) => {
        setDataClass(data);
        setUserList(data.students);
      })
      .catch((e) => console.error(e.response?.statusText))
      .finally(setLoading(false));
  }, []);

  console.log(dataClass);

  const date = new Date(dataClass.date);
  const level =
    dataClass.level == "BEGGINER"
      ? "PRINIPIANTE"
      : dataClass.level == "MEDIUM"
      ? "MEDIO"
      : "PROFESIONAL";

  return (
    <>
      <Loading open={loading} />
      <div className={classes.root}>
        <div>
          <p className={classes.title}>{dataClass.name}</p>
          <Divider />
        </div>
        <div className={classes.containerInfo}>
          <div className={classes.wrapperClass}>
            <div className={classes.wrapperInfo}>
              <EventIcon className={classes.icon} />
              {"  "}
              {`${date.getDate()}-${String(date.getMonth() + 1).padStart(
                2,
                "0"
              )}-${date.getFullYear()}`}
            </div>
            <div className={classes.wrapperInfo}>
              <QueryBuilderIcon className={classes.icon} />
              {"  "}
              {`${String(date.getHours()).padStart(2, "0")}:${String(
                date.getMinutes()
              ).padStart(2, "0")}`}
            </div>
            <div className={classes.wrapperInfo}>
              <FitnessCenterIcon className={classes.icon} />
              {"  "}
              {level}
            </div>
          </div>
        </div>

        <div className={classes.content}>
          <Paper className={classes.paper}>
            <div>
              <p className={classes.subtitle}>ACTIVIDAD</p>
              <Divider />
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <div>
              <p className={classes.subtitle}>ENTRENADOR</p>
              <Divider />
            </div>
          </Paper>
          <Paper className={classes.paperUsers}>
            <div>
              <p className={classes.subtitle}>PARTICIPANTES</p>
              <Divider />
              <ListUser>{userList}</ListUser>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};
