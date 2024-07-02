import { createTheme } from "@mui/material";
import { blue, green, orange, purple, red, yellow } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: blue[900],
      contrastText: '#fff',
    },
    secondary: {
      main: orange[900],
      contrastText: "#fff",
    },
    info:{
      main:yellow[700],
      contrastText:'#fff'
    },
    success:{
      main:green[800],
      contrastText:'#fff'
    },
    warning:{
      main:red[900],
      contrastText:'#fff'
    },
    error:{
      main:purple[600],
      contrastText:'#fff'
    }


    
  },
  typography:{
  fontFamily:'sans-serif',
  },

  
  
});
