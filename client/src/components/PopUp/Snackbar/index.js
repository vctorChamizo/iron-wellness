import React from "react";
import { connect } from "react-redux";

import { useSetSnackbar } from "../../../../lib/redux/action";

import { Alert } from "./Alert";

import Snackbar from "@material-ui/core/Snackbar";

export const SnackBar = connect()(
  ({ message, severity, openMessage, dispatch }) => (
    <Snackbar
      open={openMessage}
      autoHideDuration={6000}
      onClose={() =>
        dispatch(
          useSetSnackbar({
            open: false,
          })
        )
      }
    >
      <Alert
        onClose={() =>
          dispatch(
            useSetSnackbar({
              open: false,
            })
          )
        }
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  )
);
