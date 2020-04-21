import "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";

import { validateForm } from "../../../../lib/validation/validateForm";

import { makeStyles } from "@material-ui/core/styles";

import { FormUser } from "./FormUser";
import { FormClass } from "./FormClass";
import { FormActivity } from "./FormActivity";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "space-between",
  },
  editButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primaryText,
  },
  submit: {
    marginTop: "2.5vh",
  },
}));

export const Form = ({ type, handleAdd }) => {
  const classes = useStyles();

  const { register, handleSubmit, errors, control } = useForm({});

  if (!_.isEmpty(errors)) validateForm(errors);

  const onSubmit = async (data, e) => handleAdd(data, e);

  const formSegreggation = (type) => {
    switch (type) {
      case "trainer":
      case "user":
        return (
          <FormUser register={register} errors={errors} control={control} />
        );
      case "activity":
        return (
          <FormActivity register={register} errors={errors} control={control} />
        );

      case "classes":
        return <FormClass register={register} errors={errors} />;
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
        Añadir
      </Button>
    </form>
  );
};
