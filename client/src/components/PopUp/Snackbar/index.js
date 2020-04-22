import React from "react";

import Snackbar from "@material-ui/core/Snackbar";

import { Alert } from "./Alert";

export const SnackBar = ({
  message,
  severity,
  openMessage,
  setOpenMessage,
}) => (
  <Snackbar
    open={openMessage}
    autoHideDuration={6000}
    onClose={() => setOpenMessage(false)}
  >
    <Alert onClose={() => setOpenMessage(false)} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);
