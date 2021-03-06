import React, { useState } from "react";

import "date-fns";
import es from "date-fns/locale/es"; // the locale you want

import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import _ from "lodash";

import { signup, socialLogin } from "../../../lib/api/auth.api";
import { useSetUser, useSetSnackbar } from "../../../lib/redux/action";
import { validateForm } from "../../../lib/validation/validateForm";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
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
  redirect: {
    cursor: "pointer",
  },
  progress: {
    marginTop: "2.5vh",
    width: "100%",
  },
}));

export const Signup = connect()(
  withRouter(
    ({ history, dispatch, setComponent, setOpenDialog, redirectTo }) => {
      const classes = useStyles();

      const { register, handleSubmit, errors, control } = useForm();
      const [loading, setLoading] = useState(false);

      const handleSanckBar = (message, severity) =>
        dispatch(useSetSnackbar({ message, severity, open: true }));

      const onSubmit = async (data) => {
        setLoading(true);
        try {
          const newUser = await signup(data);

          dispatch(useSetUser(newUser.data));
          setOpenDialog(false);

          history.push(redirectTo);

          setComponent("Login");
        } catch (error) {
          if (error.response?.data.status == "UserExists")
            handleSanckBar("El usuario ya existe", "error");
          else if (error.response)
            handleSanckBar(
              "Ha ocurrido un error. Vuelve a intentarlo.",
              "error"
            );
        }
        setLoading(false);
      };

      const handleClickSocialLogin = async () => {
        setLoading(true);
        try {
          dispatch(useSetUser(await socialLogin()));
          setOpenDialog(false);

          history.push(redirectTo);

          setComponent("Login");
        } catch (error) {
          if (error.response?.data.status == "BadCredentials")
            handleSanckBar("El usuario ya existe", "error");
          else if (error.response)
            handleSanckBar(
              "Ha ocurrido un error. Vuelve a intentarlo.",
              "error"
            );
        }
        setLoading(false);
      };

      if (!_.isEmpty(errors)) validateForm(errors);

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
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
              <Controller
                as={KeyboardDatePicker}
                name="reactSelect"
                control={control}
                onChange={(selected) => selected[1]}
                fullWidth
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                name="date"
                label="Fecha de nacimiento"
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
              <Typography variant="subtitle2">Login con Google</Typography>
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
                <Link
                  onClick={() => setComponent("Login")}
                  variant="body2"
                  className={classes.redirect}
                >
                  ¿Ya tienes una cuenta? Inicia sesión.
                </Link>
              </Grid>
              {loading && <LinearProgress className={classes.progress} />}
            </Grid>
          </form>
        </div>
      );
    }
  )
);
