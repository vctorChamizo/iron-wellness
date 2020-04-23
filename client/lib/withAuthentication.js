import React, { useEffect } from "react";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import { loggedin } from "./api/auth.api.js";
import { useSetUser, useSetLoading } from "./redux/action";

export const withAuthentication = (Component) => () => {
  store.dispatch(useSetLoading(true));

  useEffect(() => {
    loggedin()
      .then((data) => (data ? store.dispatch(useSetUser(data)) : undefined))
      .finally(() => store.dispatch(useSetLoading(false)));
  }, []);

  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};
