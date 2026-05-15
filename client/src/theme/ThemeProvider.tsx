import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    mode: "dark",
    primary: {
      light: "#a2cf6e",
      main: "#8bc34a",
      dark: "#618833",
      contrastText: "#000",
    },
    secondary: {
      light: "#ffcf33",
      main: "#ffc400",
      dark: "#b28900",
      contrastText: "#000",
    },
  },
});
