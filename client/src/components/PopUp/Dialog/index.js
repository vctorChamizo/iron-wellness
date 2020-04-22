import React from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { useSetDialog } from "../../../../lib/redux/action";

export const DialogOption = connect()(
  ({ openDialog, executeOperation, data, message, dispatch }) => (
    <Dialog
      open={openDialog}
      onClose={() =>
        dispatch(
          useSetDialog({
            open: false,
          })
        )
      }
    >
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button
          onClick={() =>
            dispatch(
              useSetDialog({
                open: false,
              })
            )
          }
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => executeOperation(data)}
          color="primary"
          autoFocus
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
);
