import "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";

import { validateForm } from "../../../../lib/validation/validateForm";

import { makeStyles } from "@material-ui/core/styles";

import { Loading } from "../../Loading";
import { SnackBar } from "../../Snackbar/index";
import { FormUser } from "./FormUser";
import { FormTrainer } from "./FormTrainer";
import { FormClass } from "./FormClass";
import { FormExersice } from "./FormExersice";
import { FormCenter } from "./FormCenter";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export const Form = ({ type, object, setObject }) => {
  const classes = useStyles();

  console.log(type);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState();
  const [openMessage, setOpenMessage] = useState(false);
  const [severity, setSeverity] = useState();

  const { register, handleSubmit, errors, control } = useForm({});

  if (!_.isEmpty(errors)) validateForm(errors);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.data.status === "UserExists")
          handleSanckBar("El usuario ya existe", "error");
        else handleSanckBar("Esta operación no está permitida", "error");
      }
    }
  };

  const handleSanckBar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpenMessage(true);
  };

  const formSegreggation = (type) => {
    switch (type) {
      case "trainer":
        return <FormTrainer object={object} setObject={setObject} />;
      case "exersice":
        return <FormExersice object={object} setObject={setObject} />;
      case "centers":
        return <FormCenter object={object} setObject={setObject} />;
      case "classes":
        return <FormClass object={object} setObject={setObject} />;
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
    }
  };

  return (
    <>
      <Loading open={loading} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {formSegreggation(type)}
      </form>
      <SnackBar
        message={message}
        severity={severity}
        openMessage={openMessage}
        setOpenMessage={setOpenMessage}
      />
    </>
  );
};
