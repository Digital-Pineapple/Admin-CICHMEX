import { Dna, ProgressBar } from 'react-loader-spinner'

import React from 'react'
import { Box, CssBaseline, useTheme } from '@mui/material'

const LoadingVideoUpload = () => {
    const theme = useTheme();
    return (
        <Box sx={{
            width: '100%', zIndex: 99, position: 'static', display: 'flex', height: '100%',
            alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
        }}>
            <ProgressBar
                visible={true}
                height="80"
                width="80"
               ariaLabel="progress-bar-loading"
               barColor={theme.palette.secondary.main}
               borderColor={theme.palette.primary.main}
            />
        </Box>
    )
}

export default LoadingVideoUpload
