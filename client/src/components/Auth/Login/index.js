import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../../../lib/api/auth.api.js";
import { useSetUser } from "../../../../lib/redux/action";

export const Login = connect()(
  withRouter(({ history, dispatch }) => {
    const [state, setState] = useState({});
    const [error, setError] = useState(false);

    const handleError = () => {
      setError(true);
      setTimeout(() => setError(false), 3000);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        dispatch(useSetUser(await login(state.username, state.password)));
        history.push("/profile");
      } catch (error) {
        if (error.response.statusText == "BadCredentials") handleError();
      }
    };
    return <></>;
  })
);
