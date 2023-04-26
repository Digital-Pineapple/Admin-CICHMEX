import { BallTriangle, Dna } from 'react-loader-spinner'

import React from 'react'
import { Box } from '@mui/material'

const LoadingScreen = () => {
    return (
        <Box sx={{
            minHeight: '100%',minWidth: '100%',zIndex: 5,position: 'fixed',display: 'flex',height: '100%',
            alignItems: 'center',justifyContent: 'center',bgcolor: 'rgb(21, 21, 21)',flexDirection: 'column'
        }}>
            <Dna
                visible={true}
                height="300"
                width="300"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </Box>
    )
}

export default LoadingScreen