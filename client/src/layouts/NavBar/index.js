import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { ScrollTop } from "./ScrollTop";
import { Login } from "../../components/Auth/Login";

ScrollTop.propTypes = {
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  navbar: {
    background: "rgba(79, 82, 88, 0.6)",
    padding: "2.5vh 2vw",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hidden: {
    padding: "2.5vh 2vw",
  },
  section: {
    width: "33%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const NavBar = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProfileMenuOpen = () => {
    // Si NO hay usuario se abre el dialogo // Si hay usuario se va al perfil
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar className={classes.navbar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Iron Wellness!
          </Typography>
          <div className={classes.section}>
            <Button color="inherit">Inicio</Button>
            <Button color="inherit">MyWellness! Home</Button>
            <Button color="inherit">Centros</Button>
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top" className={classes.hidden} />
      <ScrollTop {...props} />

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Login />
      </Dialog>
    </div>
  );
};
