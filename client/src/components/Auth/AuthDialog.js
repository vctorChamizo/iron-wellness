import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { Login } from "./Login";
import { Signup } from "./Signup";

export const AuthDialog = ({
  open,
  component,
  setComponent,
  setOpenDialog,
  redirectTo,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setComponent("Login");
    }, 500);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {component === "Login" ? (
          <Login
            setComponent={setComponent}
            setOpenDialog={setOpenDialog}
            redirectTo={redirectTo}
          />
        ) : (
          <Signup
            setComponent={setComponent}
            setOpenDialog={setOpenDialog}
            redirectTo={redirectTo}
          />
        )}
      </Dialog>
    </>
  );
};
