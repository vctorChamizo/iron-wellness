import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getClass } from "../../../../lib/api/class.api";
import { addUserClass, removeUserClass } from "../../../../lib/api/user.api";
import {
  useSetUser,
  useSetSnackbar,
  useSetDialog,
} from "../../../../lib/redux/action";

import { Loading } from "../../PopUp/Loading/index";
import { ListUser } from "./ListUser";

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
    margin: "4.5vh 0 6.5vh 0",
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
  wrapperDescription: {
    overflow: "scroll",
    height: "15vh",
  },
}));

export const Class = connect((state) => ({ user: state.user }))(
  withRouter(({ history, user, dispatch }) => {
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
        .catch((e) => {
          if (e.response?.data.status == "BadRequest")
            return history.push("/notfound");
        })
        .finally(setLoading(false));
    }, []);

    let date = undefined;
    if (dataClass.date) date = new Date(dataClass.date);

    const level =
      dataClass.level == "BEGGINER"
        ? "PRINCIPIANTE"
        : dataClass.level == "MEDIUM"
        ? "MEDIO"
        : "PROFESIONAL";

    const place =
      dataClass.activity?.type == "OUTDOOR" ? "EXTERIOR" : "INTERIOR";

    const handleSanckBar = (message, severity) =>
      dispatch(useSetSnackbar({ message, severity, open: true }));

    const handleAddClass = async (_class) => {
      setLoading(true);
      try {
        if (userList.findIndex((e) => e._id === user._id)) {
          await addUserClass(_class._id);

          const newList = [...userList];
          newList.push(user);
          setUserList(newList);

          user.classes.push(_class);
          dispatch(useSetUser(user));

          handleSanckBar("Has sido añadido a la clase", "success");
        } else {
          handleSanckBar("Ya estás añadido a la clase", "info");
        }
      } catch (error) {
        if (error.response)
          handleSanckBar("Ha ocurrido un error. Vuelve a intentarlo.", "error");
      }
      setLoading(false);
    };

    const handleRemoveClass = async (_class) => {
      dispatch(
        useSetDialog({
          open: false,
        })
      );
      setLoading(true);

      try {
        await removeUserClass(_class._id);

        const index = userList.findIndex((e) => e._id === user._id);
        setUserList([...userList].splice(index, index));

        const indexClassUser = user.classes.findIndex(
          (e) => e._id === _class._id
        );
        user.classes.splice(indexClassUser, 1);
        dispatch(useSetUser(user));

        handleSanckBar("Has sido eliminado de la clase", "success");
      } catch (error) {
        if (error.response)
          handleSanckBar("Ha ocurrido un error. Vuelve a intentarlo.", "error");
      }
      setLoading(false);
    };

    const handleClickRemoveClass = (_class) => {
      if (userList.findIndex((e) => e._id == user._id) === -1)
        handleSanckBar("No estás apuntado a la clase", "info");
      else
        dispatch(
          useSetDialog({
            executeOperation: handleRemoveClass,
            data: _class,
            open: true,
            message: "¿Estás seguro que quieres desapuntarte de la clase?",
          })
        );
    };

    return (
      <>
        <Loading open={loading} />
        <div className={classes.root}>
          <div>
            <div className={classes.wrapperTitle}>
              <p className={classes.title}>{dataClass.name}</p>
              <div className={classes.wrapperButton}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddClass(dataClass)}
                >
                  Añadir
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleClickRemoveClass(dataClass)}
                >
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
                {date &&
                  `${date.getDate()}-${String(date.getMonth() + 1).padStart(
                    2,
                    "0"
                  )}-${date.getFullYear()}`}
              </div>
              <div className={classes.wrapperInfo}>
                <QueryBuilderIcon className={classes.icon} />
                {date &&
                  `${String(date.getHours()).padStart(2, "0")}:${String(
                    date.getMinutes()
                  ).padStart(2, "0")}`}
              </div>
              <div className={classes.wrapperInfo}>
                <FitnessCenterIcon className={classes.icon} />
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

                  <div className={classes.wrapperDescription}>
                    <p className={classes.titleDescription}>
                      {dataClass.activity?.description}
                    </p>
                  </div>

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
                    src={dataClass.trainer?.image?.url || ""}
                    className={classes.large}
                  />
                  <Divider className={classes.divider} />
                  <p className={classes.titleTrainer}>
                    {dataClass.trainer?.name} {dataClass.trainer?.surname}
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
  })
);
