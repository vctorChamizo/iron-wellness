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
    contrast: {
      main: "#f5f5f5",
    },
    primaryText: "#fff",
    secondaryText: "#4f5258",
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: '"Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: "2rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontWeight: 500,
      fontSize: "4.5rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h3: {
      fontWeight: 500,
      fontSize: "0.9rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h4: {
      fontWeight: 300,
      fontSize: "2.5rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    subtitle1: {
      fontFamily: '"Roboto", sans-serif',
      fontWeight: 100,
      fontSize: "1.5rem",
      lineHeight: 1.5,
      letterSpacing: "-0.01562em",
      fontStyle: "italic",
    },
  },
});
