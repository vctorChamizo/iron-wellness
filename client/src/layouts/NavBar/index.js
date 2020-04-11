import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { ScrollTop } from "./ScrollTop";
import { AuthDialog } from "../../components/Auth/AuthDialog";

import { fade, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  navbar: {
    zIndex: theme.zIndex.drawer + 1,
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
  title: {
    color: theme.palette.primaryText,
  },
  section: {
    width: "33%",
    display: "flex",
    justifyContent: "space-between",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
      width: "33%",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  homeButton: {
    "&:hover": {
      background: "#fff",
      color: theme.palette.primary.main,
    },
  },
}));

export const NavBar = connect((state) => ({ user: state.user }))(
  withRouter(({ user, history }) => {
    const classes = useStyles();

    const [openDialog, setOpenDialog] = useState(false);
    const [component, setComponent] = useState("Login");
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const mobileMenuId = "primary-search-account-menu-mobile";

    const handleClick = (event) => {
      handleMobileMenuClose();
      switch (event) {
        case "root":
          return history.push("/");
        case "home":
          user ? history.push("/home") : setOpenDialog(true);
          break;
        case "centers":
          return history.push("/centers");
        case "profile":
          user ? history.push("/profile") : setOpenDialog(true);
          break;
      }
    };

    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

    const handleMobileMenuOpen = (event) =>
      setMobileMoreAnchorEl(event.currentTarget);

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={() => handleClick("home")}>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          <p>My Wellness!</p>
        </MenuItem>

        <MenuItem onClick={() => handleClick("centers")}>
          <IconButton color="inherit">
            <FitnessCenterIcon />
          </IconButton>
          <p>Centros</p>
        </MenuItem>

        <MenuItem onClick={() => handleClick("profile")}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Perfil</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div>
        <AppBar className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <Button onClick={() => handleClick("root")}>
              <Typography variant="h4" className={classes.title}>
                Iron Wellness!
              </Typography>
            </Button>

            <div className={classes.sectionDesktop}>
              <Button onClick={() => handleClick("root")} color="inherit">
                Inicio
              </Button>
              <Button
                className={classes.homeButton}
                variant="outlined"
                onClick={() => handleClick("home")}
                color="inherit"
              >
                MyWellness! Home
              </Button>
              <Button onClick={() => handleClick("centers")} color="inherit">
                Centros
              </Button>
              <IconButton
                onClick={() => handleClick("profile")}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
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
