import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "5vh 0",
  },
}));

export const FormCenter = ({ register, errors }) => {
  const classes = useStyles();

  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Nombre"
        name="name"
        inputRef={register({
          required: true,
        })}
      />

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Ciudad"
        name="city"
        inputRef={register({
          required: true,
        })}
      />

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Calle"
        name="street"
        inputRef={register({
          required: true,
        })}
      />

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Comunidad"
        name="community"
        inputRef={register({
          required: true,
        })}
      />
      <Button
        variant="outlined"
        component="label"
        color="primary"
        className={classes.button}
      >
        Cargar foto del centro
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          name="avatar"
          ref={register()}
          style={{ display: "none" }}
          enctype="multipart/form-data"
        />
      </Button>
    </>
  );
};
