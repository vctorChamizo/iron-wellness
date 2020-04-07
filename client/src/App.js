import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import { withAuthentication } from "../lib/withAthetication";
import { theme } from "../theme/index";

import "./App.css";

import { HomePage } from "./pages/Home.page";
import { LoginPage } from "./pages/auth/Login.page";
import { SignupPage } from "./pages/auth/Signup.page";
import { ProfilePage } from "./pages/user/Profile.page";
import { ScrollTop } from "../src/layouts/NavBar/ScrollTop";
import { NavBar } from "../src/layouts/NavBar/index";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";

export const App = withAuthentication(() => (
  <ThemeProvider theme={theme}>
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </Router>
  </ThemeProvider>
));
