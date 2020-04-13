import "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";

import { validateForm } from "../../../lib/validation/validateForm";
import { edit } from "../../../lib/api/user.api";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
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
  editButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primaryText,
  },
  submit: {
    marginTop: "5vh",
  },
}));

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 35,
    height: 35,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export const Edit = ({ user }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [transition, setTransition] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(user.date);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      name: user.name,
      surname: user.surname,
      date: selectedDate,
    },
  });

  const onSubmit = async (data) => {
    try {
      const editedUser = await edit(Object.assign(user, data));
      handleOpen("El usuario se ha modificado correctamente");
      dispatch(useSetUser(editedUser.data));
    } catch (error) {
      if (error.response) {
        setTransition(() => TransitionUp);
        if (error.response.data.status === "UserExists")
          handleOpen("El usuario ya existe");
        else handleOpen("Esta operación no está permitida");
      }
    }
  };

  if (!_.isEmpty(errors)) validateForm(errors);

  const handleDateChange = (date) => setSelectedDate(date);

  const handleOpen = (text) => {
    setMessage(text);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <div className={classes.wrapper}>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <SmallAvatar>
                <Button className={classes.editButton}>
                  <EditIcon />
                </Button>
              </SmallAvatar>
            }
          >
            <Avatar alt="Avatar" src={user.image} className={classes.large} />
          </Badge>
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

          <MuiPickersUtilsProvider utils={DateFnsUtils} variant="outlined">
            <KeyboardDatePicker
              variant="outlined"
              fullWidth
              margin="normal"
              disableToolbar
              format="MM/dd/yyyy"
              label="Fecha de nacimiento"
              name="date"
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
            Actualizar perfil
          </Button>
        </form>
      </Grid>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message={message}
      />
    </Grid>
  );
};
