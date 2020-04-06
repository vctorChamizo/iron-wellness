import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logout } from "../../../lib/api/auth.api.js";
import { useLogout } from "../../../lib/redux/action";

export const Profile = connect((state) => ({ user: state.user }))(
  withRouter(({ user, history, dispatch }) => {
    const handleLogout = async (e) => {
      try {
        await logout();
        dispatch(useLogout());
        history.push("/");
      } catch (error) {
        // Controlar los errores
      }
    };

    return (
      <>
        <p>PROFILE</p>
      </>
    );
  })
);
