import "date-fns";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { EMAIL_PATTERN, USERNAME } from "../../../lib/patterns";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  box: {
    width: "45%",
  },
}));

export const Signup = connect()(({ dispatch, setComponent }) => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    // try {
    //   dispatch(useSetUser(await signup(state)));
    //   history.push("/profile");
    // } catch (error) {
    //   if (error.response.data.status == "UserExists") setErros();
    // }
  };

  if (!_.isEmpty(errors)) {
    if (errors.email) {
      errors.email.helperText =
        errors.email.type === "required"
          ? "El campo no puede ser vacio"
          : "Email o usuario inválido";
    }

    if (errors.password)
      errors.password.helperText = "El campo no puede ser vacio";
  }

  const [error, setError] = useState(false);

  const handleClose = () => {
    setError(false);
  };

  const [selectedDate, setSelectedDate] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h4">
        Regístrate
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Usuario"
          name="username"
          autoFocus
          inputRef={register({
            required: true,
            pattern: USERNAME,
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
          margin="normal"
          fullWidth
          label="Contraseña"
          name="password"
          type="password"
          inputRef={register({ required: true })}
          error={errors.password ? true : false}
          helperText={errors.password ? errors.password.helperText : ""}
        />
        <div className={classes.wrapper}>
          <TextField
            variant="outlined"
            className={classes.box}
            fullWidth
            margin="normal"
            label="Nombre"
            name="name"
            inputRef={register({ required: true })}
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.helperText : ""}
          />
          <TextField
            variant="outlined"
            className={classes.box}
            fullWidth
            margin="normal"
            label="Apellido"
            name="surname"
            inputRef={register({ required: true })}
            error={errors.surname ? true : false}
            helperText={errors.surname ? errors.surname.helperText : ""}
          />
        </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils} variant="outlined">
          <KeyboardDatePicker
            fullWidth
            margin="dense"
            disableToolbar
            variant="outlined"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Fecha de nacimiento"
            value={selectedDate}
            onChange={() => handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Regístrate
        </Button>
        <Grid container>
          <Grid item>
            <Link onClick={() => setComponent("Login")} variant="body2">
              {"Ya tienes una cuenta? Inicia sesión."}
            </Link>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          The user or password are incorrect.
        </Alert>
      </Snackbar>
    </div>
  );
});
