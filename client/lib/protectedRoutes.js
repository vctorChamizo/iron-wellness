import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Loading } from "../src/components/Loading";

export const withLogged = (Component, { redirectTo = "/" } = {}) =>
  connect((state) => ({
    loading: state.loading,
    user: state.user,
  }))(({ loading, user }) =>
    loading ? (
      <Loading open={true} />
    ) : user ? (
      <Component />
    ) : (
      <Redirect to={redirectTo} />
    )
  );