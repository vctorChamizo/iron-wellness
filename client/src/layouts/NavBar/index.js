import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { ScrollTop } from "./ScrollTop";
import { AuthDialog } from "../../components/Auth/AuthDialog";

const useStyles = makeStyles((theme) => ({
  navbar: {
    zIndex: theme.zIndex.drawer + 1,
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

export const NavBar = connect((state) => ({ user: state.user }))(
  withRouter(({ user, history }) => {
    const classes = useStyles();

    const [openDialog, setOpenDialog] = useState(false);
    const [component, setComponent] = useState("Login");

    const handleProfileMenuOpen = () =>
      user ? history.push("/profile") : setOpenDialog(true);

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
        <ScrollTop />

        <AuthDialog
          open={openDialog}
          component={component}
          setComponent={setComponent}
          setOpenDialog={setOpenDialog}
        />
      </div>
    );
  })
);
