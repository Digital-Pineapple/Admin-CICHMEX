import { createTheme } from "@mui/material";
import { blueGrey, deepOrange, green, yellow, red, orange, lime, teal, indigo, cyan, blue, brown, purple } from "@mui/material/colors";

export const themeSuperAdmin = createTheme({
  palette: {
    primary: {
       main:blueGrey[900],
      light: blueGrey[400],
      dark: blueGrey[900],
      contrastText: '#fff',
      contrastTextSecond : orange[700],
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
      light: teal[700],
      dark: teal[200],
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
      dark: red[200],
      contrastText: '#fff'
    },
    customColors:{
      main: '#004a79', 
      accent: purple[700],
      cardBackground: blueGrey[100],
    },
    

    background:{
      default: blueGrey[50]
    }
  },
  typography: {
    fontFamily: ['sans-serif'],
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
      main: orange[900],
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

export const themeCarrierCichmex = createTheme({
  mode: 'black',  // Cambié a 'dark'
  palette: {
    primary: {
      main: teal[800],
      light: teal[200],
      dark: teal[900],
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
      main: teal[900],
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

export const themeWarehousemanCichmex = createTheme({
  mode: 'dark',  // Cambié a 'dark'
  palette: {
    primary: {
      main: "#C70039",
      light: teal[200],
      dark: teal[900],
      contrastText: '#fff',
    },
    secondary: {
      main: "#900C3F",
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
      main: teal[900],
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