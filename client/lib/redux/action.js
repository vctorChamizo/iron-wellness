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

export const useSanckbar = () => ({
  type: "USE_SNACKBAR",
});

export const useSetSnackbar = (snackbar) => ({
  type: "SET_SNACKBAR",
  snackbar,
});

export const useDialog = () => ({
  type: "USE_DIALOG",
});

export const useSetDialog = (dialog) => ({
  type: "SET_DIALOG",
  dialog,
});

export const useLogout = () => ({
  type: "USE_LOGOUT",
});
