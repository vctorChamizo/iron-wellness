import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";

import { getActivities } from "../../../../lib/api/activity.api";
import { getUsersByType } from "../../../../lib/api/user.api";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    marginTop: "1vh",
  },
  title: {
    color: theme.palette.primary.main,
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "300",
    fontSize: "1rem",
    margin: 0,
    paddingTop: "1vh",
  },
  control: {
    margin: "1.5vh 0",
    padding: "0 1vw",
  },
  date: {
    marginBottom: "1.5vh",
  },
}));

export const FormClass = ({ register, errors, control }) => {
  const classes = useStyles();

  const date = new Date();

  const currentDate = `${date.getFullYear()}-${String(date.getMonth()).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}T${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  const [activities, setActivities] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    getUsersByType("TRAINER")
      .then(({ data }) => setTrainers(data))
      .catch((e) => console.error(e.response?.statusText));

    getActivities()
      .then(({ data }) => setActivities(data))
      .catch((e) => console.error(e.response?.statusText));
  }, []);

  return (
    <>
      <div>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Nombre"
          name="name"
          inputRef={register({
            required: true,
          })}
          error={errors.name ? true : false}
          helperText={errors.name ? errors.name.helperText : ""}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Dia y Hora"
          type="datetime-local"
          name="date"
          margin="normal"
          defaultValue={currentDate}
          className={classes.date}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={register({
            required: true,
          })}
          error={errors.date ? true : false}
          helperText={errors.date ? errors.date.helperText : ""}
        />

        <FormControl
          fullWidth
          variant="outlined"
          name="activity"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Actividad
          </InputLabel>
          <Controller
            as={Select}
            className={classes.control}
            name="activity"
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            control={control}
            onChange={(selected) => selected[0].target.value}
            defaultValue={""}
          >
            {activities.map((e) => (
              <MenuItem key={e._id} value={e._id}>
                <div>
                  <p className={classes.title}>{e.name}</p>
                  <ListItemText secondary={e.type} />
                </div>
              </MenuItem>
            ))}
          </Controller>
        </FormControl>

        <FormControl
          fullWidth
          variant="outlined"
          name="trainer"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Entrenador
          </InputLabel>
          <Controller
            as={Select}
            className={classes.control}
            name="trainer"
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            control={control}
            onChange={(selected) => selected[0].target.value}
            defaultValue={""}
          >
            {trainers.map((e) => (
              <MenuItem key={e._id} value={e._id}>
                <ListItemAvatar>
                  <Avatar alt="Avatar" src={e.image?.url || ""} />
                </ListItemAvatar>
                <ListItemText
                  primary={e.name + " " + e.surname}
                  secondary={e.username}
                />
              </MenuItem>
            ))}
          </Controller>
        </FormControl>

        <FormControl
          fullWidth
          variant="outlined"
          name="level"
          className={classes.formControl}
          value={"hila"}
        >
          <InputLabel id="demo-simple-select-outlined-label">Nivel</InputLabel>
          <Controller
            as={Select}
            className={classes.control}
            name="level"
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            control={control}
            onChange={(selected) => selected[0].target.value}
            defaultValue={""}
          >
            <MenuItem value={"BEGGINER"}>
              <p className={classes.title}>PRINCIPIANTE</p>
            </MenuItem>
            <MenuItem value={"MEDIUM"}>
              <p className={classes.title}>MEDIO</p>
            </MenuItem>
            <MenuItem value={"PROFESSIONAL"}>
              <p className={classes.title}>PROFESIONAL</p>
            </MenuItem>
          </Controller>
        </FormControl>
      </div>
    </>
  );
};
