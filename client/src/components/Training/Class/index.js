import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";

import { Loading } from "../../Loading";
import { ListUser } from "./ListUser";

import { getClass } from "../../../../lib/api/class.api";

import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import EventIcon from "@material-ui/icons/Event";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

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
  wrapperTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapperButton: {
    width: "20%",
    display: "flex",
    justifyContent: "space-evenly",
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
  large: {
    width: "13vh",
    height: "13vh",
  },
  wrapperTrainer: {
    padding: "2.5vh 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  titleTrainer: {
    marginTop: "5vh",
    fontFamily: '"Roboto", sans-serif',
    fontSize: "1.5rem",
    textTransform: "uppercase",
    fontWeight: "300",
  },
  subtitleTrainer: {
    marginTop: "4.5vh",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "500",
    color: theme.palette.secondary.main,
  },
  divider: {
    width: "20%",
    backgroundColor: theme.palette.primary.main,
  },
  subtitlePlace: {
    margin: 0,
    marginTop: "5vh",
  },
  place: {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "500",
    color: theme.palette.primary.main,
  },
  titleDescription: {
    textAlign: "center",
    margin: "2.5vh 0 5vh 0",
    fontFamily: '"Roboto", sans-serif',
    fontSize: "1rem",
    fontWeight: "100",
    color: theme.palette.secondary.main,
  },
}));

export const Class = withRouter(({ history }) => {
  const classes = useStyles();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [dataClass, setDataClass] = useState({});
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getClass(id)
      .then(({ data }) => {
        if (!data) history.push("/notfound");
        setDataClass(data);
        setUserList(data.students);
      })
      .catch((e) => console.error(e.response?.statusText))
      .finally(setLoading(false));
  }, []);

  const date = new Date(dataClass.date);
  const level =
    dataClass.level == "BEGGINER"
      ? "PRINIPIANTE"
      : dataClass.level == "MEDIUM"
      ? "MEDIO"
      : "PROFESIONAL";

  const place =
    dataClass.activity?.place == "OUTDOOR" ? "EXTERIOR" : "INTERIOR";

  return (
    <>
      <Loading open={loading} />
      <div className={classes.root}>
        <div>
          <div className={classes.wrapperTitle}>
            <p className={classes.title}>{dataClass.name}</p>
            <div className={classes.wrapperButton}>
              <Button variant="contained" color="primary">
                Añadir
              </Button>
              <Button variant="outlined" color="secondary">
                Quitar
              </Button>
            </div>
          </div>

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
              <div className={classes.wrapperTrainer}>
                <p className={classes.titleTrainer}>
                  {dataClass.activity?.name}
                </p>
                <p className={classes.titleDescription}>
                  {dataClass.activity?.description}
                </p>
                <Divider className={classes.divider} />
                <p className={classes.subtitlePlace}>
                  ACTIVIDAD <span className={classes.place}>{place}</span>
                </p>
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <div>
              <p className={classes.subtitle}>ENTRENADOR</p>
              <Divider />
              <div className={classes.wrapperTrainer}>
                <Avatar
                  alt="Avatar"
                  src={dataClass.trainer?.image.url || ""}
                  className={classes.large}
                />
                <p className={classes.titleTrainer}>
                  {dataClass.trainer?.name} {dataClass.trainer?.surname}
                </p>
                <Divider className={classes.divider} />
                <p className={classes.subtitleTrainer}>
                  {dataClass.trainer?.username}
                </p>
              </div>
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
});
