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
import NotificationsIcon from "@material-ui/icons/Notifications";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import MoreIcon from "@material-ui/icons/MoreVert";

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
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
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

    const handleProfileMenuOpen = () =>
      user ? history.push("/profile") : setOpenDialog(true);

    const handleClick = (event) => {
      switch (event) {
        case "root":
          return history.push("/");
        case "home":
          return history.push("/home");
        case "centers":
          return history.push("/centers");
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
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>My Wellness! Home</p>
        </MenuItem>

        <MenuItem>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <FitnessCenterIcon />
          </IconButton>
          <p>Centros</p>
        </MenuItem>

        <MenuItem>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
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
              <Typography variant="h5" className={classes.title}>
                Iron Wellness!
              </Typography>
            </Button>

            <div className={classes.sectionDesktop}>
              <Button onClick={() => handleClick("root")} color="inherit">
                Inicio
              </Button>
              <Button onClick={() => handleClick("home")} color="inherit">
                MyWellness! Home
              </Button>
              <Button onClick={() => handleClick("centers")} color="inherit">
                Centros
              </Button>
              <IconButton onClick={() => handleProfileMenuOpen} color="inherit">
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
