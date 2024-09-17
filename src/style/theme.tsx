import { createTheme } from "@mui/material/styles";
import { Colors } from "./color";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: Colors.Black,
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: Colors.LightGrey,
      paper: Colors.White,
    },
    text: {
      disabled: Colors.Grey,
      primary: Colors.Black,
      secondary: Colors.Blue,
    },
    warning: {
      main: Colors.Red,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "4rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;
