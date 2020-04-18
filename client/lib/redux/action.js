export const useUser = () => ({
  type: "USE_USER",
});

export const useSetUser = (user) => ({
  type: "SET_USER",
  user,
});

export const useLoading = () => ({
  type: "USE_LOADING",
});

export const useSetLoading = (loading) => ({
  type: "SET_LOADING",
  loading,
});

export const useLogout = () => ({
  type: "USE_LOGOUT",
});
