import React from "react";
import "date-fns";
import _ from "lodash";

import TextField from "@material-ui/core/TextField";

import {
  EMAIL_PATTERN,
  USERNAME_PATTERN,
  PASSWORD_PATTERN,
} from "../../../../lib/patterns";

export const FormUser = ({ register, errors, control }) => {
  const date = new Date();

  const currentDate = `${date.getFullYear()}-${String(date.getMonth()).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <>
      <TextField
        autoComplete="off"
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
        autoComplete="off"
        variant="outlined"
        margin="normal"
        fullWidth
        label="Email"
        name="email"
        inputRef={register({
          required: true,
          pattern: EMAIL_PATTERN,
        })}
        error={errors.email ? true : false}
        helperText={errors.email ? errors.email.helperText : ""}
      />
      <TextField
        autoComplete="off"
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
        autoComplete="off"
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
        autoComplete="off"
        variant="outlined"
        fullWidth
        margin="normal"
        label="Apellido"
        name="surname"
        inputRef={register({ required: true })}
        error={errors.surname ? true : false}
        helperText={errors.surname ? errors.surname.helperText : ""}
      />

      <TextField
        autoComplete="off"
        fullWidth
        variant="outlined"
        margin="normal"
        label="Fecha de nacimiento"
        type="date"
        name="date"
        defaultValue={currentDate}
        InputLabelProps={{
          shrink: true,
        }}
        inputRef={register()}
        error={errors.date ? true : false}
        helperText={errors.date ? errors.date.helperText : ""}
      />
    </>
  );
};
