import { ThreeDots } from 'react-loader-spinner'
import { Box, CssBaseline } from '@mui/material'

const LoadingScreenBlue = () => {
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
                color='#0E2E73'
                wrapperClass="dna-wrapper"
            />
        </Box>
    )
}

export default LoadingScreenBlue
