import "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";

import { validateForm } from "../../../../lib/validation/validateForm";

import { makeStyles } from "@material-ui/core/styles";

import { FormUser } from "./FormUser";
import { FormClass } from "./FormClass";
import { FormExersice } from "./FormExersice";
import { FormCenter } from "./FormCenter";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  editButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primaryText,
  },
  submit: {
    marginTop: "2.5vh",
  },
}));

export const Form = ({ type, object, setObject, handleAdd, handleEdit }) => {
  const classes = useStyles();

  const button = object?.name ? "Actualizar" : "Crear";

  const { register, handleSubmit, errors, control, reset } = useForm({});

  if (!_.isEmpty(errors)) validateForm(errors);

  const onSubmit = async (data, e) =>
    button === "Crear" ? handleAdd(data, e) : handleEdit(data, e);

  const formSegreggation = (type) => {
    switch (type) {
      case "trainer":
      case "user":
        return (
          <FormUser
            object={object}
            setObject={setObject}
            register={register}
            errors={errors}
            control={control}
          />
        );
      case "exersice":
        return <FormExersice object={object} setObject={setObject} />;
      case "center":
        return (
          <FormCenter
            object={object}
            setObject={setObject}
            register={register}
            errors={errors}
          />
        );
      case "classes":
        return <FormClass object={object} setObject={setObject} />;
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {formSegreggation(type)}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {button}
      </Button>
    </form>
  );
};
