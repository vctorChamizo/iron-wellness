import React from "react";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { Login } from "./Login";
import { Signup } from "./Signup";

export const AuthDialog = ({ open, component, setComponent, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      {component === "Login" ? (
        <Login setComponent={setComponent} />
      ) : (
        <Signup setComponent={setComponent} />
      )}
    </Dialog>
  );
};
