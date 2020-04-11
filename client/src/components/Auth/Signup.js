import React, { useState } from "react";
import { connect } from "react-redux";
import "date-fns";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import _ from "lodash";

import { signup, socialLogin } from "../../../lib/api/auth.api";
import { useSetUser } from "../../../lib/redux/action";
import { validateForm } from "../../../lib/validation/validateForm";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  EMAIL_PATTERN,
  USERNAME_PATTERN,
  PASSWORD_PATTERN,
} from "../../../lib/patterns";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(4, 4),
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
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  link: {
    marginTop: "2vh",
  },
  wrapperDivider: {
    margin: "2vh 0",
    color: "grey",
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const Signup = connect()(
  withRouter(({ history, dispatch, setComponent, setOpenDialog }) => {
    const classes = useStyles();

    const [openError, setOpenError] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
      try {
        dispatch(useSetUser(await signup(data)));
        setOpenDialog(false);
        history.push("/profile");
      } catch (error) {
        if (error.response.data.status == "UserExists") setOpenError(true);
      }
    };

    const handleClickSocialLogin = async () => {
      try {
        dispatch(useSetUser(await socialLogin()));
        setOpenDialog(false);
        return history.push("/profile");
      } catch (error) {
        if (error.response.data.status == "BadCredentials") setOpenError(true);
      }
    };

    if (!_.isEmpty(errors)) validateForm(errors);

    const handleCloseError = () => setOpenError(false);

    const handleDateChange = (date) => setSelectedDate(date);

    return (
      <div className={classes.paper}>
        <Typography component="h2" variant="h5">
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
            inputRef={register({ required: true, pattern: PASSWORD_PATTERN })}
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Regístrate
          </Button>

          <div className={classes.wrapperDivider}>
            <Typography variant="subtitle1">Login con Google</Typography>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClickSocialLogin}
            >
              <Avatar
                className={classes.small}
                alt="Google Icon"
                src="https://res.cloudinary.com/vctorchzr/image/upload/v1586540216/google-logo_guigav.png"
              />
            </Button>
          </div>

          <Grid container>
            <Grid item>
              <Link onClick={() => setComponent("Login")} variant="body2">
                {"Ya tienes una cuenta? Inicia sesión."}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error">
            El usuario o email ya están registrado.
          </Alert>
        </Snackbar>
      </div>
    );
  })
);
