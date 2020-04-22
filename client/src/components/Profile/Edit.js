import "date-fns";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";

import { validateForm } from "../../../lib/validation/validateForm";
import { editUser, upload } from "../../../lib/api/user.api";
import { useSetUser } from "../../../lib/redux/action";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { Loading } from "../PopUp/Loading/index";

import { EMAIL_PATTERN, USERNAME_PATTERN } from "../../../lib/patterns";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5vh 0 0 5vw",
  },
  form: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    margin: "5vh 0",
    width: "20vw",
    height: "20vw",
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
  editButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primaryText,
  },
  submit: {
    marginTop: "5vh",
  },
  input: {
    display: "none",
  },
  title: {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "300",
    fontSize: "1.5rem",
    margin: 0,
    marginBottom: "1.5vh",
    color: theme.palette.primary.main,
    textTransform: "uppercase",
  },
  divider: {
    marginBottom: "2.5vh",
  },
}));

export const Edit = ({ user, dispatch }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [imagePath, setImagePath] = useState(user.image?.url);

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      name: user.name,
      surname: user.surname,
      date: user.date,
    },
  });

  if (!_.isEmpty(errors)) validateForm(errors);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const updatedUser = await editUser(Object.assign(user, data));
      dispatch(useSetUser(updatedUser.data));
      setLoading(false);
      handleSanckBar("Perfil actualizado", "success");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.data.status === "UserExists")
          handleSanckBar("El usuario ya existe", "error");
        else handleSanckBar("Esta operación no está permitida", "error");
      }
    }
  };

  const onSumbitPicture = async (data) => {
    setLoading(true);

    try {
      if (data.avatar[0]) {
        const updatedUser = await upload(data.avatar[0]);
        dispatch(useSetUser(updatedUser.data));
        setImagePath(updatedUser.data.image.url);
        setLoading(false);
        handleSanckBar("Foto de perfil actualizada", "success");
      } else
        handleSanckBar(
          "La foto de perfil no se ha cargado correctamente",
          "error"
        );
    } catch (error) {
      if (error.response)
        handleSanckBar("Ha ocurrido un error. Vuelve a intentarlo.", "error");
    }
  };

  const handleSanckBar = (message, severity) =>
    dispatch(useSetSnackbar({ message, severity, open: true }));

  return (
    <>
      <Loading open={loading} />
      <Grid className={classes.root}>
        <p className={classes.title}>PERFIL</p>
        <Divider className={classes.divider} />

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} sm={6}>
            <div className={classes.wrapper}>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                      name="avatar"
                      ref={register()}
                      onChange={handleSubmit(onSumbitPicture)}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </>
                }
              >
                <Avatar
                  alt="Avatar"
                  src={imagePath}
                  className={classes.large}
                />
              </Badge>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Usuario"
              name="username"
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
              fullWidth
              margin="normal"
              label="Apellido"
              name="surname"
              inputRef={register({ required: true })}
              error={errors.surname ? true : false}
              helperText={errors.surname ? errors.surname.helperText : ""}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Controller
                as={KeyboardDatePicker}
                name="reactSelect"
                control={control}
                onChange={(selected) => selected[1]}
                fullWidth
                variant="inline"
                format="MM/dd/yyyy"
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
              Actualizar perfil
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};
