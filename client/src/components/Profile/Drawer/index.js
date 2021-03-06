import React from "react";

import { logout } from "../../../../lib/api/auth.api";
import { useLogout } from "../../../../lib/redux/action";

import { ItemList } from "./ItemList";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  toolbar: {
    height: "15vh",
  },
  wrappetAvatar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2.5vh 0",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: "2.5vh",
  },
  titleName: {
    margin: "0",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "300",
    fontSize: "1.3rem",
  },
}));

const listDrawer = ["classes", "calendar", "profile"];

export const Menu = connect((state) => ({ user: state.user }))(
  ({ setComponent, user, history, dispatch }) => {
    const classes = useStyles();

    const handleClick = async (key) => {
      if (key === "logout") {
        try {
          await logout();
          dispatch(useLogout());
          history.push("/");
        } catch (error) {}
      } else setComponent(key);
    };

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar className={classes.toolbar} />
        <div className={classes.drawerContainer}>
          <List>
            <div className={classes.wrappetAvatar}>
              <Avatar
                alt="Avatar"
                src={user.image?.url}
                className={classes.large}
              />
              <p className={classes.titleName}>{user.name}</p>
            </div>

            <Divider />

            {listDrawer.map((e) => (
              <ItemList key={e} type={e} handleClick={handleClick}></ItemList>
            ))}

            <Divider />

            <ItemList type="logout" handleClick={handleClick} />
          </List>
        </div>
      </Drawer>
    );
  }
);
