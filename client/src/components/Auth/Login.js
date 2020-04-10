import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import _ from "lodash";

import { login } from "../../../lib/api/auth.api";
import { useSetUser } from "../../../lib/redux/action";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

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
}));

//

export const Login = connect()(
  withRouter(({ history, dispatch, setComponent, setOpen }) => {
    const classes = useStyles();

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async (data) => {
      const { email, password } = data;

      try {
        setOpen(false);
        dispatch(useSetUser(await login(email, password)));
        return history.push("/profile");
      } catch (error) {
        console.log(error.response);
        if (error.response.data.status == "BadCredentials") setError(true);
      }
    };

    if (!_.isEmpty(errors)) {
      if (errors.email) {
        console.log(errors.email);
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

    return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email o usuario"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({
              required: true,
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => setComponent("Signup")} variant="body2">
                {"No tines una cuenta aún? Regístrate."}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            El usuario o la contraseñas son incorrectos.
          </Alert>
        </Snackbar>
      </div>
    );
  })
);
