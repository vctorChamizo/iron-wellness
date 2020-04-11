import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import { withAuthentication } from "../lib/withAuthentication";
import { theme } from "../theme/index";

import "./App.css";

import { NavBar } from "../src/layouts/NavBar/index";
import { RootPage } from "./pages/Root.page";
import { HomePage } from "./pages/Home.page";
import { CentersPage } from "./pages/Centers.page";
import { ProfilePage } from "./pages/Profile.page";

export const App = withAuthentication(() => (
  <ThemeProvider theme={theme}>
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route path="/" exact component={RootPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/centers" component={CentersPage} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </Router>
  </ThemeProvider>
));
