import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";

let theme = createTheme({
  spacing: 10,
  breakpoints: {
    values: {
      xs: 0, // [0, 480]
      sm: 481, // [481, 768]
      md: 769, // [769, 1024]
      lg: 1025, // [1025, 1200]
      xl: 1201, // [1201, 1201]
      xxl: 1401, // [1400, 1400<=]
    },
  },
  palette: {
    primary: {
      main: "#266AEB",
      white: "#ffffff",
      neutral400: "#C5C9D4",
      neutral700: "#7C818D",
      neutral850: "#51555F",
      primary700: "#233F74",
    },
    secondary: {
      main: "#F4F8FE",
      dark: "#E9F1FE",
    },
  },
  typography: {
    fontFamily: "Open Sans",
    h5: { fontFamily: "Open Sans", fontWeight: 600 },
    button: {
      textTransform: "capitalize",
    },
  },
});

theme = responsiveFontSizes(theme);

export const Theme = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
