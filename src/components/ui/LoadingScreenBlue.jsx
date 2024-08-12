import { ThreeDots } from 'react-loader-spinner'
import { Box, CssBaseline, useTheme } from '@mui/material'

const LoadingScreenBlue = () => {
    const theme = useTheme();
    return (
        <Box sx={{
            width: '100%', zIndex: 99, position: 'fixed', display: 'flex', height: '100%',
            alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
        }}>
            <CssBaseline />
            <ThreeDots
                visible={true}
                height="250"
                width="250"
                color={theme.palette.primary.main}
            />
        </Box>
    )
}

export default LoadingScreenBlue
