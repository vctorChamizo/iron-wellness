import { createStore } from "redux";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "USE_USER":
      return state.user;

    case "SET_USER":
      return { ...state, user: action.user };

    case "USE_LOADING":
      return state.loading;

    case "SET_LOADING":
      return { ...state, loading: action.loading };

    case "USE_LOGOUT":
      return { ...state, user: undefined };
  }
  return state;
};

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
