import "date-fns";
import React from "react";
import { Controller } from "react-hook-form";
import _ from "lodash";

import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  EMAIL_PATTERN,
  USERNAME_PATTERN,
  PASSWORD_PATTERN,
} from "../../../../lib/patterns";

export const FormUser = ({ register, errors, control }) => {
  return (
    <>
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
        margin="normal"
        fullWidth
        label="Contraseña"
        name="password"
        type="password"
        inputRef={register({ required: true, pattern: PASSWORD_PATTERN })}
        error={errors.password ? true : false}
        helperText={errors.password ? errors.password.helperText : ""}
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
    </>
  );
};
