import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import { store } from "../lib/redux/store";
import { loggedin } from "./api/auth.api.js";

import { useSetUser } from "./redux/action";

export const withAuthentication = (Component) => () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loggedin()
      .then((data) => {
        if (data) store.dispatch(useSetUser(data));
      })
      .catch((e) => console.error(e.response?.statusText))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};
