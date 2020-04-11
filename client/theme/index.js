import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff500b",
    },
    secondary: {
      main: "#4f5258",
      contrastText: "#ffcc00",
    },
    primaryText: "#fff",
    secondaryText: "#4f5258",
    tonalOffset: 0.2,
  },
});
