import { createTheme } from "@mui/material";
import { blueGrey, deepOrange, green, yellow, red, orange, lime, teal } from "@mui/material/colors";

export const themeSuperAdmin = createTheme({
  palette: {
    primary: {
      main: "#184059",
      light: blueGrey[400],
      dark: blueGrey[900],
      contrastText: '#fff',
    },
    secondary: {
      main: orange[900],
      light: orange[500],
      dark: orange[400],
      contrastText: "#fff",
    },
    info: {
      main: yellow[700],
      light: yellow[600],
      dark: yellow[400],
      contrastText: '#fff'
    },
    success: {
      main: teal[800],
      light: lime[700],
      dark: green[200],
      contrastText: '#fff'
    },
    warning: {
      main: deepOrange[900],
      light: deepOrange[500],
      dark: deepOrange[200],
      contrastText: '#fff'
    },
    error: {
      main: red[600],
      light: red[900],
      dark: red['A400'],
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: 'sans-serif',
  },
});

export const themeAdminCarWashLight = createTheme({
  mode: 'light',
  palette: {
    primary: {
      main: "#0D2B6B",
      light: blueGrey[400],
      dark: blueGrey[900],
      contrastText: '#fff',
    },
    secondary: {
      main: orange[900],
      light: orange[500],
      dark: orange[400],
      contrastText: "#fff",
    },
    info: {
      main: yellow[700],
      light: yellow[600],
      dark: yellow[400],
      contrastText: '#fff'
    },
    success: {
      main: green[800],
      light: lime[700],
      dark: green[200],
      contrastText: '#fff'
    },
    warning: {
      main: deepOrange[900],
      light: deepOrange[500],
      dark: deepOrange[200],
      contrastText: '#fff'
    },
    error: {
      main: red[600],
      light: red[900],
      dark: red['A400'],
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: 'sans-serif',
  },
});

export const themeAdminCarWashDark = createTheme({
  mode: 'dark',  // Cambié a 'dark'
  palette: {
    primary: {
      main: "#0D2B6B",
      light: blueGrey[100],
      dark: blueGrey[900],
      contrastText: '#fff',
    },
    secondary: {
      main: orange[900],
      light: orange[500],
      dark: orange[400],
      contrastText: "#fff",
    },
    info: {
      main: yellow[700],
      light: yellow[600],
      dark: yellow[400],
      contrastText: '#fff'
    },
    success: {
      main: green[800],
      light: lime[700],
      dark: green[200],
      contrastText: '#fff'
    },
    warning: {
      main: deepOrange[900],
      light: deepOrange[500],
      dark: deepOrange[200],
      contrastText: '#fff'
    },
    error: {
      main: red[600],
      light: red[900],
      dark: red['A400'],
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: 'sans-serif',
  },
});

export const themeAdminCichmexLight = createTheme({
  palette: {
    primary: {
      main: deepOrange[900],
      light: deepOrange[800],
      contrastText: '#fff',
    },
    secondary: {
      main: orange[900],
      light: orange[500],
      dark: orange[400],
      contrastText: "#fff",
    },
    info: {
      main: yellow[700],
      light: yellow[600],
      dark: yellow[400],
      contrastText: '#fff'
    },
    success: {
      main: green[800],
      light: lime[700],
      dark: green[200],
      contrastText: '#fff'
    },
    warning: {
      main: deepOrange[900],
      light: deepOrange[500],
      dark: deepOrange[200],
      contrastText: '#fff'
    },
    error: {
      main: red[600],
      light: red[900],
      dark: red['A400'],
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: 'sans-serif',
  },
});

export const themeAdminCichmexDark = createTheme({
  mode: 'dark',  // Cambié a 'dark'
  palette: {
    primary: {
      main: "#0D2B6B",
      light: blueGrey[400],
      dark: blueGrey[900],
      contrastText: '#fff',
    },
    secondary: {
      main: orange[900],
      light: orange[500],
      dark: orange[400],
      contrastText: "#fff",
    },
    info: {
      main: yellow[700],
      light: yellow[600],
      dark: yellow[400],
      contrastText: '#fff'
    },
    success: {
      main: green[800],
      light: lime[700],
      dark: green[200],
      contrastText: '#fff'
    },
    warning: {
      main: deepOrange[900],
      light: deepOrange[500],
      dark: deepOrange[200],
      contrastText: '#fff'
    },
    error: {
      main: red[600],
      light: red[900],
      dark: red['A400'],
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: 'sans-serif',
  },
});
