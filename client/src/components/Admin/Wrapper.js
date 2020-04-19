import React from "react";

import { FormUser } from "./Forms/FormUser";
import { FormTrainer } from "./Forms/FormTrainer";
import { FormClass } from "./Forms/FormClass";
import { FormExersice } from "./Forms/FormExersice";
import { FormCenter } from "./Forms/FormCenter";

import { ListItem } from "./List/ListItem";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export const Wrapper = ({ list, obejct, type }) => {
  const classes = useStyles();

  const formSegreggation = (type) => {
    switch (type) {
      case "profile":
        return <Profile object={object} />;
      case "trainer":
        return <FormTrainer object={object} />;
      case "exersice":
        return <FormExersice object={object} />;
      case "centers":
        return <FormCenter object={object} />;
      case "classes":
        return <FormClass object={object} />;
      case "users":
        return <FormUser object={object} />;
    }
  };

  return <></>;
};
