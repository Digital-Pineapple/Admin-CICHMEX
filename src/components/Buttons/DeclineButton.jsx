import { Box, CircularProgress, Fab, Tooltip } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { red } from "@mui/material/colors";
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const DeclineButton = () => {
    const [loading, setLoading] = useState(false);
    const [decline, setDecline] = useState(false);

    const timer = useRef();

  const buttonSx = {
    ...(decline && {
      bgcolor: red[500],
      '&:hover': {
        bgcolor: red[700],
      },
    }),
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
        setDecline();
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setDecline(true);
        setLoading(false);
        
      }, 2000);
    }
  };
  return (
    <div>
      <Tooltip title='Verificar'>
      <Box sx={{ m: 2, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
        >
          {decline ? <ClearIcon /> : <HighlightOffIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: red[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Tooltip>  
    </div>
  )
}


export default DeclineButton
