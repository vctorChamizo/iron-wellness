import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import _ from "lodash";

import { login, socialLogin } from "../../../lib/api/auth.api";
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
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  link: {
    marginTop: "2.5vh",
  },
  wrapperDivider: {
    margin: "2.5vh 0",
    color: "grey",
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const Login = connect()(
  withRouter(({ history, dispatch, setComponent, setOpenDialog }) => {
    const classes = useStyles();

    const [openError, setOpenError] = useState(false);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async ({ email, password }) => {
      try {
        dispatch(useSetUser(await login(email, password)));
        setOpenDialog(false);
        return history.push("/profile");
      } catch (error) {
        if (error.response.data.status === "BadCredentials") setOpenError(true);
      }
    };

    const handleClickSocialLogin = async () => {
      try {
        dispatch(useSetUser(await socialLogin()));
        setOpenDialog(false);
        return history.push("/profile");
      } catch (error) {
        console.log(error);
        console.log(error.response);
        if (error.response.data.status === "BadCredentials") setOpenError(true);
      }
    };

    if (!_.isEmpty(errors)) validateForm(errors);

    const handleCloseError = () => setOpenError(false);

    return (
      <div className={classes.paper}>
        <Typography component="h2" variant="h5">
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
            error={errors?.email ? true : false}
            helperText={errors?.email ? errors.email.helperText : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            inputRef={register({ required: true })}
            error={errors?.password ? true : false}
            helperText={errors?.password ? errors.password.helperText : ""}
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

          <div className={classes.wrapperDivider}>
            <Typography variant="subtitle1">Login con Google</Typography>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClickSocialLogin}
            >
              <Link href="http://localhost:3000/auth/google">
                <Avatar
                  className={classes.small}
                  alt="Google Icon"
                  src="https://res.cloudinary.com/vctorchzr/image/upload/v1586540216/google-logo_guigav.png"
                />
              </Link>
            </Button>
          </div>

          <Grid container>
            <Grid item className={classes.link}>
              <Link onClick={() => setComponent("Signup")} variant="body2">
                {"No tines una cuenta aún? Regístrate."}
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
            El usuario o la contraseñas son incorrectos.
          </Alert>
        </Snackbar>
      </div>
    );
  })
);
