import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { ScrollTop } from "./ScrollTop";
import { HideOnScroll } from "./HideOnScroll";
import { AuthDialog } from "../../components/Auth/AuthDialog";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
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
      width: "40%",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  homeButton: {
    transition: "linear 0.2s",
    "&:hover": {
      background: "#fff",
      color: theme.palette.primary.main,
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const mobileMenuId = "primary-search-account-menu-mobile";

const NavBarOptions = ({ user, handleClick, handleMobileMenuOpen }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.sectionDesktop}>
        <Button onClick={() => handleClick("root")} color="inherit">
          <Typography variant="h3">Inicio</Typography>
        </Button>
        <Button
          className={classes.homeButton}
          variant="outlined"
          onClick={() => handleClick("home")}
          color="inherit"
        >
          <Typography variant="h3">MyWellness! Home</Typography>
        </Button>
        <Button onClick={() => handleClick("centers")} color="inherit">
          <Typography variant="h3">Centros</Typography>
        </Button>
        <IconButton onClick={() => handleClick("profile")} color="inherit">
          {user?.image ? (
            <Avatar
              alt="Avatar"
              src={user?.image.url}
              className={classes.small}
            />
          ) : (
            <AccountCircle />
          )}
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
    </>
  );
};

export const NavBar = connect((state) => ({ user: state.user }))(
  withRouter(({ user, history, props }) => {
    const classes = useStyles();

    const [openDialog, setOpenDialog] = useState(false);
    const [redirect, setRedirect] = useState(false);
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
          setRedirect("/home");
          user ? history.push("/home") : setOpenDialog(true);
          break;
        case "centers":
          return history.push("/centers");
        case "profile":
          setRedirect("/profile");
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
          <Typography variant="h3">MyWellness!</Typography>
        </MenuItem>

        <MenuItem onClick={() => handleClick("centers")}>
          <IconButton color="inherit">
            <FitnessCenterIcon />
          </IconButton>
          <Typography variant="h3">Centros</Typography>
        </MenuItem>

        <MenuItem onClick={() => handleClick("profile")}>
          <IconButton color="inherit">
            {user?.image ? (
              <Avatar
                alt="Avatar"
                src={user?.image.url}
                className={classes.small}
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
          <Typography variant="h3">Perfil</Typography>
        </MenuItem>
      </Menu>
    );

    return (
      <div>
        <HideOnScroll {...props}>
          <AppBar className={classes.navbar}>
            <Toolbar className={classes.toolbar}>
              <Button onClick={() => handleClick("root")}>
                <Typography variant="h1" className={classes.title}>
                  Iron Wellness !
                </Typography>
              </Button>
              {user?.type === "ADMIN" ? (
                <></>
              ) : (
                <NavBarOptions
                  user={user}
                  handleClick={handleClick}
                  handleMobileMenuOpen={handleMobileMenuOpen}
                />
              )}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        {renderMobileMenu}
        <Toolbar id="back-to-top" className={classes.hidden} />
        <ScrollTop />

        <AuthDialog
          open={openDialog}
          component={component}
          setComponent={setComponent}
          setOpenDialog={setOpenDialog}
          redirectTo={redirect}
        />
      </div>
    );
  })
);
