import { AppBar, createTheme } from "@mui/material";
import { blue, blueGrey, lightGreen, red, teal, yellow } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: blue[900],
      contrastText: '#fff',
    },
    secondary: {
      main: blueGrey[600],
      contrastText: "#fff",
    },
    info:{
      main:yellow[900],
      contrastText:'#fff'
    },
    success:{
      main:lightGreen[700],
      contrastText:'#fff'
    },
    warning:{
      main:red['A700'],
      contrastText:'#fff'
    }

    
  },
  typography:{
  fontFamily:'sans-serif',
  },

  
  
});
