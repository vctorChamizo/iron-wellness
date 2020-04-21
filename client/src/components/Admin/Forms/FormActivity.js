import React from "react";
import { Controller } from "react-hook-form";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    marginTop: "1vh",
  },
  title: {
    color: theme.palette.primary.main,
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "300",
    fontSize: "1.2rem",
    margin: 0,
    paddingTop: "1vh",
  },
  control: {
    padding: "0 1vw",
  },
}));

export const FormActivity = ({ register, errors, control }) => {
  const classes = useStyles();

  return (
    <>
      <div>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Nombre"
          name="name"
          inputRef={register({
            required: true,
          })}
          error={errors.name ? true : false}
          helperText={errors.name ? errors.name.helperText : ""}
        />
        <TextField
          fullWidth
          multiline
          rows={10}
          variant="outlined"
          margin="normal"
          label="Descripción"
          name="description"
          inputRef={register({
            required: true,
          })}
          error={errors.description ? true : false}
          helperText={errors.description ? errors.description.helperText : ""}
          className={classes.textArea}
        />

        <FormControl
          fullWidth
          name="type"
          className={classes.formControl}
          value={"hila"}
        >
          <InputLabel id="demo-simple-select-outlined-label">Tipo</InputLabel>
          <Controller
            as={Select}
            className={classes.control}
            name="type"
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            control={control}
            onChange={(selected) => selected[0].target.value}
            defaultValue={""}
          >
            <MenuItem value={"INDOOR"}>
              <p className={classes.title}>INDOOR</p>
            </MenuItem>
            <MenuItem value={"OUTDOOR"}>
              <p className={classes.title}>OUTDOOR</p>
            </MenuItem>
          </Controller>
        </FormControl>
      </div>
    </>
  );
};
