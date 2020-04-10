import React from "react";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { Login } from "./Login";
import { Signup } from "./Signup";

export const AuthDialog = ({ open, component, setComponent, setOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setComponent("Login");
    }, 500);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      {component === "Login" ? (
        <Login setComponent={setComponent} setOpen={setOpen} />
      ) : (
        <Signup setComponent={setComponent} setOpen={setOpen} />
      )}
    </Dialog>
  );
};
