import { Divider, Typography } from '@mui/material'

import React from 'react'


const Titles = ({ name }) => {
    return (
        <div>
            <Typography variant="h1" fontSize={'25px'} color="initial">{name}</Typography>
            <Divider color="#0E2E73" sx={{ borderBottomWidth: 3 }} />
        </div>
    )
}

export default Titles
