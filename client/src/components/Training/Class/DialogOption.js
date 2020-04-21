import React from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export const DialogOption = ({
  openDialog,
  handleCloseDialog,
  handleRemoveClass,
  classSelected,
}) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>
        ¿Estás seguro que quieres desapuntarte de la clase?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={() => handleRemoveClass(classSelected)}
          color="primary"
          autoFocus
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
