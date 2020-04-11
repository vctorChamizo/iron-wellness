import "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";

import { validateForm } from "../../../lib/validation/validateForm";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { FormButton } from "../FormButton";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { EMAIL_PATTERN, USERNAME_PATTERN } from "../../../lib/patterns";

const useStyles = makeStyles((theme) => ({
  form: {
    paddingTop: "5vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    margin: "5vh 0",
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "45%",
  },
  list: {
    width: 250,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

export const Edit = ({ user }) => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // try {
    //setOpen(false);
    //   dispatch(useSetUser(await signup(state)));
    //   history.push("/profile");
    // } catch (error) {
    //   if (error.response.data.status == "UserExists") setErros();
    // }
  };

  if (!_.isEmpty(errors)) validateForm(errors);

  const [selectedDate, setSelectedDate] = useState(user.date);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <div className={classes.wrapper}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className={classes.large}
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Usuario"
            name="username"
            value={user.username}
            inputRef={register({
              required: true,
              pattern: USERNAME_PATTERN,
            })}
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username.helperText : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            autoComplete="email"
            inputRef={register({
              required: true,
              pattern: EMAIL_PATTERN,
            })}
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.helperText : ""}
          />

          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="Nombre"
            name="name"
            value={user.name}
            inputRef={register({ required: true })}
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.helperText : ""}
          />
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="Apellido"
            name="surname"
            value={user.surname}
            inputRef={register({ required: true })}
            error={errors.surname ? true : false}
            helperText={errors.surname ? errors.surname.helperText : ""}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils} variant="outlined">
            <KeyboardDatePicker
              variant="outlined"
              fullWidth
              margin="normal"
              disableToolbar
              format="MM/dd/yyyy"
              label="Fecha de nacimiento"
              name="date"
              value={selectedDate}
              onChange={() => handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>

          <FormButton message="Actualizar perfil" />
        </form>
      </Grid>
    </Grid>
  );
};
