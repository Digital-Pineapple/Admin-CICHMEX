import { AppBar, createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0d2b6b",
      contrastText: '#ffffff',
    },
    secondary: {
      main: "#152548",
      contrastText: "#ffc1fa",
    },
    info:{
      main:'#eed400',
      contrastText:'#f5dbf0'
    }
    
  },
  typography:{
  fontFamily:'sans-serif',
  },

  
  
});
