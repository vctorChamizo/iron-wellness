import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";

import "../node_modules/aos/dist/aos.css";
import AOS from "aos";

import { withAuthentication } from "../lib/withAuthentication";
import { theme } from "../theme/index";

import "./App.css";

import { NavBar } from "../src/layouts/NavBar/index";
import { RootPage } from "./pages/Root.page";
import { HomePage } from "./pages/Home.page";
import { CentersPage } from "./pages/Centers.page";
import { ProfilePage } from "./pages/Profile.page";
import { ClassPage } from "./pages/Class.page";
import { ClassesPage } from "./pages/Classes.page";
import { ExersicePage } from "./pages/Exersice.page";
import { TrainingPage } from "./pages/Training.page";
import { NutritionPage } from "./pages/Nutrition.page";
import { NotFoundPage } from "./pages/NotFound.page";
import { AdminPage } from "./pages/Admin.page";

import { SnackBar } from "./components/PopUp/Snackbar/index";
import { DialogOption } from "./components/PopUp/Dialog/index";
import { Loading } from "./components/PopUp/Loading/index";

const UserRoutes = () => (
  <>
    <Route path="/" exact component={RootPage} />
    <Route path="/notfound" component={NotFoundPage} />
    <Route path="/home" component={HomePage} />
    <Route path="/centers" component={CentersPage} />
    <Route path="/profile" component={ProfilePage} />
    <Route path="/training" component={TrainingPage} />
    <Route path="/classes" component={ClassesPage} />
    <Route path="/class/:id" component={ClassPage} />
    <Route path="/exersice" component={ExersicePage} />
    <Route path="/nutrition" component={NutritionPage} />
  </>
);
const AdminRoutes = () => (
  <>
    <Route path="/profile" exact component={AdminPage} />
  </>
);

const AppRole = connect((state) => ({
  user: state.user,
  snackbar: state.snackbar,
  dialog: state.dialog,
  loading: state.loading,
}))(({ user, snackbar, dialog, loading }) => {
  AOS.init();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar></NavBar>
        <Loading open={loading} />
        <Switch>
          {user?.type == "ADMIN" ? <AdminRoutes /> : <UserRoutes />}
        </Switch>
      </Router>
      <SnackBar
        message={snackbar?.message}
        severity={snackbar?.severity}
        openMessage={snackbar?.open}
      />
      <DialogOption
        executeOperation={dialog?.executeOperation}
        data={dialog?.data}
        message={dialog?.message}
        openDialog={dialog?.open}
      />
    </ThemeProvider>
  );
});

export const App = withAuthentication(() => <AppRole />);
