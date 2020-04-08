import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://res.cloudinary.com/vctorchzr/image/upload/v1586275160/gym-weights_kxtss6.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = connect()(
  withRouter(({ history, dispatch }) => {
    const classes = useStyles();

    const [state, setState] = useState({});
    const [error, setError] = useState(false);

    const handleError = () => {
      setError(true);
      setTimeout(() => setError(false), 3000);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        dispatch(useSetUser(await login(state.username, state.password)));
        history.push("/profile");
      } catch (error) {
        if (error.response.statusText == "BadCredentials") handleError();
      }
    };

    return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email o usuario"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
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
              <Link href="#" variant="body2">
                {"No tines una cuenta aún? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  })
);
