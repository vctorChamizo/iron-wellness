import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import { withAuthentication } from "../lib/withAthetication";
import { theme } from "../theme/index";

import "./App.css";

import { HomePage } from "./pages/Home.page";
import { ProfilePage } from "./pages/user/Profile.page";
import { NavBar } from "../src/layouts/NavBar/index";

export const App = withAuthentication(() => (
  <ThemeProvider theme={theme}>
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </Router>
  </ThemeProvider>
));
